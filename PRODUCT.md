# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Anyone who wants an idea of who Elias is and what Elias does. That includes recruiters and hiring managers, peers and the wider community (fellow students, people at Aalto, developers who find the blog or GitHub), and startup or co-founder contacts. No single audience dominates. It is a personal site first and not load-bearing for a career, so it shouldn't be optimised as a hiring funnel.

## Product Purpose

A fun personal homepage that shows who Elias is, what Elias has built and what Elias is doing now. A visit succeeds when the visitor:

- **sees the depth:** hands-on low-level projects (CHIP-8 and Intel 8080 emulators, a database in Rust) and professional development since high school;
- **gets who Elias is:** personality and range, not just a skills list;
- **reaches out** when they want to, by email or LinkedIn.

## Positioning

A personal site built and maintained by its owner, about one person's real path: self-taught projects, a long traineeship that started in high school, Aalto studies and a startup. Its CV is an interactive timeline you can trace by skill, not a static résumé.

## Operating Context

- Visitors usually arrive from a link: LinkedIn, GitHub, an application or a message.
- Content is authored in the repo as data: `src/content/cv.json` for the CV timeline, MDX files in `src/content/projects/` and `src/content/blog/`, and `src/content/now.json` for the "Right now" list.
- The "Right now" list is updated remotely through a Telegram bot (`bot/`), which commits to `now.json` on the production branch.
- The site is deployed on Cloudflare (Workers) from the `production` branch.

## Capabilities and Constraints

- **Pages:** landing (intro, Right now, featured projects, contact links), projects index and individual project write-ups, blog index and posts, and the CV timeline (lanes on desktop, a path on phones, skill tracing, an entry readout).
- **CV entry kinds and states:** work and study entries; ongoing, planned and paused states.
- **Stack:** Vite, React 19, React Router, MDX, Phosphor icons; deployed with Wrangler.
- **Language:** English only. A Finnish version isn't planned. The `index.html` title and `lang` attribute are still Finnish and should become English.

## Brand Commitments

- **Voice:** plain and honest. First person, modest, no marketing claims or buzzwords.
- **The cat:** the cat wearing a beret with a baguette (`src/assets/lechat.png`) is part of the identity and stays.

## Evidence on Hand

- **Projects:** project write-ups and screenshots for Chip26, Chat26 and Intel26 in `src/assets/`, plus a Rust database stub.
- **CV facts:** the entries in `src/content/cv.json`, including the Trineria Oy traineeship, Hyvinkään Lukio results, an International Philosophy Olympiad honourable mention, military service, Aalto University and Flou Health.
- **Writing:** one blog post so far.
- **Contact and profiles:** GitHub, LeetCode, LinkedIn and email (`hello@eliasmakela.fi`).
- **What doesn't exist:** there are no testimonials, metrics or press, and none should be fabricated.

## Product Principles

1. **Personal before professional.** It's a homepage, not a sales page. Personality is a feature.
2. **Show, don't claim.** Depth comes through real projects, dates and write-ups, not adjectives.
3. **Honest about time.** The site says what is done, what is ongoing, what is paused and what is only planned.
4. **Easy to keep current.** Content lives in data files and the bot, so updating it should never need a design change.
5. **Reaching out is always one step away.** Contact links stay easy to find on every page.
