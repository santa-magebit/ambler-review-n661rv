# Ambler Surgical, Venta 2026 prototype

Clickable prototype of the Ambler Surgical store redesign, built from the
Figma file **Ambler design - Venta - 2026** (`FvFlH4soZCoGDujoQWErsf`).

The stack mirrors a Hyvä (Venta) theme: server-rendered HTML, **Alpine.js 3**
for behaviour and **Tailwind CSS 3.4** for styling. Pages are **Nunjucks**
templates that **Eleventy** turns into plain static HTML, so the markup can be
lifted into `.phtml` templates almost as-is. Routes mirror Magento URLs.

- **Route to Figma map:** [docs/figma-map.md](docs/figma-map.md). Every page
  section carries `data-figma="<node id>"` pointing at its Figma layer.
- **Design tokens:** `tailwind.config.js` uses the Figma variable names
  (primary, secondary, grayscale, states) and text styles (Roboto, `text-lg`
  18/28 body, `text-h1` 40/48 and so on). Button, input and container classes
  are in `src/assets/css/app.css`.
- **Icons:** `{% icon "name", "classes" %}` renders the Figma `icon/24px/*`
  layers inline (`src/_data/icons.js`).
- **Images:** `src/img/<hash8>.(jpg|png)` are the Figma image fills; the
  `img` filter maps the first 8 characters of a Figma image hash to its file.

## Run locally

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:8431 and rebuilds on change.

## Static build

```bash
npm run build
```

`_site/` holds the static site. Set `BASE_PATH=/repo-name` when it is served
from a sub-folder, for example GitHub Pages.

## How the prototype behaves

- `Alpine.store("cart")` keeps the cart in `localStorage`, so it survives page
  loads. Add to Cart opens the mini cart. The order success page empties it.
- `Alpine.store("auth")` is a fake signed-in flag. Signing in or creating an
  account sets it; the account menu and checkout switch to the signed-in
  designs. Sign Out clears it.
- Add `?demo-cart` to any URL to start with the three products drawn in the
  Figma cart, for example `/checkout/cart/?demo-cart` or `/checkout/?demo-cart`.
- At checkout, typing `raymond.myers@gmail.com` as a guest shows the
  "account found, sign in" prompt (Figma SUR-359).
- Forms submit nowhere. Payment fields are a visual mock only.
- Anything marked `data-proto` shows a "not part of the prototype yet" notice.

## Content

- Products, item numbers, prices, descriptions and images are the ones drawn
  in Figma (`src/_data/catalog.js`).
- Specialty descriptions and mega-menu groups come from the Figma Landing Page
  and Mega Menu frames. Sterilization and repair lists come from the live
  amblersurgical.com menu.
- Pages not drawn in Figma are built in the same style: `/browse-by-specialty/`,
  `/sterilization-cleaning/`, `/search/`, `/contact/`,
  `/checkout/onepage/success/`.

## Where things live

- `src/_includes/layouts/base.njk` page shell; `partials/` header, search,
  mini cart, footer, toaster; `macros/ui.njk` breadcrumbs, product card,
  quantity stepper, fields
- `src/_includes/<area>/` and `src/assets/js/<area>.js` per area: `content`,
  `plp`, `pdp-cart`, `checkout`, `account`
- `src/assets/js/app.js` Alpine stores and header components
- `src/_data/` catalogue, store chrome, icons, image map
- Pages: `src/<route>/index.njk`
