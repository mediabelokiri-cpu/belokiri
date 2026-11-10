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
      name: "BAKUBACA",
      url: "https://www.belokiri.site",
      logo: {
        "@type": "ImageObject",
        url: "https://www.belokiri.site/images/logourlbarbakubaca.png",
        width: 600,
        height: 600,
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
    name: "BAKUBACA",
    alternateName: "Bakubaca",
    url: "https://www.belokiri.site",
    logo: "https://www.belokiri.site/images/logourlbarbakubaca.png",
    slogan: "Setiap Pikiran Punya Ruang.",
    description:
      "Ruang baca dan media gagasan independen bagi Warga untuk menyuarakan realitas, merekam pengalaman, bertukar gagasan, membaca kebudayaan, dan merayakan ekspresi.",
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
