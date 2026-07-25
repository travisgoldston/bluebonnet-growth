# Bluebonnet Growth

A conversion-focused website for Bluebonnet Growth.

Bluebonnet Growth helps home service companies get more booked jobs by turning their website into a consistent source of calls and customers.

## Project Structure

```
bluebonnet-growth/
├── assets/              # Images, logos
│   ├── bluebonnet-icon.png
│   └── travis-and-victoria.png
├── components/          # Reusable UI components
│   ├── header.html
│   ├── footer.html
│   └── nav.js
├── pages/               # Additional pages (optional)
├── styles/
│   └── main.css         # Global styles
├── index.html           # Homepage
├── how-it-works.html    # How it works
├── about.html           # About page
└── contact.html         # Contact form
```

## Setup

### Contact Form (Required)

The contact form uses [FormSubmit](https://formsubmit.co/) to email submissions to `hello@bluebonnetgrowth.com`.

The first submission may require a one-click confirmation email from FormSubmit. After that, applications arrive in your inbox.

To use Formspree instead, create a form at [formspree.io](https://formspree.io/) and replace the form `action` in `contact.html`.

## Updating Content

- **Navigation**: Update header/footer links in each HTML file, or sync from `components/header.html` and `components/footer.html` as reference
- **Colors & typography**: Edit CSS variables in `styles/main.css` (`:root` section)
- **Copy**: Edit content directly in each page's HTML

## GitHub Integration

1. Initialize Git (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/bluebonnet-growth.git
   git branch -M main
   git push -u origin main
   ```

3. For **GitHub Pages** deployment:
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` / `root`
   - Save

## Tech Stack

- Plain HTML, CSS, JavaScript
- No build step required
- Mobile-first responsive design
- Formspree for contact form submissions
