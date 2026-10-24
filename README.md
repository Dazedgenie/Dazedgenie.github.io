# Dazed portfolio

A dark, mystical portfolio site. A brass genie lamp in the corner is the menu,
and smoke pours out of it every time the page changes.

Plain HTML, CSS and JavaScript. No build step and nothing to install.

## Files

| File | What it is |
| --- | --- |
| `js/content.js` | **Edit this one.** Your tagline, bio, contact links and projects. |
| `index.html` | Page structure, the logo with its eye layers, and the lamp (inline SVG). |
| `css/style.css` | All the styling. Colours and fonts are at the top in `:root`. |
| `js/main.js` | Menu, page changes, three wishes, genie eyes. |
| `js/smoke.js` | The canvas smoke effect. |
| `js/sound.js` | Sound effects, generated in the browser (no audio files). |
| `assets/` | Logo, eye layers, favicon, and `assets/projects/` for project screenshots. |

## Preview it locally

Double-click `index.html` to open it in your browser. Or, to run it the same
way GitHub Pages will, start a small local server in this folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Add a project

1. Put a screenshot in `assets/projects/` (16:9 looks best, e.g. 1280x720).
2. Open `js/content.js` and copy one of the `{ ... }` blocks in `PROJECTS`.
3. Fill in the fields, set `image: "assets/projects/your-file.png"`, and delete
   the `example: true` line.
4. Refresh the page.

## The logo and its moving eyes

The home page shows `assets/dazed-logo.webp`. The genie's irises are cut out
into separate layers in `assets/eyes/` so they can follow the cursor:

- `eye-*-mask.png`: the shape of each eye opening
- `eye-*-plate.png`: the eye with the iris painted out
- `eye-*-iris.png`: the iris on its own

If you change the logo, rebuild those layers with
`python3 assets/eyes/make-eyes.py new-logo.webp assets/eyes` (needs Pillow and
numpy). The eye boxes and iris centres at the top of that script are measured
in pixels on the 1024x1024 logo, so update them if the eyes move. The same
numbers appear on the `<image>` and `data-cx` / `data-cy` attributes in
`index.html`.

The neon line in the empty plaque under the logo comes from `plaque` in
`js/content.js`.

## Put it on GitHub Pages

The site goes live at **https://dazedgenie.github.io**.

1. On GitHub, signed in as `Dazedgenie`, create a new **public** repository
   named exactly `Dazedgenie.github.io`. Leave "Add a README" unticked.
2. Upload everything in this folder to it: on the empty repository's page,
   click "uploading an existing file" and drag in all the files and folders.
   Or from a terminal in this folder:
   ```sh
   git init -b main
   git add .
   git commit -m "First version of the Dazed portfolio"
   git remote add origin https://github.com/Dazedgenie/Dazedgenie.github.io.git
   git push -u origin main
   ```
3. In the repository go to **Settings → Pages**. Under "Build and deployment",
   set **Source** to "Deploy from a branch", pick `main` and `/ (root)`, then
   save.
4. After a minute or two the site is live. Every change you push updates it.

A custom domain (like `dazed.gg`) can be added later on the same Settings page.
