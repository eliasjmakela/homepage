---
name: Elias Mäkelä
description: A personal site of square paper tiles laid out as a calm, playful mosaic on a pale sky.
colors:
  deep-lagoon: "#0d6b70"
  toasted-butter: "#e3c172"
  toasted-butter-light: "#f6e6c1"
  ink-navy: "#010e24"
  hairline-black: "#000000"
  pale-sky: "#dffbff"
  board-cyan: "#c2f5ff"
  sky-haze: "#84ebff80"
  paper-white: "#ffffff"
typography:
  display:
    fontFamily: "Fraunces, serif"
    fontSize: "4rem"
    fontWeight: 600
    lineHeight: "normal"
  headline:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
  tagline:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
  title-small:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
  body-large:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.3
rounded:
  none: "0px"
spacing:
  gap: "0.5em"
  chip-y: "0.5em"
  chip-x: "0.9em"
  link-y: "0.6em"
  link-x: "1em"
  tile: "1.5em"
  board: "1em"
components:
  tile:
    backgroundColor: "{colors.pale-sky}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.none}"
    padding: "1.5em"
  tile-hover:
    backgroundColor: "{colors.deep-lagoon}"
    textColor: "{colors.paper-white}"
  chip:
    backgroundColor: "{colors.pale-sky}"
    textColor: "{colors.ink-navy}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.5em 0.9em"
  chip-selected:
    backgroundColor: "{colors.deep-lagoon}"
    textColor: "{colors.paper-white}"
  tag:
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.none}"
    padding: "0.35em 0.9em"
  outline-link:
    textColor: "{colors.ink-navy}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.6em 1em"
  board:
    backgroundColor: "{colors.board-cyan}"
    rounded: "{rounded.none}"
    padding: "1em"
  entry-tile:
    backgroundColor: "{colors.pale-sky}"
    textColor: "{colors.ink-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.55em 0.75em"
  now-flag:
    backgroundColor: "{colors.ink-navy}"
    textColor: "{colors.pale-sky}"
    padding: "0.1em 0.45em"
  code-block:
    backgroundColor: "{colors.ink-navy}"
    textColor: "{colors.pale-sky}"
    rounded: "{rounded.none}"
    padding: "1em"
  project-lead:
    backgroundColor: "{colors.pale-sky}"
    textColor: "{colors.hairline-black}"
    rounded: "{rounded.none}"
    padding: "1.25em"
  project-row:
    backgroundColor: "{colors.pale-sky}"
    textColor: "{colors.hairline-black}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.9em 1em"
  say-hi:
    textColor: "{colors.hairline-black}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "1.5em"
  say-hi-hover:
    backgroundColor: "{colors.deep-lagoon}"
    textColor: "{colors.paper-white}"
---

# Design System: Elias Mäkelä

## Overview

**Creative North Star: "The Quiet Mosaic"**

The site is a mosaic of square tiles fitted edge to edge on a pale sky. Each section, link and fact is its own tile: a flat pale-cyan card with a black hairline border and a hard offset shadow. It borrows its bones from neo-brutalism (square corners, visible borders, shadows with no blur) and keeps the volume low. The colours are soft, the weights are light and nothing shouts. It hints at cut paper without imitating it. There are no textures, no curled edges, no material simulation. The tiles are abstract shapes.

The playfulness lives in a few details, never in the base system: a cat in a beret on a buttery tile, a pawn sitting on the selected square of the CV path, and the rails, dashed futures and double edges that encode time. Interaction is quiet and exact. A tile answers a hover by flooding with one teal, and buttons lift by two pixels. That is the whole vocabulary.

Density is generous on content pages and tight on the CV timeline, where tiles are sized to fit their text exactly.

**Key Characteristics:**
- Square corners everywhere. There is no radius in the system.
- Black 1px hairlines outline every object.
- One hard shadow (3px 3px, no blur) marks a standalone tile.
- One accent, Deep Lagoon, used only as a response to hover or selection.
- A pale cyan sky gradient as the page ground, with Toasted Butter as the single warm counterpoint.
- Line style carries meaning: solid for what has happened, dashed for what is planned, a double edge for what is ongoing.

