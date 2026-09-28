# ilovebella theme toolbox

`src/styles/main.css` is already imported by the shared layout. No new page,
Astro component, JavaScript, dependency or deployment change is required.

## Foundations

The six brief colours are the source palette. Cream is the page canvas; pink
and sage are accents. Use ink/coffee for text, not pale pink. `--pink-dark`
is the stronger accent for readable text, focus-adjacent details and controls.

Free Google Fonts are loaded by a CSS import with `display=swap`: **Lato**
(regular, bold, italic) for body/navigation; **Caveat** (regular, semibold)
for short expressive headings and annotations. Fonts need an internet
connection; local fallbacks keep the site readable. You can self-host later.
Do not put `.font-handwritten` on a whole page or long paragraph.

Tokens cover colours, widths, spacing, borders, radii, shadows, durations,
layers, font families and sizes. The standard content width is 1216px;
wide is 1280px and narrow is 672px (at a 16px root size).

## Class map

Modifiers accompany a base class: `class="paper paper--sage paper--lined"`.

| Family | Available classes / modifiers |
| --- | --- |
| Type | `font-body`, `font-handwritten`, `page-title`, `section-title`, `handwritten`, `annotation`, `eyebrow`, `lede` |
| Layout | `site-container` with `--wide` / `--narrow`; `section` with `--small`; `stack`, `cluster`, `photo-cluster` |
| Buttons | `btn` with `--primary`, `--paper`, `--outline`, `--text`, `--heart` |
| Paper | `paper` with `--cream`, `--pink`, `--blush`, `--sage`, `--lined`, `--torn`, `--rotated-left`, `--rotated-right` |
| Photos | `polaroid`, `polaroid__image`, `polaroid__caption`; `--portrait`, `--landscape`, `--left`, `--right`, `--taped` |
| Notes | `note` with `--sticky`, `--paper`, `--lined`, `--torn`, `--heart`; `--pink` / `--sage` colours |
| Counters | `counter`, `counter__item`, `counter__number`, `counter__label` |
| Stats | `stat`, `stat__number`, `stat__label`; `--pink`, `--sage`, `--cream` |
| Memories | `memory-grid` with `--dense`; `memory`, `memory__image`, `memory__date`, `memory__caption`; `--portrait`, `--landscape`, `--favourite` |
| Timeline | `timeline`, `timeline__item`, `timeline__marker`, `timeline__date`, `timeline__content` |
| Forms | Native inputs, textarea/select; `field`, `field__label`, `field__hint`, `field__error`, `check-label`, `search`, `filter`, `filter--active` |
| Decoration | `tape`, `tape--left`, `tape--right`, `rotate-left`, `rotate-right`, `rotate-slight-left`, `rotate-slight-right`, `doodle`, `heart`, `heart--filled`, `sticker` |
| Motion | `paper-enter`, `photo-enter`, `lift`, `wiggle-hover` |

`site-container` is intentionally named differently from Tailwind's `container`.
All reusable classes live in `@layer components`, globals in `@layer base`.
Tailwind utilities override them without `!important`, for example
`class="paper paper--sage p-4 md:p-8"`. Palette variables also work with
`text-[var(--coffee-brown)]` and `bg-[var(--powder-blush)]`.
Use Tailwind for custom grids and placement rather than adding more utilities.

## Small markup recipes

These are usage examples, not site content. Substitute your real content/assets.

```html
<section class="section site-container">
  <div class="stack" style="--stack-gap: var(--space-5)">
    <h2 class="section-title">Section heading</h2>
    <p>Readable body text.</p>
  </div>
</section>

<figure class="polaroid polaroid--portrait polaroid--left polaroid--taped">
  <img class="polaroid__image" src="/your-photo.jpg"
       width="600" height="800" alt="Describe this photo" loading="lazy" />
  <figcaption class="polaroid__caption">Short caption</figcaption>
</figure>

<aside class="note note--sticky note--sage rotate-slight-right">
  <p class="handwritten">Short note</p>
</aside>

<dl class="counter">
  <div class="counter__item">
    <dt class="counter__label">Days</dt>
    <dd class="counter__number">123</dd>
  </div>
</dl>

<ol class="timeline">
  <li class="timeline__item">
    <span class="timeline__marker" aria-hidden="true"></span>
    <time class="timeline__date" datetime="2026-01-01">Date label</time>
    <div class="timeline__content paper paper--torn">Your content</div>
  </li>
</ol>

<div class="field search">
  <label class="field__label" for="memory-search">Search memories</label>
  <input id="memory-search" type="search" placeholder="Place or caption"
         aria-describedby="search-help" />
  <p class="field__hint" id="search-help">A short description of your search.</p>
</div>
<button class="filter" type="button" aria-pressed="true">Filter label</button>

<button class="btn btn--heart" type="button" aria-label="Favourite" aria-pressed="false">
  <svg class="heart" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21S3 15 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 7-9 13-9 13Z" />
  </svg>
</button>
```

For a memory, use a `figure.memory` containing `img.memory__image` and a
`figcaption` containing `time.memory__date` / `.memory__caption`.
`.memory-grid` styles a wrapper only; it does not make items clickable.
`.memory--favourite` adds a decorative heart: include visible or `sr-only`
text for that state. `.heart` styles an SVG you supply, not an icon library.

## Composition and accessibility

- Choose one note material: sticky, paper, lined, torn or heart. Colour and
  rotation modifiers can accompany materials. `note--paper note--torn` works
  together; heart is a standalone blush silhouette for a short line or two.
  It expands with content, but longer letters belong on ordinary paper.
- Torn shapes affect pseudo-elements only. Avoid clipping entire containers,
  as that would also clip text and focus rings. Tape occupies `::before` on
  taped Polaroids; torn edges use `::after`; heart notes use `::before`.
- Use `polaroid--left/right` for photos so hover moves toward zero. Avoid
  stacking generic rotation classes on Polaroids or combining several hover
  effects on one element. Entrances use translate/opacity; wrap a photo if
  you want entrance and hover effects to run independently.
- Keep overlapping photos in small `photo-cluster` groups and allow room for
  rotations/tape. Use real image dimensions and meaningful alt text.
- The gallery uses two columns from 353px, three from 640px and four from
  1024px (five with `memory-grid--dense`). Smaller screens fall back to one.
  Timeline order remains sequential; it alternates at 1024px, with a single
  left spine below. Counters use three mobile columns, six from 640px, two
  below 353px. Change placement with Tailwind when a composition needs it.
- Buttons, filters and text controls are at least 44px tall. Wrap native
  checkbox/radio inputs in `check-label` labels for a practical touch target.
  Use real labels, not placeholders alone. Pair `aria-invalid="true"` with
  a `.field__error` message referenced by `aria-describedby`.
- `aria-pressed` and `aria-current` style active filters. Your future code must
  manage state and behaviour. `aria-disabled` supplies styling only; use
  native `disabled` for buttons or prevent activation yourself.
- Pink is never the default body-text colour. Focus rings stay visible.
  Entrance effects run once; hover/tap lasts 180–240ms. Reduced motion removes
  theme transitions, entrances and hover movement. Any Tailwind animations
  you add should also use `motion-safe:` / `motion-reduce:` as appropriate.

No preview route is shipped. Existing pages, components and GitHub Pages
configuration are unchanged; only their inherited global theme changes.
