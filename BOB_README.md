# Carbon Quest Bob Handoff
This folder contains the exact current working implementation of the app.
## Framework
This app does **not** use React, Next.js, Vite, or a component framework.
It is a static HTML app:
- HTML: `index.html`
- CSS: inline inside `index.html`
- JavaScript: inline inside `index.html`
- Assets: generated with CSS/canvas/data URLs inside the app
The implementation is intentionally preserved this way for exact replication.
## Install
No dependencies are required.
Optional:
```bash
npm install
```
## Run Locally
From the `bob-handoff` folder:
```bash
npm run start
```
Then open:
```text
http://127.0.0.1:4173/index.html
```
You can also open `index.html` directly in a browser, but local serving is preferred for testing.
## Build
```bash
npm run build
```
This copies `index.html` into `dist/index.html`.
## Deploy
For GitHub Pages or any static host:
1. Run `npm run build`
2. Deploy the `dist/` folder, or deploy `index.html` directly.
## Theme Files
There are no separate theme files in the current implementation.
The themes are inline in `index.html`:
- Dungeon theme CSS: search for `.dungeon`, `.d-`, `.reward-`, `.d-modal`
- Carbon theme CSS: search for `.carbon`, `.carbon-`
- Theme switching logic: search for `switchSkin`
## Reward Graphics
Reward graphics are CSS pixel-art scenes inside `index.html`.