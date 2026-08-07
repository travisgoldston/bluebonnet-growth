# Internal linking policy

**Updated:** 2026-08-07

## Goal
Drive qualified traffic to `/contact` (free local search audit / apply). Secondary: commercial money pages.

## Primary CTAs
- Nav: **Apply Now** → `/contact`
- Money pages: **Get a Free Local Search Audit** → `/contact`
- Keep truthful scarcity: **I take on 5 clients at a time**

## Canonical commercial URLs (link to these)
| Intent | URL |
|--------|-----|
| Local SEO | `/services/local-seo` |
| GBP | `/services/google-business-profile` |
| SEO content | `/services/seo-content` |
| Industries hub | `/industries` |
| HVAC SEO | `/industries/hvac-seo` |
| Plumber SEO | `/industries/plumber-seo` |
| Roofing SEO | `/industries/roofer-seo` |
| Electrician SEO | `/industries/electrician-seo` |
| Landscaping SEO | `/industries/landscaping-seo` |
| About / not an agency | `/about` |
| Contact | `/contact` |

## Location URLs
- Prefer keeper paths from `scripts/data/texas_cities.js` (`getPath`)
- Frisco: `/locations/frisco-tx`
- Allen: `/locations/allen-tx`
- Boerne: `/locations/boerne-tx`
- Georgetown: `/locations/georgetown-tx`
- Most NTX cities: root `/{slug}` e.g. `/mckinney`

## Do not link (redirected / legacy)
- `/seo`, `/web-design`, `/conversion-optimization`, `/final-cta`, `/proof`
- `/frisco`, `/allen` (use locations paths)
- `/seo-*` landers
- Non-keeper city roots (they 301 to `/locations#region`)

## Link patterns
- Homepage → services, industries, locations, about (not-agency)
- Industry pages → local SEO, GBP, related cities, related blog
- City pages → services, industries, nearby cities, contact
- Blog → nearest money page + contact

## Anchor text
Natural and descriptive. Avoid stuffing “best local SEO McKinney TX” repeatedly.
