const fs = require('fs');
const path = require('path');

const root = process.cwd();
const outDir = path.join(root, 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest, minify = false) {
  let data = fs.readFileSync(src, 'utf8');
  if (minify) {
    const ext = path.extname(src).toLowerCase();
    if (ext === '.css') data = minifyCSS(data);
    else if (ext === '.js') data = minifyJS(data);
    else if (ext === '.html') data = minifyHTML(data);
    else if (ext === '.json') data = minifyJSON(data);
  }
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, data, 'utf8');
}

function copyDir(srcDir, destDir) {
  ensureDir(destDir);
  const items = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const it of items) {
    const srcPath = path.join(srcDir, it.name);
    const destPath = path.join(destDir, it.name);
    if (it.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function minifyCSS(s) {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\n+/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/;\s*/g, ';')
    .trim();
}

function minifyJS(s) {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/\n+/g, '\n')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function minifyHTML(s) {
  return s
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/\n+/g, '')
    .replace(/>\s+</g, '><')
    .trim();
}

function minifyJSON(s) {
  try { return JSON.stringify(JSON.parse(s)); } catch (e) { return s; }
}

function build() {
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  ensureDir(outDir);

  // Copy and minify main files
  const filesToMinify = ['index.html', 'app.js', 'style.css', 'service-worker.js', 'manifest.json', 'topics.json'];
  for (const f of filesToMinify) {
    const src = path.join(root, f);
    if (fs.existsSync(src)) {
      const dest = path.join(outDir, f);
      const ext = path.extname(f).toLowerCase();
      const minify = ext === '.html' || ext === '.js' || ext === '.css' || ext === '.json';
      copyFile(src, dest, minify);
      console.log('Copied', f);
    }
  }

  // Copy assets directory if present
  const assetsSrc = path.join(root, 'assets');
  if (fs.existsSync(assetsSrc) && fs.lstatSync(assetsSrc).isDirectory()) {
    copyDir(assetsSrc, path.join(outDir, 'assets'));
    console.log('Copied assets/');
  }

  console.log('Build complete. Output in', outDir);
}

build();



