"""Pin public upstream browser OCR/PDF dependencies; no user documents involved."""
import hashlib
import io
import json
from pathlib import Path
import tarfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1] / 'assets/vendor/recognition'
PACKAGES = [
    ('tesseract.js', '6.0.1', 'tesseract', lambda p: p.lower().startswith('license') or p.startswith('dist/') and p.endswith(('.min.js', 'LICENSE.txt'))),
    ('tesseract.js-core', '6.0.0', 'core', lambda p: p == 'LICENSE' or p.endswith('.wasm.js')),
    ('pdfjs-dist', '5.4.296', 'pdf', lambda p: p == 'LICENSE' or p in ['build/pdf.mjs', 'build/pdf.worker.mjs'] or p.startswith(('cmaps/', 'standard_fonts/', 'wasm/'))),
    ('@tesseract.js-data/chi_sim', '1.0.0', 'lang', lambda p: p == '4.0.0_best_int/chi_sim.traineddata.gz'),
    ('@tesseract.js-data/eng', '1.0.0', 'lang', lambda p: p == '4.0.0_best_int/eng.traineddata.gz'),
]
manifest = []
for package, version, folder, select in PACKAGES:
    metadata = json.load(urllib.request.urlopen(f'https://registry.npmjs.org/{package}/{version}'))
    archive = urllib.request.urlopen(metadata['dist']['tarball']).read()
    expected = metadata['dist']['integrity']
    import base64
    assert 'sha512-' + base64.b64encode(hashlib.sha512(archive).digest()).decode() == expected
    files = []
    with tarfile.open(fileobj=io.BytesIO(archive), mode='r:gz') as source:
        for member in source.getmembers():
            path = member.name.removeprefix('package/')
            if not member.isfile() or not select(path):
                continue
            relative = path.removeprefix('4.0.0_best_int/') if folder == 'lang' else path
            if folder == 'pdf' and relative.endswith('.mjs'):
                relative = relative[:-4] + '.js'  # Portable JavaScript MIME type on static servers.
            target = ROOT / folder / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            data = source.extractfile(member).read()
            target.write_bytes(data)
            files.append({'path': str(target.relative_to(ROOT)).replace('\\', '/'), 'sha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data)})
    manifest.append({'package': package, 'version': version, 'integrity': expected, 'files': files})
ROOT.mkdir(parents=True, exist_ok=True)
(ROOT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8', newline='\n')
print(json.dumps({'packages': len(manifest), 'bytes': sum(f['bytes'] for p in manifest for f in p['files'])}))
