# Internal Linking (Bluebonnet Growth)

## Primary goal
Move qualified visitors to **Contact** (`/contact`) for a strategy call or visibility check.

## Core SEO pages (canonical URLs)
| Page | Path |
|------|------|
| Homepage | `/` |
| Local SEO service | `/services/local-seo` |
| Web design service | `/services/web-design` |
| About | `/about` |
| Contact | `/contact` |
| Frisco location | `/locations/frisco-tx` |
| Allen location | `/locations/allen-tx` |

## Linking guidelines
- Use final URLs in HTML (no links to `/seo`, `/frisco`, `/allen`, or `/final-cta`—those 301 redirect).
- Homepage links to both service pages, both primary location pages, about, and contact.
- Service pages link to all location pages (at minimum Frisco and Allen canonical URLs).
- Location pages link back to `/` and `/services/local-seo`.
- CTAs: **Book a Strategy Call** → `/contact`

## Legacy / redirect-only (do not link internally)
- `/seo`, `/web-design`, `/frisco`, `/allen`, `/final-cta`
- `/seo-mckinney`, `/seo-frisco`, `/seo-allen`, and other `seo-*` landers