## Colors

A cool, airy palette of pale cyans and navy ink, with one deep teal for interaction and one warm butter-gold for the personal touch.

### Primary
- **Deep Lagoon** (`deep-lagoon`): the only accent. It fills a tile, chip, control or nav link on hover, marks a pressed skill chip, and tints a CV rail on hover. Text on it is always Paper White.

### Secondary
- **Toasted Butter** (`toasted-butter`, with `toasted-butter-light`): a 130° gradient (light → butter → light) used only for personal moments: the cat square beside the landing tagline, the "now" square on the CV path, and the footer's "Say hi" tile. Decorative tiles stay put on hover; "Say hi" is a link, so it floods Deep Lagoon like every other link. The cat appears once per page: the "Say hi" tile carries the gold without it.

### Neutral
- **Ink Navy** (`ink-navy`): all body text, headings, the focus ring, CV mini-bars, the now line and flag, connectors, the pawn, and code-block backgrounds.
- **Hairline Black** (`hairline-black`): every border. At 30% alpha it is the tile shadow, at 10% the dimmed shadow, and at 15–16% the timeline grid lines.
- **Pale Sky** (`pale-sky`): the resting fill of every tile, chip, control and entry, and the text colour on dark (code, now flag).
- **Board Cyan** (`board-cyan`): the timeline surface tiles sit on, and the fill of anything "not yet": planned entries and future rails. It reads as unfilled but still hides lines behind it.
- **Sky Haze** (`sky-haze`): the middle band of the page background, a vertical gradient Pale Sky → Sky Haze (40–60%) → Pale Sky.
- **Paper White** (`paper-white`): text and links on Deep Lagoon.

### Named Rules
**The Response-Only Accent Rule.** Deep Lagoon never sits on a resting element. It appears only as an answer to the pointer (hover) or to a choice (a pressed chip). A screen at rest is cyan, navy and black.

**The Opaque Fill Rule.** Nothing "unfilled" is transparent. Planned tiles and future rails take the Board Cyan of the surface, so grid and now lines behind them stay hidden.

## Typography

**Display Font:** Fraunces 600, optical sizing on (with serif)
**Body Font:** IBM Plex Sans 400/600/700, plus italic 400 (with sans-serif)
**Label/Mono Font:** the system monospace, only inside blog code

**Character:** Fraunces brings a soft, characterful serif to the name and page titles only. Plex does everything else: neutral, technical, honest.

### Hierarchy
- **Display** (Fraunces 600, 4rem, 3rem ≤700px): the page title (name, "CV", project names), centred inside its own tile. Left-aligned only on blog posts.
- **Headline** (Plex 700, 2rem): section labels ("Right now", "Projects"), set top-left inside the tile that holds their content, never in a tile of their own.
- **Tagline** (Plex 600, 2.5rem, line-height 1.2, left-set): the short landing line beside the cat. It's bigger than the section labels but lighter, so it reads as a statement rather than another heading. Its tile shrinks to fit the words, up to 55% wide. On phones it drops to 1.6rem (1.4rem at 400px or below), staying above the labels.
- **Title Small** (Plex 700, 1.25rem): phones only. Section labels and project card names step down to it, so the order stays tagline, then labels and cards, then 1rem text.
- **Title** (Plex 700, 1.5rem): nav and footer links, project tile names, readout and write-up headings (left-aligned).
- **Body Large** (Plex 400, 1.5rem, 1rem ≤700px): landing copy, "now" items, project facts. The site's default text size is large.
- **Body** (Plex 400, 1rem, line-height 1.6): long-form blog and project write-ups in a 45rem column, chips, tags in context, readout text.
- **Label** (Plex 400, 0.9rem, line-height 1.3): CV entry tiles, lane labels (700), ruler years (italic, tabular numbers), hints (italic). The now flag is 0.8rem/700.

