# Deploy checklist (FileZilla / cPanel)

After `npm run build`, upload **everything** inside the `out/` folder to your hosting **public_html** root (not only `.html` files).

The build runs `prune-export.cjs` automatically — it removes empty folders that cause **403 Forbidden** on `/about`, `/courses/*`, etc. Always upload **`.htaccess`** from `out/` as well.

## Must exist on the server

| File / folder | Purpose |
|---------------|---------|
| `_next/` | CSS, JavaScript — site breaks without this |
| `sitemap.xml` | Google Search Console sitemap |
| `robots.txt` | Crawler rules |
| `favicon.ico`, `favicon.png`, `apple-touch-icon.png` | Logo in browser tab & Google search |
| `.htaccess` | Apache static file rules (from `public/`) |
| All page folders | `blog/`, `courses/`, etc. |

## Test before submitting sitemap

Open in a browser:

1. https://fahadmunafparekh.com/sitemap.xml — must show **XML**, not 500 or a blank error page  
2. https://fahadmunafparekh.com/robots.txt — must mention `Sitemap: https://fahadmunafparekh.com/sitemap.xml`

Only then submit `sitemap.xml` in Google Search Console.
