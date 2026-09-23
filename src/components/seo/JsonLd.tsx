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
      name: "NALAR",
      url: "https://nalar.id",
      logo: {
        "@type": "ImageObject",
        url: "https://nalar.id/images/logo-nalar-red.png",
        width: 425,
        height: 89,
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
    name: "NALAR",
    alternateName: "NALAR Media Nusantara",
    url: "https://nalar.id",
    logo: "https://nalar.id/images/logo-nalar-red.png",
    slogan: "Melihat Lebih dari Sekadar Kabar",
    description:
      "Media berita independen, analisis kritis, data jurnalisme, dan ruang kurasi pemikiran untuk generasi muda Indonesia.",
    sameAs: [
      "https://twitter.com/nalar_id",
      "https://instagram.com/nalar_id",
      "https://youtube.com/@nalar_id",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
