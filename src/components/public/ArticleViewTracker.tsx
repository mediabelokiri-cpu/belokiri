"use client";

import { useEffect } from "react";

interface ArticleViewTrackerProps {
  slug: string;
}

export default function ArticleViewTracker({ slug }: ArticleViewTrackerProps) {
  useEffect(() => {
    if (!slug) return;

    // Deduplicate views per browser session to prevent artificial spam counts
    const sessionKey = `belokiri_viewed_${slug}`;
    try {
      const alreadyViewed = sessionStorage.getItem(sessionKey);
      if (alreadyViewed) {
        return;
      }
      sessionStorage.setItem(sessionKey, "1");
    } catch {
      // Ignore if browser restricts storage
    }

    // Call API to increment article views
    fetch(`/api/articles/${encodeURIComponent(slug)}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).catch((err) => {
      console.warn("View tracking ping failed:", err);
    });
  }, [slug]);

  return null;
}
