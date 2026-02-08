# Bluebonnet Growth

A professional website for Bluebonnet Growth, serving McKinney, Texas and the greater North Texas community with business growth, marketing, and community outreach services.

## Project Structure

```
bluebonnet-growth/
├── assets/              # Images, logos
│   └── bluebonnet-banner-logo.png
├── components/          # Reusable UI components
│   ├── header.html
│   ├── footer.html
│   └── nav.js
├── pages/               # Additional pages
│   └── services/        # Individual service pages
├── styles/
│   └── main.css         # Global styles
├── index.html           # Homepage
├── services.html        # Services overview
├── about.html           # About page
├── contact.html         # Contact form
└── blog.html            # Blog placeholder
```

## Setup

### Contact Form (Required)

The contact form uses [Formspree](https://formspree.io/) to send submissions to your email.

1. Sign up at [formspree.io](https://formspree.io/) (free tier available)
2. Create a new form and use your email: `bluebonnetgrowth@gmail.com`
3. Copy your form ID from the Formspree dashboard
4. Open `contact.html` and replace `YOUR_FORMSPREE_FORM_ID` in the form `action` attribute:

```html
<form action="https://formspree.io/f/YOUR_FORMSPREE_FORM_ID" method="POST">
```

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
