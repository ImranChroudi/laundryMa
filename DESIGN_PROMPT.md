# 🎨 MASTER DESIGN PROMPT — Laundry.ma Website Redesign

> **Use this prompt with any AI design tool (Figma AI, Midjourney, DALL-E, v0.dev, Relume, Framer AI, or any UI/UX design assistant) to generate a complete, cohesive, premium design system for Laundry.ma — a modern laundry pickup & delivery service based in Tanger, Morocco.**

---

## PROMPT

```
Design a complete, premium, modern website for "Laundry.ma" — a professional laundry pickup & delivery service operating in Tanger, Morocco. The website must feel trustworthy, clean, fast, and premium. It serves two audiences: everyday consumers (B2C) and businesses like hotels/restaurants (B2B). The site is fully bilingual: French (LTR) and Arabic (RTL). The design must be fully responsive (mobile-first) and optimized for conversion.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 BRAND IDENTITY & COLOR SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BRAND PERSONALITY: Clean, professional, trustworthy, modern, fast, eco-conscious, premium but accessible.

PRIMARY COLOR PALETTE:
- Primary Blue: #4DAFEF — Main brand color. Use for links, active states, icons, badges, interactive elements, subtle backgrounds (10% opacity tints), focus rings, and accent highlights.
- Secondary Red-Orange: #E54A33 — High-energy CTA color. Use ONLY for primary call-to-action buttons, urgency indicators, sale badges, and key conversion elements. Must pop against all backgrounds.
- Tertiary Dark Navy: #1E3A5F — Authority color. Use for headings, footer background, navigation text, dark overlays, stats banners, and premium sections.

EXTENDED PALETTE:
- Primary Light Tint: #E0F2FE (bg-blue-50) — Light section backgrounds, card hover states, pricing section background.
- Primary Pale: #BAE6FD (bg-blue-100) — Gradient endpoints, decorative elements.
- Primary Semi-Transparent: rgba(77,175,239,0.10) — Card shadows, subtle glows, badge backgrounds.
- Primary Glow: rgba(77,175,239,0.30) — Hover shadows, floating element glows.
- Navy Gradient End: #2C5282 — Mid-point for dark gradients (stats banner, footer gradient).
- Gradient Text End: #2B6CB0 — For gradient text effects on headings.

NEUTRAL PALETTE:
- White: #FFFFFF — Card backgrounds, page background, text on dark.
- Off-White: #F9FAFB (gray-50) — Alternating section backgrounds.
- Light Gray: #F3F4F6 (gray-100) — Input backgrounds, dividers.
- Border Gray: #E5E7EB (gray-200) — Card borders, separators.
- Muted Text: #6B7280 (gray-500) — Secondary body text, descriptions, timestamps.
- Body Text: #374151 (gray-700) — Primary body text.
- Dark Text: #111827 (gray-900) — Headlines, strong emphasis, nav items.

SEMANTIC COLORS:
- Success Green: #22C55E — Confirmation states, WhatsApp button, order delivered status.
- WhatsApp Green: #25D366 — WhatsApp floating button and contact links (hover: #22C55E).
- Warning Yellow: #F59E0B — Promotion highlights, special offer banners (bg: #FEF3C7 yellow-100).
- Star Rating Gold: #FACC15 (yellow-400) — Review stars, filled and outline.
- Error/Destructive Red: #EF4444 — Form validation errors, delete confirmations, order cancelled status.
- Purple Accent: #9333EA — Category accent for "Pressing" service (bg: #F3E8FF purple-50).
- Green Accent: #16A34A — Category accent for "Repassage" service (bg: #DCFCE7 green-50).
- Orange Accent (service): #F97316 — Category accent for "Nettoyage" service (bg: #FFF7ED orange-50).
- Blue Accent (service): #3B82F6 — Category accent for "Livraison" service (bg: #EFF6FF blue-50).

KEY GRADIENTS:
1. Hero Overlay: linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 40%, rgba(77,175,239,0.12) 70%, rgba(30,58,95,0.08) 100%) — Over hero background image.
2. Stats/Trust Banner: linear-gradient(135deg, #1E3A5F 0%, #2C5282 60%, #4DAFEF 100%) — Dark authoritative gradient for stats sections. Text: white.
3. Pricing Section BG: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%) — Soft blue gradient for pricing background.
4. Sub-Page Hero: linear-gradient(135deg, rgba(30,58,95,0.75) 0%, rgba(30,58,95,0.45) 50%, rgba(77,175,239,0.25) 100%) — Dark overlay for sub-page hero banners.
5. Gradient Text: linear-gradient(135deg, #4DAFEF 0%, #2B6CB0 100%) — Applied to key headings with background-clip: text.
6. Decorative Blobs: radial-gradient(circle, #4DAFEF 0%, transparent 70%) — Floating background decorations at 5-8% opacity.

DARK MODE (optional but designed for):
- Background: #0A0A0A
- Card Background: #1A1A1A
- Border: #2A2A2A
- Muted text: #A3A3A3
- Keep Primary #4DAFEF, Secondary #E54A33, and Tertiary #1E3A5F intact in dark mode.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔤 TYPOGRAPHY SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIMARY FONT: "Poppins" (Google Fonts) — Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).
DISPLAY FONT: "Avenir Next" — Used for big section titles and card headings. Weight: 600-700.
ACCENT FONT: "Bebas Neue" — For special uppercase decorative elements, stats numbers.

TYPE SCALE:
- Hero Headline: 58px desktop / 36px mobile — Font: Poppins, Weight: 800 (ExtraBold), Line-height: 1.1, Letter-spacing: -0.02em, Uppercase, Color: #1E3A5F with #4DAFEF highlight spans.
- Big Section Title: 70px desktop / 32px mobile — Font: Avenir Next, Weight: 700, Line-height: 1.1.
- Section Title (H2): 48px desktop / 30px mobile — Font: Avenir Next, Weight: 700, Line-height: 1.2, Color: #1E3A5F.
- Card Heading (H3): 36px desktop / 20px mobile — Font: Avenir Next, Weight: 600.
- Section Subtitle: 20px desktop / 18px mobile — Font: Poppins, Weight: 400, Color: #6B7280, Line-height: 1.6.
- Body Text: 16px — Font: Poppins, Weight: 400, Color: #374151, Line-height: 1.7.
- Small Text: 14px — Font: Poppins, Weight: 400, Color: #6B7280.
- Caption/Label: 12px — Font: Poppins, Weight: 500, Uppercase, Letter-spacing: 0.05em, Color: #6B7280.
- Price Numbers: 24px — Font: Poppins, Weight: 700, Color: #1E3A5F.
- Big Price (Promo): 60px desktop / 48px mobile — Font: Bebas Neue or Poppins Bold.
- Badge Text: 20px desktop / 18px mobile — Font: Poppins, Weight: 500.

ARABIC TYPOGRAPHY NOTES:
- Use the same Poppins font for Arabic (it has Arabic support through fallback system fonts).
- All text must respect dir="rtl" and text-align: right.
- Ensure comfortable line-height (1.8) for Arabic script readability.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 SPACING & LAYOUT SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GRID: 12-column grid, max-width 1280px (7xl), centered.

SECTION SPACING:
- Vertical padding: 96px desktop (py-24) / 64px mobile (py-16).
- Between elements within section: 48px-64px.
- Section horizontal padding: 16px mobile / 60px tablet / 120px desktop.

CARD SYSTEM:
- Border-radius: 16px (rounded-2xl) for cards, 10px (rounded-xl) for buttons.
- Card padding: 24px-32px.
- Card shadow (rest): 0 1px 3px rgba(0,0,0,0.1).
- Card shadow (hover): 0 20px 40px rgba(77,175,239,0.15).
- Card hover transform: translateY(-4px) with 300ms ease transition.
- Card border: 1px solid #E5E7EB (some cards borderless with shadow only).

BUTTON SYSTEM:
- Primary CTA: bg #E54A33, text white, rounded-xl, px-8 py-4, font-weight 600, font-size 16px.
  - Hover: brightness(1.1), shadow 0 8px 25px rgba(229,74,51,0.4).
  - Has animated "shine" sweep effect (pseudo-element, 45deg white gradient moving left to right).
  - Arrow icon (→) on the right that translates +4px on hover.
- Secondary Button: bg white, border 2px #4DAFEF, text #4DAFEF, same sizing.
  - Hover: bg #4DAFEF, text white.
- WhatsApp Button: bg #25D366, text white, rounded-xl.
  - Hover: bg #22C55E.
  - WhatsApp icon on the left.
- Ghost Button: bg transparent, text #1E3A5F, underline on hover.

BORDER RADIUS SYSTEM:
- 0.625rem (10px) — Default (--radius). Inputs, small pills.
- rounded-xl (12px) — Buttons, small cards.
- rounded-2xl (16px) — Main cards, large containers.
- rounded-3xl (24px) — Hero cards, special containers.
- rounded-full — Badges, pills, avatars, icon containers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏠 PAGE-BY-PAGE DESIGN SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

=== PAGE 1: HOMEPAGE (/) ===

SECTION 1 — HERO (min-height: 80vh)
- Full-width background image of a laundry shop in Tanger, covered by the Hero Overlay gradient.
- Top-left: Animated pill badge — "🌟 Blanchisserie N°1 à Tanger" on bg primary/10, rounded-full, text primary.
- Main headline (2–3 lines): "VOTRE LINGE, NOTRE PASSION À TANGER" — text-tertiary (#1E3A5F), with key words in text-primary (#4DAFEF).
- Subtitle (1–2 lines): "Service de blanchisserie professionnel avec ramassage et livraison gratuits à domicile dans tout Tanger." — text-gray-600, max-w-2xl.
- CTA pair: [Commander Maintenant] (red CTA) + [Contacter sur WhatsApp] (green WhatsApp button).
- Trust stats row (horizontal, icon + text): "⭐ 4.9/5 (500+ avis)" • "✓ Ramassage Gratuit" • "🚚 Livraison 24h" • "🕐 7j/7, 9h-21h".
- Floating decorative elements: Two radial gradient circles (primary and tertiary) at 5-8% opacity, positioned top-right and bottom-left, blurred.
- Mobile: Stack vertically, headline 36px, reduce trust stats to 2x2 grid.

SECTION 2 — PROMOTION BANNER (conditional, only if active promo)
- Yellow-100 background (#FEF3C7), rounded-2xl card.
- Left: Promotion image. Right: Promo title, description, discount code in a dashed-border box, CTA button.
- Countdown timer if applicable.
- Dismissable with X button.

SECTION 3 — ABOUT US PREVIEW
- 2-column layout: Left column (sticky on desktop) = pitch text + CTA. Right column = 4 scrollable value cards.
- Each value card: icon in rounded-full colored circle, title, short description.
- Values: Innovation (#4DAFEF bg-blue-50), Qualité (#E54A33 bg-orange-50), Rapidité (#16A34A bg-green-50), Transparence (#9333EA bg-purple-50).

SECTION 4 — OUR SERVICES (Click-to-Expand Tabs)
- Section badge: "Nos Services"
- Large title: "Des Services Adaptés à Vos Besoins"
- 4 service tabs in left column (or top on mobile): Lavage & Repassage, Pressing Premium, Nettoyage Spécial, Livraison Express.
- Each tab: Service icon in colored circle, title, expandable detailed description.
- Right column: Large service image that changes based on selected tab.
- Each service has its own accent color: Blue, Purple, Green, Orange (matching the service category colors above).
- Active tab: left border 3px primary, bg-primary/5.

SECTION 5 — HOW WE WORK (4-Step Process)
- 2-column layout: Left (sticky) = CTA card with title "Prêt à essayer?" + CTA button. Right = vertical timeline.
- 4 steps with numbered circles (1-4) connected by vertical line:
  1. 📱 Commandez en Ligne — "Sélectionnez vos articles et choisissez votre créneau"
  2. 🚗 Nous Récupérons — "Notre équipe vient chercher votre linge à domicile"
  3. ✨ Nettoyage Expert — "Traitement professionnel de vos vêtements"
  4. 🚚 Livraison à Domicile — "Vos vêtements propres livrés chez vous"
- Step circles: bg-primary text-white, numbered, with subtle pulse animation on active.
- Connecting line: 2px bg-primary/20, filled with primary as you scroll.

SECTION 6 — PRICING PREVIEW (Blue Gradient Background)
- Background: Pricing Section BG gradient (#E0F2FE → #BAE6FD).
- Section badge + title: "Nos Tarifs" / "Des Prix Transparents"
- 5 product cards in horizontal grid (desktop) / auto-scrolling carousel (mobile):
  - Card: White bg, rounded-2xl, shadow, product image (centered, 120x120), product name, price in "XX DH" pill (bg-primary/8, text-primary, rounded-full).
  - Hover: lift -4px, shadow increase.
- "Voir tous les tarifs →" link at bottom.
- Products to show: Pantalon (15 DH), Chemise sur Cintre (15 DH), Costume (55 DH), Polo (15 DH), Djellaba (30 DH).

SECTION 7 — OUR COMMITMENTS
- 6 commitment cards in 2x3 grid (desktop) / stack (mobile):
  Each card: Large icon (40px, text-primary), bold title (text-tertiary), description (text-gray-600).
  Commitments: Qualité Supérieure, Livraison Rapide, Prix Transparents, Service Écologique, Satisfaction Garantie, Support 7j/7.
- STATS BANNER below commitments:
  Full-width, Stats/Trust Banner gradient, rounded-2xl.
  4 stats in horizontal row:
  - "1000+" Clients Satisfaits
  - "5000+" Livraisons Effectuées
  - "98%" Taux de Satisfaction
  - "24h" Service Express
  Each stat: Big number (Poppins Bold, 36px, white), label below (Poppins Regular, 14px, white/80).

SECTION 8 — TESTIMONIALS
- Section badge: "Témoignages"
- Title: "Ce Que Disent Nos Clients"
- Desktop: Infinite horizontal auto-scroll of testimonial cards (pausable on hover).
- Mobile: Swipeable carousel with dot navigation.
- Testimonial Card (340px width, 380px mobile):
  - White bg, rounded-2xl, shadow with rgba(77,175,239,0.1).
  - Top: Large quote icon (text-primary/20).
  - Middle: Testimonial text in italics, text-gray-700, line-clamp-4.
  - Bottom: 5 yellow stars (⭐), reviewer name (font-semibold text-tertiary), role/location (text-sm text-gray-500).
  - Avatar: Circular div with initial letter, bg-primary/10, text-primary.
- 6 testimonials minimum, duplicated for infinite scroll effect.

SECTION 9 — EXPERT ARTICLES / BLOG PREVIEW
- 2-column layout: Left = Expert image (person folding clothes), Right = Article list.
- Section badge: "Articles Expert"
- Title: "Conseils d'Experts pour Vos Vêtements"
- 3-4 article previews: Image thumbnail, title (font-semibold), excerpt (text-sm text-gray-500), "Lire →" link.
- CTA: "Voir tous les articles →"

SECTION 10 — FAQ (Accordion)
- Section badge: "FAQ"
- Title: "Questions Fréquentes"
- 12 FAQ items in accordion format (only one open at a time).
- Each item: Question text (font-medium, text-tertiary), ChevronDown icon that rotates on open.
- Open state: Answer text (text-gray-600) with smooth height animation.
- Topics: Delivery zones, pricing, turnaround time, payment methods, garment care, eco practices, etc.

FLOATING ELEMENTS (persistent across all pages):
- WhatsApp Button: Fixed bottom-right (desktop) or bottom bar (mobile). bg #25D366, rounded-full, WhatsApp icon, pulse-shadow animation.
- Scroll-to-Top: Fixed bottom-right (above WhatsApp), appears after scrolling 300px. bg-primary, rounded-full, ChevronUp icon.
- Cookie Banner: Fixed bottom, full-width, dark bg, consent text + Accept/Reject buttons.

=== PAGE 2: SERVICES (/services) ===
- Sub-page hero banner: bg image with Sub-Page Hero gradient overlay, "Nos Services" title centered, breadcrumb.
- 6 detailed service sections alternating left/right layout:
  1. Lavage & Séchage — Blue accent
  2. Pressing / Repassage — Purple accent
  3. Nettoyage à Sec — Green accent
  4. Détachage — Orange accent
  5. Blanchiment — Blue accent
  6. Livraison Express — Green accent
- Each section: Large image (rounded-2xl) + Content (badge, title, description, feature list with checkmarks, CTA).
- "Why Choose Us" block: 4-feature grid (Expertise, Quality, Convenience, Price).

=== PAGE 3: PRICING (/tarifs) ===
- Sub-page hero.
- Category filter tabs: All, Pressing, Repassage, Linge, Accessoires.
- Product grid (3-4 columns desktop, 2 mobile):
  - Product card: Image, name, price "XX DH", "Ajouter au panier" button.
  - Hover: lift, shadow, button becomes primary color.
- Price list (19 products):
  Pantalon 15 DH, Chemise sur Cintre 15 DH, Chemise Pliée 15 DH, Costume 55 DH, Polo 15 DH, Djellaba 30 DH, Djellaba Luxe 35 DH, Veste/Jacket/Blouson 30 DH, Manteau Simple 40 DH, Doudoune Simple 40 DH, Doudoune Luxe 45 DH, Gandoura 25 DH, Gilet & Cravate 25 DH, Survêtement 25 DH, Pyjama 2 Pièces 20 DH, Combinaison Simple 25 DH, Chaussettes & Caleçons 8 DH, Casquette 15 DH, Veste Cuir/Daim 55 DH.
- Currency: MAD (Moroccan Dirham), displayed as "DH".

=== PAGE 4: CHECKOUT (/checkout) — 3-Step Process ===
- Step indicator bar at top: Step 1 (Cart) → Step 2 (Location) → Step 3 (Confirmation).
- Active step: bg-primary circle with number. Completed: bg-green-500 with checkmark. Upcoming: bg-gray-200.
- Connected by line (filled primary for completed, gray for upcoming).

Step 1 — Cart Review:
- Product list with image, name, price, quantity (+/- buttons), line total, remove button.
- Order summary sidebar: Subtotal, delivery fee (Gratuit), total, promo code input, CTA "Continuer".

Step 2 — Location Selection:
- Split: Pickup location + Delivery location.
- Interactive Leaflet map (centered on Tanger 35.748, -5.818).
- Click to place pin, reverse geocode to address.
- Date/time picker for pickup and delivery slots.
- Form: Name, Phone number.

Step 3 — Order Confirmation:
- Summary of all details: items, pickup/delivery addresses, times, total.
- "Confirmer la Commande" CTA button.
- Success page: Green checkmark animation, order ID, "Retour à l'accueil" button, auto-redirect after 10s.

=== PAGE 5: ABOUT US (/qui-sommes-nous) ===
- Sub-page hero with team/shop image.
- Mission statement section with large quote.
- Animated counters: Years of experience, clients served, garments cleaned, team members.
- Team section: Team member photos in rounded-2xl cards.
- Values grid: 4-6 value cards (same style as homepage about section).
- Timeline of company history (optional).

=== PAGE 6: PROFESSIONALS (/professionnels) ===
- Sub-page hero targeting B2B.
- Benefits grid for businesses: Hotels, Restaurants, Clinics, Offices.
- Multi-step contact form (4 steps):
  1. Company Info (name, sector, city)
  2. Contact Person (name, email, phone)
  3. Needs Assessment (volume, frequency, special requirements)
  4. Confirmation / Summary
- Step indicator, form validation, toast notifications on submit.

=== PAGE 7: VALUES (/values) ===
- Sub-page hero.
- 6 core values in alternating layout (image + text):
  Innovation, Qualité, Rapidité, Responsabilité, Transparence, Engagement.
- Each value: Large icon/image, title, detailed description, supporting stats.

=== PAGE 8: BLOG (/blog) ===
- Sub-page hero.
- Blog grid (2-3 columns): Featured article (large card spanning full width) + regular articles.
- Blog Card: Cover image (rounded-t-2xl), category badge, title, excerpt, author, date, "Lire la suite →".
- 4 articles:
  1. "Comment Prolonger la Vie de Vos Textiles"
  2. "Guide: Enlever les Taches Tenaces"
  3. "Entretien Écologique: Nos Pratiques"
  4. "Tendances Mode et Entretien 2025"

Blog Detail (/blog/[slug]):
- Full-width hero image.
- Article content with rich typography: H2, H3, paragraphs, bullet lists, blockquotes.
- Sidebar: Related articles, CTA banner.
- Social share buttons.
- Comment section.

=== PAGE 9: LEGAL (/mentions-legales) ===
- Clean text page with proper heading hierarchy.
- Sections: Company info, terms of use, privacy policy, cookies policy, contact.

=== PAGE 10: ADMIN DASHBOARD (/admin) ===
- Sidebar navigation (collapsible): Dashboard, Orders (Demandes), Products (Produits), Promotions, Professional Contacts, Comments, Employees, Settings.
- Dark sidebar (bg-tertiary #1E3A5F) with white text and primary accent for active item.

Admin Login:
- Centered login card, logo on top, email/password inputs, "Se Connecter" button, "Mot de passe oublié?" link.

Orders Dashboard:
- Stats cards row: Total orders, Pending, Delivered, Cancelled — each with icon, number, trend arrow.
- Orders table: OrderID, Client, Phone, Status (color-coded badge), Pickup Date, Delivery Date, Actions (view/edit/delete).
- Status badges: "En cours" (bg-yellow-100 text-yellow-800), "Livrée" (bg-green-100 text-green-800), "Annulée" (bg-red-100 text-red-800).
- Filters: Status, date range, search by name/phone.

Products Management:
- Product grid with add/edit/delete. Image upload. Status toggle (active/inactive).

Promotions:
- Promo cards with code, discount amount, validity dates, usage count, active toggle.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ ANIMATIONS & MICRO-INTERACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCROLL ANIMATIONS:
- Sections fade-in + slide-up (fadeInUp) when entering viewport: translateY(30px) → translateY(0), opacity 0 → 1, duration 600ms, ease-out.
- Stagger children by 100ms delay.

HOVER EFFECTS:
- Cards: translateY(-4px), shadow expansion to rgba(77,175,239,0.15), 300ms ease.
- Buttons (Primary CTA): Animated "shine" sweep — a diagonal white gradient pseudo-element that sweeps across the button on hover.
- Links: Color transition 200ms, underline slide-in from left.
- Images: Subtle scale(1.03) on hover, overflow hidden on container.

CONTINUOUS ANIMATIONS:
- WhatsApp button: pulse-shadow animation — box-shadow pulses between 0 and 20px spread of rgba(37,211,102,0.4), 2s infinite.
- Trust bar: Continuous horizontal scroll (marquee effect), 30s linear infinite.
- Hero badge star: Slow rotation or pulse animation.
- Decorative blobs: Gentle float animation (translateY ±10px), 6s ease-in-out infinite.
- Loading shimmer: Skeleton placeholder with sweeping gradient animation.

CAROUSEL BEHAVIORS:
- Auto-advance every 4-5 seconds.
- Pause on hover/touch.
- Smooth CSS transform transitions (500ms ease).
- Dot indicators: Active dot = bg-primary w-8 (pill shape), inactive = bg-gray-300 w-2 (circle).
- Optional arrow buttons on desktop.

PAGE TRANSITIONS:
- Smooth scroll behavior (scroll-behavior: smooth).
- Subtle page fade-in on route change.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 RESPONSIVE BREAKPOINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Mobile: 0–639px — Single column, hamburger menu, bottom CTA bar, touch carousels, 36px headlines.
- Tablet: 640–1023px — 2-column grids, expanded nav, 48px headlines.
- Desktop: 1024px+ — Full grid layouts, hover effects, sticky sidebars, 58-70px headlines.
- Large Desktop: 1280px+ — Max-width container centered, generous whitespace.

MOBILE-SPECIFIC PATTERNS:
- Fixed bottom action bar: [Commander] + [WhatsApp] buttons, always visible.
- Hamburger menu with slide-in drawer (from right for LTR, left for RTL).
- Carousels replace grids (pricing, testimonials).
- Sticky header with shadow on scroll.
- Form inputs: Full-width, min height 48px for touch targets.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 HEADER & NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOP BAR (thin, bg-secondary #E54A33, text-white):
- Left: Phone number with icon, email.
- Right: Operating hours "9h-21h, 7j/7", language switcher (FR/AR).

MAIN HEADER (bg-white, sticky top, shadow on scroll):
- Left: Logo (160x40px).
- Center: Navigation links — Accueil, Services, Tarifs, Qui Sommes-Nous, Blog, Contact Professionnels.
- Active link: text-primary, font-medium, subtle bottom border 2px primary.
- Right: Cart icon with item count badge (bg-secondary, text-white, rounded-full, min-w-5 h-5).
- Mobile: Logo left, Hamburger right, Cart icon next to hamburger.

FOOTER (bg-tertiary #1E3A5F, text-white):
- 4 columns: Company Info (logo, tagline, social icons), Quick Links, Services, Contact Info (address, phone, email, hours).
- Social icons: Facebook, Instagram, TikTok, WhatsApp — rounded-full bg-white/10 hover:bg-primary.
- Bottom bar: Copyright, legal links, payment method icons.
- Decorative: Subtle wave or curve at the top of footer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 RTL (ARABIC) DESIGN NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Mirror ALL layouts: flex-row becomes flex-row-reverse, text-left becomes text-right.
- Logo stays visually consistent (not mirrored).
- Icons with directional meaning (arrows, chevrons) must flip.
- Gradients: Flip 135deg → 225deg (or adjust for visual consistency).
- Navigation reads right-to-left.
- Form labels align right, input text aligns right.
- Scroll directions may need adjustment (horizontal scroll starts from right).
- Ensure Arabic text has adequate line-height (1.8 minimum).
- All French content has Arabic translations (inline, not separate i18n files).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧩 COMPONENT LIBRARY (ICON SYSTEM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ICON LIBRARY: Lucide React (outline style, consistent 24px default, stroke-width 2).

KEY ICONS USED:
- Navigation: Menu, X, ShoppingCart, Globe, ChevronDown, User
- Actions: Phone, Mail, MapPin, Clock, ArrowRight, ExternalLink
- Features: Sparkles, Shield, Truck, Zap, Heart, Star, CheckCircle, Award
- Services: Shirt, Droplets, Wind, Package
- Social: Facebook, Instagram, MessageCircle (WhatsApp)
- Admin: LayoutDashboard, Package, Tag, Users, MessageSquare, Settings, LogOut
- Status: CheckCircle2, AlertCircle, XCircle, Loader2

ICON CONTAINERS:
- Small: 32x32 rounded-full bg-primary/10 p-1.5
- Medium: 48x48 rounded-full bg-primary/10 p-3
- Large: 64x64 rounded-2xl bg-primary/10 p-4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🖼️ IMAGE STYLE GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- All images in .avif format (with .png fallback) for optimal performance.
- Product images: Clean, white background, centered garment, consistent 1:1 aspect ratio.
- Hero images: Real photography of the laundry shop or Tanger cityscape, warm lighting, professional.
- Blog images: High-quality editorial photography related to textiles, laundry, fashion care.
- Team photos: Professional headshots or casual workplace photos, warm and approachable.
- All images must have rounded corners (rounded-2xl) when displayed in cards.
- Use object-cover for hero/banner images.
- Lazy loading for below-fold images, eager/preload for hero image.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CONVERSION OPTIMIZATION ELEMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Every section ends with a clear CTA (primary button or link).
- Dual CTA strategy: Red "Commander" + Green "WhatsApp" always available.
- Trust signals on every page: star rating, client count, satisfaction rate.
- Sticky mobile bottom bar ensures CTA is always one tap away.
- Promotion popup on first visit (if active promo exists).
- Urgency indicators: "24h Express", countdown timers on promos.
- Social proof: Testimonials, stats banner, partner logos.
- Price transparency: Clear pricing visible before checkout.
- Free delivery messaging prominent in hero and trust bar.
- Easy WhatsApp contact reduces friction for hesitant users.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ PERFORMANCE & TECHNICAL NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Framework: Next.js 15 (App Router) with React 18.
- Styling: Tailwind CSS v4 with custom CSS properties.
- UI Components: shadcn/ui (Radix UI primitives).
- Animations: Pure CSS (no heavy animation libraries). Use will-change sparingly.
- Images: Next.js <Image> with priority for hero, lazy for rest.
- Maps: Leaflet (lightweight).
- Data fetching: TanStack React Query for client-side, server components for static content.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 DESIGN DELIVERABLES CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please design all of the following:

□ Complete color palette with all shades, tints, and usage guidelines
□ Typography scale with all sizes, weights, and line-heights
□ Component library: Buttons, Cards, Badges, Inputs, Dropdowns, Modals, Tables, Tooltips
□ Icon set with all containers and sizes
□ Homepage — Desktop (1440px) + Mobile (375px)
□ Services page — Desktop + Mobile
□ Pricing page — Desktop + Mobile
□ Checkout flow (3 steps) — Desktop + Mobile
□ About Us page — Desktop + Mobile
□ Blog listing + Blog detail — Desktop + Mobile
□ Professional contact page — Desktop + Mobile
□ Values page — Desktop + Mobile
□ Legal page — Desktop + Mobile
□ Admin Login — Desktop
□ Admin Dashboard (Orders) — Desktop
□ Admin Products — Desktop
□ Admin Promotions — Desktop
□ Header (scrolled + unscrolled states) — Desktop + Mobile (open menu)
□ Footer — Desktop + Mobile
□ Arabic RTL versions of all user-facing pages
□ Empty states, loading states, error states
□ Toast notifications (success, error, info)
□ Modal dialogs (confirmation, promotion popup)
□ Form validation states (error, success, focused)
□ 404 page
□ Dark mode variants (bonus)
```

---

**END OF PROMPT — Copy everything between the ``` markers above and paste it into your design tool of choice.**
