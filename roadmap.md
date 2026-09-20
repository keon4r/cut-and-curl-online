# Barber shop site — roadmap

## Task
Build a barber shop website (single main page) in the chosen "Stropped bone" design direction:
warm espresso/bone/brass palette, Anton display type, menu-style price list, barber portraits,
gallery, hours & location, and a book-a-chair flow.

## Steps
- [x] Define design tokens (espresso, bone, oxblood, brass, fonts) in `src/styles.css`
- [x] Load fonts (Anton, Inter, JetBrains Mono) via `<link>` in `src/routes/__root.tsx`
- [x] Generate photography: 3 barber portraits, 4 gallery squares, 1 storefront
- [x] Build the homepage at `/` (`src/routes/index.tsx`) matching the direction's composition
- [x] Add booking slide-over: service → barber → day → time slot → confirm
- [x] Route head metadata (title, description, og/twitter) on `/`
- [x] Verify build + preview render (desktop + phone, booking flow end to end, no console errors)

## Open questions
- Shop name, address, phone and prices are placeholders — owner to supply real ones.
- Bookings are not stored anywhere yet — they only confirm in the panel. Needs a backend
  (Lovable Cloud) if the shop wants a real appointment book.