### Named Rules
**The One Serif Rule.** Fraunces is only for `h1`. Everything else, including h2 section headers, is Plex.

**The Italic Is Metadata Rule.** Italic Plex marks secondary information: dates and spans, "Last updated", ruler years and hints. It is never used for emphasis in UI.

## Layout

The page is a flex mosaic: tiles stacked in rows and columns, with a universal `0.5em` gap that becomes the visible "grout" between tiles. There is no page-wide grid. Two local grids exist only so edges meet: the landing body's two equal halves, and the footer's six columns that put "Say hi" on the same split. Pages are full-height columns (`100vh`/`100dvh`) with the footer pushed to the bottom.

- **Landing:** a square name tile (`clamp(20em, 25vw, 30em)`, `aspect-ratio: 1`) beside a stacked nav column whose three tiles share its height exactly, with sky to its right. Under it, the tagline tile stops short (55%) beside the 12rem cat square, and the two share a height. Then two equal halves: intro and "Right now" on the left, projects on the right. Each half keeps its own height, so sky shows under the shorter one. The footer's six columns put the "Say hi" edge on that same split.
- **Reading pages (blog, project write-ups):** a single 45rem column, centred.
- **CV:** a full-width board holding horizontal lanes (desktop) or a vertical path of squares (phones), with a sticky lane-label column and a minimap above.

**Breakpoints:** at 700px every `.row` becomes a column, type steps down (h1 3rem, body 1rem), the cat square shrinks to 10rem, section labels and card names step down to Title Small (1.25rem), and the footer becomes "Say hi" over three link tiles. At 400px the tagline and page links shrink again.

## Elevation & Depth

Depth is a single flat step. A standalone tile casts a hard offset shadow with no blur, as if it were cut out and laid one layer above the sky. Everything nested inside a tile (chips, tags, links, the timeline surface) is flat and outlined only. Hover on a button adds a second step: it lifts by translating up and left by 2px.

### Shadow Vocabulary
- **Tile lift** (`box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3)`): every `block-main` tile, buttons, CV entry cards.
- **Dimmed tile** (`box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1)`): a CV entry faded out by a skill filter.
- **Pawn** (`box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3)`): the marker on the selected CV square.

### Named Rules
**The One Layer Rule.** Only top-level tiles cast a shadow. Anything sitting on a tile is flat, with no shadow and no lift. That keeps the tiles the only objects with depth.

**The No Blur Rule.** Shadows are always hard offsets. A blurred or ambient shadow breaks the mosaic.

## Shapes

Every form is a rectangle with square corners. Borders are a 1px solid black hairline. Line style carries state:

- **Dashed** border or rail: planned / future.
- **3px double right edge:** ongoing, with no end yet. CV entries only; project tiles and rows keep a single hairline and say "Ongoing" in words.
- **3px solid Ink Navy outline:** focus and selection. It sits 2px outside most elements, and 7px inside the border on tiles, which touch the window edge.

The CV adds two signature forms: a 6px **rail** under each tile, drawn to the entry's true length (solid for the past, dashed and hollow for the future), and a small 14px **pawn** square on the selected path entry.

## Components

Every component is quiet and precise: an outlined rectangle that answers the pointer exactly once.

### Tiles (`block-main`)
- **Shape:** square (0px), 1px black hairline.
- **Background:** Pale Sky; Ink Navy text.
- **Shadow Strategy:** Tile lift (see Elevation).
- **Internal Padding:** 1.5em.
- **Hover (when it is a link):** floods with Deep Lagoon, text turns Paper White. Nav and footer links are tiles too, with a light-weight Phosphor arrow or icon.

### Buttons
- **Shape:** square, Tile lift shadow.
- **Hover:** translates by (-2px, -2px) and floods with Deep Lagoon.

### Chips (skill filter)
- **Style:** Pale Sky fill, 1px black border, Plex 400 1rem, padding 0.5em 0.9em. No shadow and no lift, because chips sit on a tile.
- **State:** hover and `aria-pressed="true"` both fill with Deep Lagoon and Paper White text.

