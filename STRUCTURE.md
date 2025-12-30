# Project Structure

This document outlines the organized structure of the Next.js application.

## Directory Structure

```
app/
├── page.tsx                    # Home page (French) - uses sections/Home
├── about/
│   └── page.tsx                # About page - uses sections/Aboutus
├── services/
│   └── page.tsx                # Services page - uses sections/OurServices
├── values/
│   └── page.tsx                # Values page - uses sections/OurValues
├── cart/
│   └── page.tsx                # Cart page - uses sections/CartPage
├── checkout/
│   └── page.tsx                # Checkout page - uses sections/Checkout
├── tracking/
│   └── page.tsx                 # Order tracking - uses sections/OrderTrackingPage
├── login/
│   └── page.tsx                # Login page - uses sections/Login
├── professional/
│   └── page.tsx                # Professional space - uses sections/ProfesionalSpace
├── pricing/
│   └── page.tsx                 # Pricing page - uses sections/Tarifs
├── terms/
│   └── page.tsx                 # Terms & Conditions - uses sections/TermsAndConditions
│
├── ar/                         # Arabic pages
│   ├── layout.tsx              # Arabic layout (RTL)
│   ├── page.tsx                # Arabic home
│   ├── about/
│   │   └── page.tsx            # Arabic about
│   └── services/
│       └── page.tsx            # Arabic services
│
├── admin/                      # Admin panel
│   ├── layout.tsx              # Admin layout
│   ├── page.tsx                # Admin dashboard
│   ├── orders/
│   │   └── page.tsx            # Orders management
│   ├── users/
│   │   └── page.tsx            # Users management
│   └── settings/
│       └── page.tsx            # Settings
│
├── api/                        # API routes
│   ├── hello/
│   │   └── route.ts            # Hello endpoint
│   ├── users/
│   │   └── route.ts            # Users API
│   └── admin/
│       ├── orders/
│       │   └── route.ts        # Admin orders API
│       └── users/
│           └── route.ts        # Admin users API
│
├── sections/                   # Page sections/components
│   ├── Home/                   # Home page sections
│   ├── Aboutus/                # About page sections
│   ├── OurServices/            # Services page sections
│   ├── OurValues/              # Values page sections
│   ├── CartPage/               # Cart page sections
│   ├── Checkout/               # Checkout page sections
│   ├── OrderTrackingPage/      # Tracking page sections
│   ├── Login/                  # Login page sections
│   ├── ProfesionalSpace/       # Professional space sections
│   ├── Tarifs/                 # Pricing page sections
│   └── TermsAndConditions/     # Terms page sections
│
└── components/                 # Reusable components
    └── common/                 # Common/shared components
        ├── Header.tsx
        ├── Footer.tsx
        ├── LanguageSwitcher.tsx
        └── ... (other common components)

lib/
├── i18n.ts                     # Internationalization config
└── utils/                      # Utility functions/components
    ├── GoogleCallback.tsx
    ├── GridLayout.tsx
    ├── PageContainer.tsx
    ├── SectionMargin.tsx
    └── SectionWrapper.tsx
```

## Routing

### French (Root)
- `/` - Home
- `/about` - About Us
- `/services` - Services
- `/values` - Our Values
- `/cart` - Shopping Cart
- `/checkout` - Checkout
- `/tracking` - Order Tracking
- `/login` - Login
- `/professional` - Professional Space
- `/pricing` - Pricing
- `/terms` - Terms & Conditions

### Arabic
- `/ar` - Home (Arabic)
- `/ar/about` - About Us (Arabic)
- `/ar/services` - Services (Arabic)

### Admin
- `/admin` - Admin Dashboard
- `/admin/orders` - Orders Management
- `/admin/users` - Users Management
- `/admin/settings` - Settings

## Organization Principles

1. **Pages** (`app/*/page.tsx`) - Route handlers that import sections
2. **Sections** (`app/sections/*`) - Page-specific components and sections
3. **Components** (`app/components/common/*`) - Reusable UI components
4. **Utils** (`lib/utils/*`) - Utility functions and helper components
5. **API** (`app/api/*`) - Backend API routes













