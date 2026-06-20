#!/usr/bin/env python3
"""Wrap live site pages in the V2 nav/footer shell and strip em dashes."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SKIP_FILES = {
    "master-template.html",
    "city-lander-template.html",
    "index.html",
    "services.html",
    "results.html",
    "how-it-works.html",
    "about.html",
    "contact.html",
    "blog.html",
}

SKIP_DIRS = {"preview", "incoming", "resources", "components", "scripts", ".git", "assets"}

GTAG = """    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QG3FTP7PC3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QG3FTP7PC3');
    </script>"""


def fix_em_dashes(text: str) -> str:
    def fix_title(match: re.Match[str]) -> str:
        return match.group(0).replace(" — ", " | ").replace("—", " | ")

    text = re.sub(r"<title>[^<]+</title>", fix_title, text, flags=re.IGNORECASE)
    text = text.replace(" — ", ", ")
    text = text.replace("—", ", ")
    text = re.sub(r",\s*,", ",", text)
    return text


def extract_tag(pattern: str, html: str) -> str | None:
    match = re.search(pattern, html, re.IGNORECASE | re.DOTALL)
    return match.group(1).strip() if match else None


def extract_main(html: str) -> str | None:
    match = re.search(r"(<main\b[^>]*>.*?</main>)", html, re.IGNORECASE | re.DOTALL)
    return match.group(1) if match else None


def active_slug(path: Path) -> str:
    name = path.stem
    if path.parent.name == "blog":
        return "blog"
    mapping = {
        "local-seo": "services",
        "web-design": "services",
        "conversion-optimization": "services",
        "proof": "about",
        "pricing": "services",
        "locations": "about",
        "frisco-tx": "about",
        "allen-tx": "about",
    }
    return mapping.get(name, name)


def nav_html(active: str) -> str:
    links = [
        ("results", "Results"),
        ("services", "Services"),
        ("how-it-works", "How it works"),
        ("about", "About"),
        ("blog", "Blog"),
    ]
    items = []
    for slug, label in links:
        cls = ' class="is-active"' if slug == active else ""
        items.append(f'        <a href="/{slug}"{cls}>{label}</a>')
    link_block = "\n".join(items)
    return f"""    <nav class="nav" aria-label="Primary navigation">
      <a class="nav-logo" href="/">
        <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="34" height="34" />
        <span class="nav-logo-text">Bluebonnet Growth</span>
      </a>
      <div class="nav-links">
{link_block}
      </div>
      <a href="/contact" class="nav-cta">Apply Now</a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-drawer" data-nav-drawer aria-label="Mobile navigation">
{link_block}
      <a href="/contact">Apply Now</a>
    </div>"""


def footer_html() -> str:
    return """    <footer>
      <div>
        <div class="footer-brand-row">
          <img src="/assets/bluebonnet-icon.png" alt="Bluebonnet Growth" width="28" height="28" />
          <div class="footer-brand">Bluebonnet Growth</div>
        </div>
        <div class="footer-tagline">Ranking North Texas local businesses on Google. One operator. Direct access. Real results.</div>
      </div>
      <div>
        <div class="footer-col-title">Pages</div>
        <ul class="footer-links">
          <li><a href="/results">Results</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/how-it-works">How it works</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/locations">Locations</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Ready to rank?</div>
        <div class="footer-cta-text">Limited to 5 clients at a time. Apply to see if there is a spot open for your business.</div>
        <a href="/contact" class="footer-btn">Apply Now</a>
      </div>
    </footer>

    <div class="copyright">
      <span>© 2026 Bluebonnet Growth. All rights reserved.</span>
      <span>Based in Melissa, TX · Serving North Texas</span>
    </div>"""


def head_html(path: Path, original: str) -> str:
    title = extract_tag(r"<title>(.*?)</title>", original) or "Bluebonnet Growth"
    description = extract_tag(r'<meta\s+name="description"\s+content="([^"]*)"', original)
    canonical = extract_tag(r'<link\s+rel="canonical"\s+href="([^"]*)"', original)
    extra_meta = []
    for prop in ("og:type", "og:title", "og:description", "og:url", "og:image"):
        val = extract_tag(rf'<meta\s+property="{re.escape(prop)}"\s+content="([^"]*)"', original)
        if val:
            extra_meta.append(f'    <meta property="{prop}" content="{val}" />')
    desc_line = f'    <meta name="description" content="{description}" />' if description else ""
    canon_line = f'    <link rel="canonical" href="{canonical}" />' if canonical else ""
    extra = "\n".join(extra_meta)
    return f"""  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
{GTAG}
    <title>{title}</title>
{desc_line}
{canon_line}
{extra}
    <link rel="icon" href="/assets/favicon-32x32.png" type="image/png" />
    <link rel="apple-touch-icon" href="/assets/favicon-32x32.png" />
    <link rel="stylesheet" href="/styles.css" />
  </head>"""


def build_page(path: Path, original: str) -> str | None:
    main = extract_main(original)
    if not main:
        return None
    active = active_slug(path)
    page = f"""<!DOCTYPE html>
<html lang="en">
{head_html(path, original)}
  <body>
{nav_html(active)}
{main}
{footer_html()}
    <script src="/script.js" defer></script>
  </body>
</html>
"""
    return fix_em_dashes(page)


def iter_html_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*.html"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.name in SKIP_FILES:
            continue
        files.append(path)
    return sorted(files)


def main() -> None:
    updated = 0
    skipped = 0
    for path in iter_html_files():
        original = path.read_text(encoding="utf-8")
        built = build_page(path, original)
        if not built:
            print(f"skip (no main): {path.relative_to(ROOT)}")
            skipped += 1
            continue
        path.write_text(built, encoding="utf-8", newline="\n")
        print(f"updated: {path.relative_to(ROOT)}")
        updated += 1
    print(f"\nDone. Updated {updated}, skipped {skipped}.")


if __name__ == "__main__":
    main()
