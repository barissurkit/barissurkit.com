# barissurkit.com

Personal portfolio website for Barış Sürkit, a software developer and Computer Engineering student building reliable products across software, AI, data, and the web.

**Live site:** [barissurkit.com](https://barissurkit.com)

## What is included

- Selected project showcase for AI Search Engine, DevLens, BütçeDostum, and the portfolio itself
- Engineering-focused case studies for [AI Search Engine](https://barissurkit.com/projects/ai-search-engine/) and [DevLens](https://barissurkit.com/projects/devlens/)
- English/Turkish language switching with persisted light/dark theme preference
- Responsive layout, skip link, keyboard focus styles, semantic landmarks, and descriptive image alternatives
- Canonical URLs, Open Graph/Twitter metadata, JSON-LD person data, `robots.txt`, and `sitemap.xml`
- Downloadable English and Turkish CV PDFs with semantic HTML companions in `cv-source/`

## Tech stack

This is a dependency-free static site built with HTML, CSS, and vanilla JavaScript. Assets are served locally; Google Fonts are an optional remote font source.

## Repository structure

```text
index.html                    Homepage
projects/                     Project index and case studies
images/                       Profile and project screenshots
script.js                     Theme, language, and mobile navigation behavior
style.css                     Shared visual system and responsive layout
cv-source/                    Accessible HTML CV companions and print styles
Baris_Surkit_CV_*.pdf         Downloadable CVs
robots.txt / sitemap.xml      Search engine discovery files
```

## Local development

No build step is required. Serve the repository directory with any static server, for example:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>. Opening HTML files directly can make relative navigation and some browser features behave differently from deployment.

## Deployment

The site is deployed as a GitHub Pages static site with the custom domain in `CNAME`. The production URL is <https://barissurkit.com>.

## CV files

The supplied PDF exports are the canonical downloadable CVs. The files in `cv-source/` are synchronized semantic HTML companions for accessibility and maintenance. They intentionally use `noindex, nofollow`; the public portfolio pages are the discoverable documents.

## Contact

- [GitHub](https://github.com/barissurkit)
- [LinkedIn](https://www.linkedin.com/in/barissurkit/)
- [Email](mailto:baris.surkit.dev@gmail.com)
