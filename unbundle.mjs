import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const html = fs.readFileSync('index.html', 'utf8');

// Guard: only run on an actual bundle
if (!html.includes('__bundler/manifest')) {
  console.error('index.html is not a bundle (already unbundled?). Aborting.');
  process.exit(1);
}

const manifest = JSON.parse(html.match(/<script type="__bundler\/manifest">([\s\S]*?)<\/script>/)[1]);
let template = JSON.parse(html.match(/<script type="__bundler\/template">([\s\S]*?)<\/script>/)[1]);
if (typeof template === 'string' && /^\s*"/.test(template)) template = JSON.parse(template.trim());

const EXT = { 'text/javascript': 'js', 'application/javascript': 'js', 'font/woff2': 'woff2', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/svg+xml': 'svg', 'image/webp': 'webp' };

fs.mkdirSync('assets', { recursive: true });

let out = template;
for (const [uuid, entry] of Object.entries(manifest)) {
  const ext = EXT[entry.mime] || 'bin';
  let bytes = Buffer.from(entry.data, 'base64');
  if (entry.compressed) bytes = zlib.gunzipSync(bytes); // bundler used gzip
  const fname = `${uuid}.${ext}`;
  fs.writeFileSync(path.join('assets', fname), bytes);
  // rewrite every reference to this uuid -> assets/<fname>
  out = out.split(uuid).join(`assets/${fname}`);
  console.log(`asset ${uuid.slice(0, 8)} ${entry.mime} ${entry.compressed ? '(gunzipped)' : ''} -> assets/${fname} (${bytes.length} bytes)`);
}

// sanity: no bare uuids left
const leftover = out.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?!\.)/gi);
fs.writeFileSync('index.html', out, 'utf8');
console.log('\nwrote new static index.html (', out.length, 'bytes ) — no DecompressionStream, no runtime unpacking');
console.log('leftover bare uuids:', leftover ? leftover.length : 0);
