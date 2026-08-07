# Bluebonnet Growth — SEO Audit & Architecture

**Date:** 2026-08-07  
**Site:** https://bluebonnetgrowth.com  
**Status:** Phase 1 complete · Implementation in progress

---

## Current state

### What Google is already doing
Search Console (~7 days): ~318 impressions, 0 clicks, avg position ~79. Queries include Boerne, Frisco, and Georgetown local SEO variants. Google is associating the site with Texas local SEO — early signal, not success.

### Architecture today
| Type | Pattern | Count (approx) |
|------|---------|----------------|
| Homepage / core | `/`, `/about`, `/contact`, `/how-it-works`, `/results`, `/pricing`, `/faq` | 7 |
| Service money pages | `/services`, `/services/local-seo`, `/gbp`, `/seo-content` | 4 |
| City landers | Root `/{city}` + `/locations/frisco-tx`, `/locations/allen-tx` | 15 keepers |
| Blog | `/blog` + posts | ~47 |
| Industry commercial | **Missing** (blog pillars only) | 0 |

### Brand (preserve)
- Deep Indigo `#28288C`, parchment `#F7F6F0`, Lora + DM Sans
- **“This is not an agency.”** on homepage + About
- **Limited to 5 clients at a time** (hero, footer, contact, about)
- CTA: Apply Now · Free visibility check
- Melissa-based, home-service ICP

### Technical strengths
- `robots.txt` blocks `/preview/`, `/resources/`, `/incoming/`, templates
- www → apex, cleanUrls, large 301 consolidation in `vercel.json`
- Absolute canonicals; homepage `ProfessionalService` schema
- Service pages have Open Graph; city/blog mostly do not

---

## Problems

| # | Issue | Priority | Impact |
|---|--------|----------|--------|
| 1 | No industry money pages (HVAC/plumber/etc. live only as blogs) | P0 | Misses commercial intent; weak topical authority |
| 2 | City pages share templated mid-body (near-duplicates) | P0 | Thin/duplicate risk; weak CTR |
| 3 | Frisco/Allen under `/locations/*-tx`; others at root | P1 | Confusing IA (equity OK via redirects) |
| 4 | GSC demand for Boerne + Georgetown with no dedicated pages | P0 | Impressions with nowhere strong to land |
| 5 | `/seo-company-:city` → `/` | P1 | Soft-404 / wasted equity |
| 6 | OG/Twitter missing on home, cities, most blogs | P1 | Weak social + some SERP previews |
| 7 | Service/city pages lack Service / LocalBusiness / Breadcrumb schema | P1 | Missed rich-result eligibility |
| 8 | Non-ICP blog pillars (lawyers, therapists, etc.) still indexed | P2 | Dilutes home-service positioning |
| 9 | Pricing under-linked; INTERNAL-LINKING.md stale | P2 | Orphan / doc drift |
| 10 | Primary CTA is “Apply Now” — OK brand, weak SERP/outcome language on landers | P1 | CTR + conversion |

---

## Opportunities

1. Rank for **service × industry × location** commercial queries with real money pages.
2. Convert Boerne/Frisco/Georgetown impressions → clicks with dedicated, useful pages + better titles.
3. Deepen McKinney/Frisco/Plano/Allen uniqueness (home-service specific, not dentist-first).
4. Internal link industries ↔ services ↔ cities ↔ supporting blog posts.
5. Outcome CTAs: free local search audit / where you’re losing Google leads — without fake scarcity (5-client limit stays truthful).

---

## Architecture recommendation (reuse existing URLs)

```
/
  /services/local-seo/                    KEEP & improve
  /services/google-business-profile/      KEEP & improve
  /services/seo-content/                  KEEP
  /industries/                            NEW hub
      /hvac-seo/                          NEW
      /plumber-seo/                       NEW
      /roofer-seo/                        NEW
      /electrician-seo/                   NEW
      /landscaping-seo/                   NEW
  /locations/                             KEEP hub
      /frisco-tx/ /allen-tx/              KEEP paths
      /boerne-tx/ /georgetown-tx/         NEW (GSC demand)
  /{mckinney,plano,dallas,...}            KEEP root keepers
  /blog/                                  KEEP; prioritize home-service clusters
```

**Do not** mass-produce statewide city pages again. Keepers only.

---

## Page decisions

### Keep
Homepage, About (not-agency + 5 clients), Contact, Services trio, How it works, Results, FAQ, Pricing, locations hub, 15 keeper cities, home-service blog posts + Texas trade pillars for HVAC/plumbing/roofing/electrical/landscaping.

