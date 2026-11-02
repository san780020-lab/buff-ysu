"""Build lightweight web previews from the already-public assets only.

The original PDFs, poster originals and existing high-resolution reader images
are retained. Run from the repository root with Python, Pillow, Node and Poppler.
"""
import base64
import hashlib
import io
import json
import re
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'assets/readers'
TEMP = ROOT / '.local/reader-render'
OUTPUT.mkdir(exist_ok=True)
TEMP.mkdir(parents=True, exist_ok=True)
source = subprocess.check_output(['node', '-e', "const f=require('fs'),v=require('vm'),c={window:{}};v.runInNewContext(f.readFileSync('assets/js/content.js','utf8'),c);console.log(JSON.stringify(c.window.BUFF_CONTENT));"], cwd=ROOT)
content = json.loads(source)
manifest = {'readers': {}, 'posters': {}}
report = {'readerFullBytes': 0, 'readerPreviewBytes': 0, 'posterThumbBefore': 0, 'posterThumbAfter': 0, 'posterScreenBefore': 0, 'posterScreenAfter': 0}


def webp(image, path, size, quality):
    result = image.convert('RGB')
    result.thumbnail(size, Image.Resampling.LANCZOS)
    result.save(ROOT / path, 'WEBP', quality=quality, method=6)
    return result


def placeholder(image):
    tiny = image.convert('RGB')
    tiny.thumbnail((72, 104), Image.Resampling.LANCZOS)
    stream = io.BytesIO()
    tiny.save(stream, 'WEBP', quality=22, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(stream.getvalue()).decode('ascii')


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


original_hashes = {item['url']: digest(ROOT / item['url']) for item in content['documents'] + content['experiences']}
for document in content['documents'] + content['experiences']:
    slug = Path(document['url']).stem
    full_images = document.get('pageImages')
    source_pages = document['sourcePages']
    if not isinstance(source_pages, list):
        source_pages = [int(n) for n in re.findall(r'\d+', source_pages)]
    if not full_images:
        prefix = TEMP / slug
        subprocess.run(['pdftoppm', '-scale-to', '2200', '-png', str(ROOT / document['url']), str(prefix)], check=True, capture_output=True)
        rendered = sorted(TEMP.glob(slug + '-*.png'), key=lambda p: int(p.stem.rsplit('-', 1)[1]))
        assert len(rendered) == document['pages']
        full_images = []
        for index, path in enumerate(rendered, 1):
            name = f'assets/readers/{slug}-p{index:02}-hd.webp'
            webp(Image.open(path), name, (1800, 2400), 88)
            full_images.append(name)
    pages = []
    for index, full in enumerate(full_images):
        image = Image.open(ROOT / full)
        preview_path = f'assets/readers/{slug}-p{index + 1:02}-lite.webp'
        # Reading text keeps a generous preview width; high resolution is opt-in.
        webp(image, preview_path, (1100, 1800), 82)
        pages.append({'preview': preview_path, 'full': full, 'width': image.width, 'height': image.height,
                      'sourcePage': source_pages[index], 'placeholder': placeholder(image)})
        report['readerFullBytes'] += (ROOT / full).stat().st_size
        report['readerPreviewBytes'] += (ROOT / preview_path).stat().st_size
    manifest['readers'][document['url']] = {'pages': pages, 'kind': 'experience' if document.get('pageImages') else 'course'}

new_placeholders = []
for poster in content['posters']:
    original = Image.open(ROOT / poster['image'])
    thumb = f'assets/posters/{poster["id"]}-thumb-lite.webp'
    screen = f'assets/posters/{poster["id"]}-screen.webp'
    webp(original, thumb, (320, 540), 76)
    webp(original, screen, (1400, 1600), 82)
    small = placeholder(original)
    new_placeholders.append(small)
    manifest['posters'][poster['id']] = {'thumb': thumb, 'screen': screen}
    report['posterThumbBefore'] += (ROOT / poster['thumb']).stat().st_size
    report['posterThumbAfter'] += (ROOT / thumb).stat().st_size
    report['posterScreenBefore'] += (ROOT / poster['preview']).stat().st_size
    report['posterScreenAfter'] += (ROOT / screen).stat().st_size

source_file = ROOT / 'assets/js/content.js'
source_text = source_file.read_text(encoding='utf-8')
values = iter(new_placeholders)
source_text, replaced = re.subn(r"placeholder: 'data:image/webp;base64,[A-Za-z0-9+/=]+'", lambda _: "placeholder: '" + next(values) + "'", source_text)
assert replaced == len(new_placeholders)
source_file.write_text(source_text, encoding='utf-8')
(ROOT / 'assets/js/media-data.js').write_text('window.BUFF_MEDIA=' + json.dumps(manifest, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')
assert all(digest(ROOT / path) == old_hash for path, old_hash in original_hashes.items())
(ROOT / '.local/media-optimization-report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report))
