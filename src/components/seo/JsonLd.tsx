import React from "react";

interface NewsArticleJsonLdProps {
  url: string;
  headline: string;
  excerpt: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  sectionName: string;
  tags?: string[];
}

export function NewsArticleJsonLd({
  url,
  headline,
  excerpt,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  sectionName,
  tags = [],
}: NewsArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline,
    description: excerpt,
    image: [imageUrl],
    datePublished,
    dateModified: dateModified || datePublished,
    author: [
      {
        "@type": "Person",
        name: authorName,
        url: authorUrl,
      },
    ],
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "BELOKIRI",
      url: "https://belokiri.id",
      logo: {
        "@type": "ImageObject",
        url: "https://belokiri.id/images/logo-belokiri-red.png",
        width: 512,
        height: 97,
      },
    },
    articleSection: sectionName,
    keywords: tags.join(", "),
    inLanguage: "id-ID",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
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

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "BELOKIRI",
    alternateName: "BELOKIRI Media",
    url: "https://belokiri.id",
    logo: "https://belokiri.id/images/logo-belokiri-red.png",
    slogan: "Liar Seperlunya, Jenaka Secukupnya",
    description:
      "Media esai populer, analisis santai, arsip sejarah rakyat, dan percakapan kritis yang disajikan dengan tajam dan jenaka.",
    sameAs: [
      "https://twitter.com/belokiri_id",
      "https://instagram.com/belokiri_id",
      "https://youtube.com/@belokiri_id",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