### Tags
- **Style:** an inline outline with no fill, Plex 1.1rem, padding 0.35em 0.9em, with an optional light Phosphor icon at 1.2em. Used for tech and blog tags, in wrapping rows, but never inside a clickable card, where an outlined box would read as its own button.

### Outline Links
- **Style:** inline-flex, 1px black border, padding 0.6em 1em, Plex 1rem, with a trailing light arrow. Used for project and readout links (demo, source, write-up).

### Navigation
- **Style:** a column of full tiles, Plex 700 1.5rem, label left and arrow right. "Back" links put the arrow first. The footer starts with the Toasted Butter "Say hi" tile, left-aligned: a 1rem/600 label over the address at 1.5rem/700, as bold as the link titles beside it. Then come GitHub, LeetCode and LinkedIn tiles, each with a 32px light Phosphor icon under its label. At 700px or below, "Say hi" spans the full width above the three links.

### Landing projects
- **Lead:** the one project with a picture, chosen by `featured: true` in its frontmatter. Its screenshot sits beside the text, whole and uncropped on black, so it reads as a screen.
- **Rows:** every other project is a text row, newest first: name and arrow, summary, then one plain metadata line with the tech, the span in italic and, unless it's finished, its status ("C# · *2021–2022* · Set aside", "Rust · *2026* · Ongoing"). An ongoing span drops its trailing dash, since the status says it. Rows keep a single hairline; their status is already in words.
- Both are flat, outlined cards on the Projects tile, and the whole card is the link.

### Focus
- **Default:** a 3px Ink Navy outline, offset 2px.
- **Tiles:** on `.block-main` links the ring is drawn inside the border (offset -7px), because tiles touch the window edge, which would otherwise clip it.

### CV Timeline (signature)
- **Board:** Board Cyan surface, hairline border, no shadow, 1em padding.
- **Entry tile:** Pale Sky card with Tile lift, Label type, title in 700 (never wraps on lanes), span in italic, and an outlined kind tag at the foot. Hover floods the card Deep Lagoon and tints its rail. Selection gets the 3px Ink Navy outline. Dimmed entries keep an opaque fill and fade only their contents to 32%.
- **Rail, now line and flag:** the rail sits under the card. A 2px Ink Navy now line at 40% runs behind the tiles. The now flag is an Ink Navy label with Pale Sky text.
- **Minimap:** 40px Pale Sky strip with 7px ink bars and a 2px-bordered window.
- **Path (phones):** stacked entry squares joined by 2px ink connectors (dashed for the future), the pawn on the selected square, and a Toasted Butter "now" square with the cat.

## Do's and Don'ts

### Do:
- **Do** keep every corner square (0px) and every border a 1px black hairline.
- **Do** give standalone tiles the `3px 3px 0 rgba(0, 0, 0, 0.3)` shadow and keep anything nested on a tile flat.
- **Do** show interaction with exactly one Deep Lagoon fill and Paper White text.
- **Do** encode time with line style: solid for the past, dashed for the future, a double right edge for ongoing.
- **Do** fade a tile's contents, not its fill, when dimming it, so it stays opaque over the lines behind it.
- **Do** use light-weight Phosphor icons, sized 1em inline or 32px in the footer.
- **Do** keep a link card's metadata as one plain line, so the card is the only thing in it that looks clickable.
- **Do** let edges meet exactly where tiles pair (name and nav, tagline and cat, the body split and "Say hi"), and leave sky where they don't.
- **Do** respect `prefers-reduced-motion` for any transition you add.

### Don't:
- **Don't** add a border-radius, a blurred shadow or a glow.
- **Don't** use Deep Lagoon as a resting fill or for decoration.
- **Don't** add gradients beyond the sky ground and the Toasted Butter personal tiles.
- **Don't** use Fraunces below `h1`, or for UI text.
- **Don't** add texture, paper grain or other skeuomorphic detail. The cut-paper feeling stays abstract.
- **Don't** put a shadow or hover lift on chips, tags or anything else that sits on a tile.