### Improve
- `/services/local-seo`, GBP, homepage meta/OG/CTAs
- McKinney, Frisco, Plano, Allen, Melissa city uniqueness
- Internal links to industries
- Sitemap to include industries + new cities

### Consolidate (already largely done)
Thin trade×city posts → Texas pillars; non-keeper cities → `/locations#region`.

### Do not create yet
Hundreds of city pages; Georgetown/Boerne industry×city matrix; dentist/lawyer money pages.

### Create now
Five industry money pages + industries hub; Boerne + Georgetown location pages; supporting posts that feed commercial pages.

---

## Location priority matrix

| Location | Target KW | Intent | GSC | Relevance | URL | Priority |
|----------|-----------|--------|-----|-----------|-----|----------|
| Frisco | local seo frisco | Commercial | Yes | High NTX | `/locations/frisco-tx` | P0 improve |
| Boerne | local seo boerne / seo boerne tx | Commercial | Yes | Texas expand | `/locations/boerne-tx` | P0 create |
| Georgetown | local seo georgetown texas | Commercial | Yes | Texas expand | `/locations/georgetown-tx` | P0 create |
| McKinney | local seo mckinney | Commercial | Likely | HQ corridor | `/mckinney` | P0 improve |
| Plano | local seo plano | Commercial | — | High NTX | `/plano` | P1 improve |
| Allen | local seo allen | Commercial | — | High NTX | `/locations/allen-tx` | P1 improve |
| Melissa | local seo melissa | Brand/local | — | Home base | `/melissa` | P1 improve |
| Prosper / Celina | local seo {city} | Commercial | — | Growth corridor | root | P2 |
| Dallas / Fort Worth | local seo dallas/fw | Competitive | — | Scale later | root | P2 later |
| Others | — | — | — | Thin risk | — | Do not build |

---

## Priority keyword / page map

| Priority | Keyword / topic | Target URL | Type |
|----------|-----------------|------------|------|
| P0 | local seo north texas / texas home services | `/services/local-seo` | Money |
| P0 | google business profile optimization | `/services/google-business-profile` | Money |
| P0 | hvac seo / local seo for hvac | `/industries/hvac-seo` | Money |
| P0 | plumber seo / plumbing seo | `/industries/plumber-seo` | Money |
| P0 | roofing seo | `/industries/roofer-seo` | Money |
| P0 | electrician seo | `/industries/electrician-seo` | Money |
| P0 | landscaping seo | `/industries/landscaping-seo` | Money |
| P0 | local seo frisco | `/locations/frisco-tx` | Location |
| P0 | local seo boerne / seo boerne tx | `/locations/boerne-tx` | Location |
| P0 | local seo georgetown texas | `/locations/georgetown-tx` | Location |
| P0 | local seo mckinney | `/mckinney` | Location |
| P1 | why not showing in google maps | blog support | Informational |
| P1 | missed calls local seo roi | blog support | Informational |
| P1 | hvac google maps rankings | blog → HVAC money | Informational |

---

## Implementation status

| Workstream | Status |
|------------|--------|
| Audit document | **Done** |
| Industry money pages + hub | **Done** (`/industries` + 5 trades) |
| Boerne / Georgetown pages | **Done** (`/locations/boerne-tx`, `/locations/georgetown-tx`) |
| Technical SEO (OG, schema, redirects, sitemap) | **Done** (partial OG sitewide; Service + Breadcrumb on cities/industries) |
| CTA / conversion copy | **Done** (audit CTA + preserved 5-client + not-agency) |
| Internal linking | **Done** (docs + homepage/services/cities/industries) |
| Supporting content cluster | **Done** (3 authority posts) |
| Priority city uniqueness | **Partial** (McKinney/Frisco/Allen + Boerne/Georgetown) |
| Non-ICP blog noindex / prune | **Deferred** |
| Full city mid-body de-templating | **Deferred** (next sprint) |

---

## Expected impact (realistic)

- **30 days:** Better CTR on improved titles/descriptions; industry pages indexed; Boerne/Georgetown land impressions.
- **60 days:** Industry pages start ranking for long-tail; internal links lift service pages.
- **90 days:** Positions 5–30 opportunities to push; first qualified organic leads possible if CTAs + contact path stay clear.

Do not treat impression growth alone as success. Track clicks → contact form → booked calls.
