---
name: lunafrost
colors:
  surface: '#10141a'
  surface-dim: '#10141a'
  surface-bright: '#353940'
  surface-container-lowest: '#0a0e14'
  surface-container-low: '#181c22'
  surface-container: '#1c2026'
  surface-container-high: '#262a31'
  surface-container-highest: '#31353c'
  on-surface: '#dfe2eb'
  on-surface-variant: '#c2c7ce'
  inverse-surface: '#dfe2eb'
  inverse-on-surface: '#2d3137'
  outline: '#8c9198'
  outline-variant: '#42474d'
  surface-tint: '#a2cbf0'
  primary: '#aad4f9'
  on-primary: '#003350'
  primary-container: '#8fb8dc'
  on-primary-container: '#1c4968'
  inverse-primary: '#396282'
  secondary: '#95ccfa'
  on-secondary: '#00344f'
  secondary-container: '#004e75'
  on-secondary-container: '#86beec'
  tertiary: '#bbd2e7'
  on-tertiary: '#1c3343'
  tertiary-container: '#a0b6cb'
  on-tertiary-container: '#324859'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#cbe6ff'
  primary-fixed-dim: '#a2cbf0'
  on-primary-fixed: '#001e31'
  on-primary-fixed-variant: '#1e4a69'
  secondary-fixed: '#cbe6ff'
  secondary-fixed-dim: '#95ccfa'
  on-secondary-fixed: '#001e30'
  on-secondary-fixed-variant: '#004b71'
  tertiary-fixed: '#cee5fb'
  tertiary-fixed-dim: '#b2c9df'
  on-tertiary-fixed: '#051d2e'
  on-tertiary-fixed-variant: '#33495b'
  background: '#10141a'
  on-background: '#dfe2eb'
  surface-variant: '#31353c'
typography:
  display-lg:
    fontFamily: ebGaramond
    fontSize: 72px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: ebGaramond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  title-md:
    fontFamily: dmSans
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: dmSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: dmSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 160px
---

## Brand & Style
This design system is crafted for a high-end developer and AI portfolio that balances technical precision with editorial elegance. The brand personality is "The Cold Explorer"—intellectual, focused, and sophisticated. 

The aesthetic is a hybrid of **Minimalism** and **Glassmorphism**, infused with a **Technical/Scientific** edge. It utilizes expansive whitespace (negative space) to allow content to breathe, punctuated by razor-thin grid lines that evoke a sense of architectural planning and digital craftsmanship. The emotional response should be one of "quiet authority" and "premium clarity."

## Colors
The palette is rooted in the deep void of space, utilizing a sophisticated dark mode foundation. 

- **Background:** The primary canvas is `#080C12`, a deep, near-black charcoal that provides infinite depth.
- **Primary & Secondary:** Soft, frosted blues (`#8FB8DC`, `#6BA3CF`) act as technical accents, used for interactive elements and data visualization.
- **Tertiary/Highlight:** A pale, icy blue (`#C8DFF5`) is reserved for high-contrast highlights and subtle glows.
- **Typography:** Pure white is avoided for long-form reading; instead, use layered grays derived from the blue spectrum to maintain the "frost" aesthetic while reducing eye strain.

## Typography
The system employs a high-contrast typographic hierarchy to distinguish between "Human Expression" and "Technical Logic."

- **The Expression (Serif):** `ebGaramond` is used for large displays and headlines. It should be typeset with tight tracking to emphasize its elegant, literary silhouette.
- **The Narrative (Sans):** `dmSans` provides a clean, low-contrast foundation for body text, ensuring maximum readability on digital screens.
- **The Data (Mono):** `jetbrainsMono` (suggested for technical labels) is used for metadata, slogans, and code snippets, reinforcing the developer-centric nature of the portfolio.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop and a **Fluid Fluid** approach on mobile.

- **Grid:** A 12-column grid is used for desktop (1280px max-width). Elements are often offset or intentionally misaligned with the grid to create a sophisticated, editorial "magazine" feel.
- **Rhythm:** An 8px base unit governs all spacing. Section gaps are intentionally large (160px+) to create a premium, unhurried browsing experience.
- **The Grid Layer:** A subtle, 0.5px border-weight grid pattern (`rgba(200, 223, 245, 0.05)`) should be visible in the background of major sections, reinforcing the "Technical Explorer" theme.

## Elevation & Depth
Depth is created through transparency and light rather than heavy shadows.

- **Backdrop Blurs:** Navigation bars and floating cards use a high-density blur (20px - 40px) with a semi-transparent background (`rgba(8, 12, 18, 0.7)`).
- **Inner Glows:** Instead of drop shadows, active elements use a 1px "inner-stroke" or "rim-light" effect on the top and left edges to simulate light hitting a frosted surface.
- **Tonal Tiers:** Surfaces are separated by subtle shifts in the neutral hex. Elevated cards use `#121820` against the `#080C12` base.

## Shapes
Shapes are disciplined and architectural. The default roundedness is kept low (`Soft`) to maintain a professional, slightly sharp technical edge.

- **Standard Elements:** 4px (`0.25rem`) corner radius for buttons and inputs.
- **Containers/Cards:** 8px (`0.5rem`) for larger surface areas.
- **Exceptions:** Pill shapes are used exclusively for "Status" tags or "AI" indicators to provide a visual break from the otherwise rigid geometry.

## Components
- **Buttons:** Primary buttons use a ghost style with a 1px border of `#8FB8DC`. On hover, they fill with a subtle gradient and a soft outer glow (bloom effect).
- **Chips/Tags:** Use `label-sm` typography. Backgrounds are transparent with a very light border. For "AI" related tags, use a subtle purple-to-blue gradient stroke.
- **Input Fields:** Bottom-border only by default, evoking a terminal or a ledger. On focus, the border color transitions to the primary icy blue.
- **Cards:** Bordered with `0.5px` solid lines. No drop shadows. Content inside cards should have generous internal padding (32px+).
- **Interactive Lines:** Use thin vertical and horizontal lines as separators that appear to "grow" or animate in as the user scrolls, emphasizing the "Strategy Explorer" narrative.
- **Cursor:** A custom circular "lens" cursor that creates a localized "frost-clear" effect or slight magnification when hovering over portfolio images.