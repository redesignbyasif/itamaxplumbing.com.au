# itamaxplumbing.com.au: Homepage Redesign Concept

A premium, mobile-first homepage redesign concept for **ITA MAX PLUMBING PTY LTD**, a licensed plumbing, draining and gasfitting company based in Ryde, servicing homes, strata and commercial properties across Greater Sydney.

> This is a **redesign demo**, not the official website. The page carries `noindex, nofollow` so it never competes with the live site, [itamaxplumbing.com.au](https://itamaxplumbing.com.au/), in search results.

## Tech
- Plain **HTML5 + CSS3 + vanilla JavaScript**, with no build step and no dependencies
- Self-hosted fonts: **Oswald** (headings) and **Manrope** (body)
- Inline SVG icon sprite (Lucide icon set)
- Every path is relative, so it works on GitHub Pages at a project sub-path

## Structure
```
index.html            Homepage
css/style.css         All styles (CSS variables, mobile-first)
js/script.js          Mobile menu, service preview, FAQ, quote builder, floating CTA, reveal
assets/logo/          ITA MAX logo (clean vector redraw of the original + PNG)
assets/images/        Optimised WebP photography + OG image
assets/icons/         Favicons + icon sprite source
assets/fonts/         Oswald & Manrope (woff2, latin)
.nojekyll             Serve files as-is on GitHub Pages
```

## Brand
| Token | Hex | Source |
|---|---|---|
| Aqua | `#0ACDD1` | Logo water drop |
| Ink | `#0B0D0E` | Logo lettering |
| Steel | `#97989A` | Logo tap |
| Verde | `#3EA66F` | Tap handle (Italian tricolour) |
| Rosso | `#EC4643` | Tap handle (Italian tricolour) |

## Content sources
- Every business detail (services, phone, emails, ABN, licence number, team, reviews) comes from the existing website and its Google listing. Nothing is invented.
- Customer reviews are the genuine Google reviews shown on the current site.
- Existing site photography is reused: bathroom, kitchen, pipework, wrenches and the Rheem unit.
- The four photos of a plumber in ITA MAX branded workwear (hero, hot water, drain camera, plant room) are **AI-generated illustrative images**. They do not show real ITA MAX jobs or staff.

## Contact form
There is no backend. The quote form validates the input, then opens the visitor's email app with a pre-filled message to `info@itamaxplumbing.com.au`. Nothing is sent from the page itself, and no fake "success" message is shown.

## Run locally
```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy (GitHub Pages)
Settings → Pages → *Deploy from a branch* → choose a branch and the `/ (root)` folder.
