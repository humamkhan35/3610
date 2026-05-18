Planet Pocket — Build Instructions

This project contains a small PWA. The `build` script produces a minified `dist/` folder.

Quick build:

1. Ensure Node.js (>=14) is installed.
2. From the project root run:

```bash
node build.js
# or
npm run build
```

The script will create `dist/` with minified `index.html`, `app.js`, `style.css`, `service-worker.js`, `manifest.json`, `topics.json`, and will copy the `assets/` folder.

Note: The minifier is intentionally simple and intended for small static projects. For more robust production builds consider using tooling like `esbuild`, `terser`, and `csso`.
