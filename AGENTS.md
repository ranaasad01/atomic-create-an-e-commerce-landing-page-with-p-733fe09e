# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Create an e-commerce landing page with product cards

Additional details provided by the user:
- What is the name of your store?: Pet360
- What type of products will you sell?: Home & Living

## Goal
Build a warm, premium e-commerce landing page for Pet360 (Home & Living) with a hero, promo banner, category filter, product card grid, featured collections, testimonials, newsletter, and footer.

## Project type
e-commerce

## Design system — match this exactly
- Color tokens: `--background: #F5F0EB`, `--foreground: #1E1A17`, `--card: #FFFAF6`, `--border: #DDD5CB`, `--muted-foreground: #7A6E65`, `--primary: #E07B4F`, `--accent: #A8C5A0`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`about`, `brand`, `collections`, `collectionsPage`, `contact`, `footer`, `hero`, `nav`, `newsletter`, `promo-banner`, `shop`, `shopPage`, `testimonials`, `trust`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
