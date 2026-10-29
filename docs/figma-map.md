# Route to Figma map

Figma file: **Ambler design - Venta - 2026** (`FvFlH4soZCoGDujoQWErsf`).
Open a frame with `https://www.figma.com/design/FvFlH4soZCoGDujoQWErsf/?node-id=<id with - instead of :>`.
Every page section in the code carries `data-figma="<node id>"` pointing at its Figma layer.

Desktop frames are 1920px wide with 192px side padding (content 1536px). Tokens
come from the "Styleguide and Spacing" page (`14714:56317`) and live in
`tailwind.config.ts` and `src/app/globals.css`.

| Route | Figma page | Frame (desktop) | Node |
| --- | --- | --- | --- |
| `/` | Landing Page and Menu | Landing Page | `34141:37897` |
| Header mega menu | Landing Page and Menu | Megamenu - Ophthalmology (and 8 more) | `34447:60218` |
| Header Quick Order link | Quick Order (Order by SKU) | Quick Order (header) | `34391:65511` |
| Header search dropdown | Search | Search - Suggestions / Results / No Search Results | `34194:128358`, `34194:128283`, `34194:128402` |
| Header account dropdown | Search | Log In - Dropdown / Logged In - Dropdown | `34194:128259`, `34194:128201` |
| Mini cart drawer | Cart | Mini Cart / Mini Cart - Added / Mini Cart - Empty | `21596:85217`, `34266:78963`, `21596:85244` |
| `/browse-by-specialty/<specialty>/` | PLP | PLP - 2nd level - 1920px | `34777:58990` |
| `/browse-by-specialty/<specialty>/<category>/` | PLP | PLP - Category page | `34719:11290` |
| `/browse-by-specialty/<specialty>/<category>/<type>/` | PLP | PLP - Product Type Page | `34723:17020` |
| `/browse-by-type/` | PLP | PLP - Browse by Type | `34723:18102` |
| `/browse-by-type/<type>/` | PLP | PLP - Type Page - Forceps - 1920px | `34887:118658` |
| `/product-lines/` | PLP | PLP - Product Lines - 1920px | `34907:8363` |
| `/product-lines/<brand>/` | PLP | PLP - Brand Page - Duckworth & Kent - 1920px | `34926:9036` |
| `/repair-services/` | PLP | Repair Services - 1920px | `34799:68554` |
| `/product/<slug>/` | PDP | PDP - Simple - 1920px, PDP - Zoom | `34224:49536`, `21171:386870` |
| `/checkout/cart/` | Cart | Cart, Cart - Empty | `14714:103185`, `21071:135304` |
| `/quick-order/` | Quick Order (Order by SKU) | Quick Order, Items Added, CSV Upload Summary | `34391:65496`, `34403:67202`, `34547:112188` |
| `/checkout/` | Checkout | Checkout - Guest, Checkout - Logged In | `34799:87723`, `34799:88544` |
| `/customer/account/login/` | My Account | Login | `14714:118247` |
| `/customer/account/create/` | My Account | Creating New Account | `14714:118278` |
| `/customer/account/forgotpassword/` | My Account | Password Reset | `14714:118400` |
| `/customer/account/logoutSuccess/` | (section Signed Out) | Signed Out, Mobile - Signed Out (where Sign Out leads; counts down 5 s, then home; `?stay` keeps it) | `29434:83818`, `29434:83809` |
| `/customer/account/` | My Account | Dashboard | `14714:137050` |
| `/customer/address/` | My Account | Dashboard - Address Book | `14714:137202` |
| `/customer/address/new/` | My Account | Dashboard - New Address | `14714:137391` |
| `/customer/account/edit/` | My Account | Dashboard - Account Information | `14714:137321` |
| `/sales/order/history/` | My Account | Dashboard - My Orders | `14714:137435` |
| `/sales/order/view/` | My Account | My Orders - Order Opened (4 tabs) | `14714:137948` |
| `/giftcard/customer/` | My Account | Gift Card | `34266:49954` |
| `/vault/cards/listaction/` | My Account | Stored Payment Methods | `34266:54872` |
| `/privacy-settings/` | My Account | Privacy Settings | `34385:27016` |
| `/about-ambler-surgical/` | CMS Pages | CMS - About Ambler Surgical - 1920px | `34974:1141` |
| `/free-lifetime-repair/` | (section Free Lifetime Repair - Adjusted) | Free Lifetime Repair - Web (client version, copy source: `35098:38806`) | `35122:1207` |
| `/repair-services/micro-instrument-repair/` | WIP | Repair - Micro Instrument (client's 1600px frame, built with the redesign's components; FAQ answers from the live page) | `35098:38988` |
| `/repair-services/cryosurgical-handpiece-repair/` | WIP | Repair - Cryosurgical Handpiece (client's 1600px frame, built like Micro Instrument; FAQ answers from the live page) | `35098:39248` |
| `/sterilization-cleaning/` | WIP | Sterilation Products (client's 1600px frame, built with the PLP Category page components; products and SEO copy from the live page) | `35098:39421` |
| `/404.html` (missing pages) | (sketch) | 404 page, web and mobile (built from the redesign's blocks and photos instead of the sketch's box and illustration) | `29434:83743` |
| `/conditions-of-sale/` | WIP | Conditions of Sale (client's 1600px frame drawing sections 1, 2 and 4.7; the full text and anchors are the live page's) | `35098:39725` |

Not designed in Figma, built in the same style: `/browse-by-specialty/`,
`/search/`, `/contact/`, `/checkout/onepage/success/`.
