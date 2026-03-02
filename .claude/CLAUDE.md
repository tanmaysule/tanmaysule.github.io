# Portfolio Website

Live at: https://tanmaysule.github.io
Repo: https://github.com/tanmaysule/tanmaysule.github.io (master branch)

## Tech Stack

- Pure HTML / CSS / JS — no build step, no frameworks
- GitHub Pages deployment (push to master = live)
- Dark/light theme toggle with localStorage persistence

## File Structure

- `index.html` — all HTML content
- `assets/css/style.css` — all styles
- `assets/js/main.js` — scroll reveal, theme toggle, nav behavior, hash updates
- `assets/Tanmay_Sule_Resume.pdf` — downloadable resume (keep in sync with Resume/ folder)

## Known Workarounds

- URL hash updates are delayed 800ms on page load to avoid a race condition with `scroll-behavior: smooth`. Without this, navigating to `/#rag-platform` causes the hash to be wiped mid-animation. See `main.js:101-102`.

## Key Rules

- Local dev server: `python3 -m http.server 8090` from this directory
- The resume PDF linked in the nav must match the latest compiled version
