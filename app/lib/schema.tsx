import React from 'react';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
}

interface ProductSchemaProps {
  name: string;
  description?: string;
  image?: string;
  price?: number;
  priceCurrency?: string;
  availability?: string;
  category?: string;
}

interface ServiceSchemaProps {
  name: string;
  description?: string;
  provider?: {
    name: string;
    url?: string;
  };
  areaServed?: string;
}

interface RatingSchemaProps {
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  reviewCount?: number;
}

interface WebSiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function OrganizationSchema({
  name = "Laundry.ma",
  url = "https://laundry.ma",
  logo = "https://laundry.ma/images/logo.jpg",
  description = "Service de pressing et nettoyage professionnel à domicile à Tanger",
  address,
  contactPoint,
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    }),
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        ...contactPoint,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  priceCurrency = "MAD",
  availability = "https://schema.org/InStock",
  category,
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    ...(description && { description }),
    ...(image && { image }),
    ...(category && { category }),
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency,
        availability,
        url: "https://laundry.ma/tarifs",
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  provider = { name: "Laundry.ma", url: "https://laundry.ma" },
  areaServed = "Tanger, Maroc",
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    ...(description && { description }),
    provider: {
      "@type": "Organization",
      ...provider,
    },
    ...(areaServed && { areaServed }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema({
  name = "Laundry.ma",
  description = "Service de pressing et nettoyage professionnel à domicile",
  image = "https://laundry.ma/images/laundry-tanger.avif",
  address = {
    addressLocality: "Tanger",
    addressRegion: "Tanger-Tétouan-Al Hoceïma",
    addressCountry: "MA",
  },
  telephone = "+212 XXX XXX XXX",
  priceRange = "$$",
  rating,
}: {
  name?: string;
  description?: string;
  image?: string;
  address?: {
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
  telephone?: string;
  priceRange?: string;
  rating?: RatingSchemaProps;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    image,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    telephone,
    priceRange,
    ...(rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.ratingValue,
        bestRating: rating.bestRating || 5,
        worstRating: rating.worstRating || 1,
        reviewCount: rating.reviewCount || 6,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema({
  name = "Laundry.ma",
  url = "https://laundry.ma",
  description = "Service de pressing et nettoyage professionnel à domicile à Tanger",
}: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = { name: "Laundry.ma", type: "Organization" },
}: {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: { name: string; type?: string };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(description && { description }),
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      "@type": author.type || "Organization",
      name: author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Laundry.ma",
      logo: {
        "@type": "ImageObject",
        url: "https://laundry.ma/images/logo.jpg",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

