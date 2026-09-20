# Barber shop site — roadmap

## Task
Build a barber shop website (single main page) in the chosen "Stropped bone" design direction:
warm espresso/bone/brass palette, Anton display type, menu-style price list, barber portraits,
gallery, hours & location, and a book-a-chair flow.

## Steps
- [ ] Define design tokens (espresso, bone, oxblood, brass, fonts) in `src/styles.css`
- [ ] Load fonts (Anton, Inter, JetBrains Mono) via `<link>` in `src/routes/__root.tsx`
- [ ] Generate photography: 3 barber portraits, 4 gallery squares, 1 storefront
- [ ] Build the homepage at `/` (`src/routes/index.tsx`) matching the direction's composition
- [ ] Add booking slide-over: service → barber → day → time slot → confirm
- [ ] Route head metadata (title, description, og/twitter) on `/`
- [ ] Verify build + preview render

## Open questions
- Shop name, address, phone and prices are placeholders — owner to supply real ones.
