# HIM BAZ

Bilingual website for HIM BAZ, a UAE digital growth and technology services business.

Live site: https://him-baz.a-eae2010.chatgpt.site

## Services

- Website design and development
- E-commerce
- Mobile applications
- CRM and custom systems
- Digital marketing and Google Ads
- Social media management
- Content and video production

## Contact

- WhatsApp: [050 335 8014](https://wa.me/971503358014)
- Email: [a.eae2010@icloud.com](mailto:a.eae2010@icloud.com)

## Development

Requirements: Node.js 22.13 or newer on Linux.

```bash
npm run install:ci
npm run dev
```

## Verification

```bash
npm run lint
npm test
```

The test command creates the production build and verifies the public routes, contact details, and shared UI.

## Main files

- `app/site-shell.tsx`: shared bilingual website UI and contact form
- `app/globals.css`: brand styling and responsive layout
- `app/*/page.tsx`: public routes
- `.openai/hosting.json`: Sites project configuration

Built with Next.js-compatible Vinext, React, TypeScript, and Tailwind CSS.
