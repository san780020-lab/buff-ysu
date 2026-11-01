"""Publish an owner's promotion issue as plain text and validated image links."""
import hashlib
import html
import json
import os
import re
import subprocess
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

PREFIX = '[每日宣传]'


def parse_promotion(body):
    body = re.sub(r'^### 宣传内容\s*', '', body.strip(), count=1)
    images = []

    def image_url(value):
        value = html.unescape(value).strip()
        url = urlparse(value)
        local_prefix = 'https://san780020-lab.github.io/buff-ysu/assets/promotions/'
        if value.startswith(local_prefix):
            value = 'assets/promotions/' + value[len(local_prefix):]
            if not re.fullmatch(r'assets/promotions/[\w.-]+\.(?:webp|png|jpg|jpeg)', value):
                raise ValueError('Invalid local image path')
        elif not (url.scheme == 'https' and not url.username and not url.password and (
            (url.hostname == 'github.com' and url.path.startswith('/user-attachments/assets/')) or
            url.hostname == 'user-images.githubusercontent.com'
        )):
            raise ValueError('Images must be pasted or uploaded through GitHub')
        if value not in images:
            images.append(value)
        return ''

    body = re.sub(r'!\[[^\]]*\]\((https://[^\s)]+)(?:\s+"[^"]*")?\)', lambda m: image_url(m[1]), body)
    body = re.sub(r'<img\b[^>]*\bsrc=["\']([^"\']+)["\'][^>]*>', lambda m: image_url(m[1]), body, flags=re.I)
    if '<' in body or '> ' in body or '![' in body:
        raise ValueError('Use plain text and GitHub image attachments only')
    lines = [line.strip() for line in body.strip().splitlines()]
    if not lines or not lines[0] or len(lines[0]) > 150:
        raise ValueError('The first line must be a title of 1-150 characters')
    if len(body) > 20000 or len(images) > 12:
        raise ValueError('Use at most 20,000 characters and 12 images')
    return '\n'.join(lines).strip() + '\n', images


def api(path, method='GET'):
    request = urllib.request.Request('https://api.github.com' + path, method=method,
        headers={'Authorization': 'Bearer ' + os.environ['GH_TOKEN'], 'Accept': 'application/vnd.github+json',
                 'User-Agent': 'BUFF-promotion-publisher', 'X-GitHub-Api-Version': '2022-11-28'})
    with urllib.request.urlopen(request, timeout=45) as response:
        return json.load(response)


def main():
    event = json.loads(Path(os.environ['GITHUB_EVENT_PATH']).read_text(encoding='utf-8'))
    repository = os.environ['GITHUB_REPOSITORY']
    owner = repository.split('/')[0]
    if os.environ['GITHUB_ACTOR'] != owner:
        raise PermissionError('Only the repository owner can publish')
    issue = event.get('issue')
    if issue is None:
        number = str(event.get('inputs', {}).get('issue_number', ''))
        if not number.isdigit():
            raise ValueError('A promotion issue number is required')
        issue = api(f'/repos/{repository}/issues/{number}')
    if issue['user']['login'] != owner or not issue['title'].startswith(PREFIX) or 'pull_request' in issue:
        raise PermissionError('Only owner-authored promotion issues can be published')
    text, images = parse_promotion(issue.get('body') or '')
    data_dir = Path('assets/data')
    data_dir.joinpath('daily-promotion.txt').write_text(text, encoding='utf-8')
    data_dir.joinpath('daily-promotion-images.json').write_text(json.dumps(images, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    subprocess.run(['git', 'add', 'assets/data/daily-promotion.txt', 'assets/data/daily-promotion-images.json'], check=True)
    changed = subprocess.run(['git', 'diff', '--cached', '--quiet']).returncode
    if changed:
        subprocess.run(['git', 'config', 'user.name', 'github-actions[bot]'], check=True)
        subprocess.run(['git', 'config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com'], check=True)
        subprocess.run(['git', 'commit', '-m', f'Publish daily promotion #{issue["number"]}'], check=True)
        subprocess.run(['git', 'push', 'origin', 'HEAD:main'], check=True)
    # GITHUB_TOKEN commits do not trigger branch-based Pages builds automatically.
    api(f'/repos/{repository}/pages/builds', 'POST')
    with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf-8') as summary:
        summary.write('### 宣传已提交发布\n\n文字与图片已同步，GitHub Pages 正在构建。\n\n[查看网站](https://san780020-lab.github.io/buff-ysu/)\n')


if __name__ == '__main__':
    main()
