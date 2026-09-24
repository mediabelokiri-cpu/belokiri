/**
 * HTML Sanitizer Engine for BELOKIRI
 * Strips dangerous tags, scripts, event listeners, and malicious URLs to prevent XSS.
 * Pure TypeScript implementation compatible with Node.js, Server Components, and Edge.
 */

// List of strictly prohibited tags that must be completely stripped along with their content
const DANGEROUS_BLOCK_TAGS = [
  "script",
  "style",
  "noscript",
  "template",
  "textarea",
  "svg",
  "math",
];

// List of prohibited tags that should be stripped
const FORBIDDEN_TAGS = [
  "object",
  "embed",
  "applet",
  "frame",
  "frameset",
  "base",
  "form",
  "input",
  "button",
  "select",
  "option",
  "meta",
  "link",
];

// Allowed HTML tags for article typography & embeds
const ALLOWED_TAGS = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "strike",
  "del",
  "blockquote",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "span",
  "div",
  "hr",
  "br",
  "pre",
  "code",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "figure",
  "figcaption",
  "iframe",
]);

// Allowed attributes per tag or globally
const ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
  global: new Set(["class", "id", "title", "dir", "lang"]),
  a: new Set(["href", "target", "rel", "title"]),
  img: new Set(["src", "alt", "title", "width", "height", "loading"]),
  iframe: new Set(["src", "width", "height", "allowfullscreen", "frameborder"]),
};

// Allowed iframe hostnames (safe media embeds only)
const ALLOWED_IFRAME_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "player.vimeo.com",
  "open.spotify.com",
  "w.soundcloud.com",
];

/**
 * Validate URL to prevent javascript: and dangerous data: schemes
 */
function isSafeUrl(url: string, isImage = false): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();

  // Allow relative paths and anchor links
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) {
    return true;
  }

  // Allow safe web protocols
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return true;
  }

  if (trimmed.startsWith("mailto:")) {
    return true;
  }

  // Safe base64 image data URIs
  if (isImage && /^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test(trimmed)) {
    return true;
  }

  return false;
}

/**
 * Check if iframe source is from an approved media provider
 */
function isSafeIframeSrc(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ALLOWED_IFRAME_HOSTS.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

/**
 * Sanitize an HTML string for safe display to readers.
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  let clean = html;

  // 1. Remove dangerous block tags including their inner content
  for (const tag of DANGEROUS_BLOCK_TAGS) {
    const regex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
    clean = clean.replace(regex, "");
    // Remove unclosed instances as well
    const selfClosing = new RegExp(`<${tag}[^>]*\\/?>`, "gi");
    clean = clean.replace(selfClosing, "");
  }

  // 2. Remove other forbidden tags
  for (const tag of FORBIDDEN_TAGS) {
    const regex = new RegExp(`</?${tag}[^>]*>`, "gi");
    clean = clean.replace(regex, "");
  }

  // 3. Strip HTML comments
  clean = clean.replace(/<!--[\s\S]*?-->/g, "");

  // 4. Strip on* event handlers (e.g. onerror=..., onclick=..., onload=...)
  clean = clean.replace(/\s+on[a-zA-Z]+\s*=\s*(['\"][^'\"]*['\"]|[^\s>]+)/gi, "");

  // 5. Sanitize HTML tags and attributes
  clean = clean.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (match, tagNameRaw, attrString) => {
    const tag = tagNameRaw.toLowerCase();

    // If tag is not in allowed list, strip tag wrapper
    if (!ALLOWED_TAGS.has(tag)) {
      return "";
    }

    // Is closing tag
    if (match.startsWith("</")) {
      return `</${tag}>`;
    }

    // Process attributes
    const globalAllowed = ALLOWED_ATTRIBUTES.global;
    const tagAllowed = ALLOWED_ATTRIBUTES[tag] || new Set<string>();

    const safeAttrs: string[] = [];
    const attrRegex = /([a-zA-Z0-9_-]+)(?:\s*=\s*(?:'([^']*)'|"([^"]*)"|([^\s>]+)))?/g;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      const attrName = attrMatch[1].toLowerCase();
      const attrValue = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";

      // Must be allowed for this tag or globally
      if (!globalAllowed.has(attrName) && !tagAllowed.has(attrName)) {
        continue;
      }

      // Check URL schemes
      if (attrName === "href") {
        if (!isSafeUrl(attrValue)) continue;
      } else if (attrName === "src") {
        if (tag === "iframe") {
          if (!isSafeIframeSrc(attrValue)) continue;
        } else if (tag === "img") {
          if (!isSafeUrl(attrValue, true)) continue;
        } else {
          continue;
        }
      }

      // Prevent open redirect vulnerabilities on external links
      if (tag === "a" && attrName === "target" && attrValue === "_blank") {
        // Will enforce rel="noopener noreferrer" below
      }

      safeAttrs.push(`${attrName}="${attrValue.replace(/"/g, "&quot;")}"`);
    }

    // Enforce safe rel for external links
    if (tag === "a") {
      const hasRel = safeAttrs.some((a) => a.startsWith("rel="));
      if (!hasRel) {
        safeAttrs.push('rel="noopener noreferrer"');
      }
    }

    const attrsFormatted = safeAttrs.length > 0 ? " " + safeAttrs.join(" ") : "";
    return `<${tag}${attrsFormatted}>`;
  });

  return clean;
}

/**
 * Format article content for display.
 * Supports:
 * 1. Plain text with newlines (auto-converts double newlines to paragraphs)
 * 2. Markdown shortcuts (##, ###, **, *, >, -, 1., ---)
 * 3. Pre-formatted HTML (safely sanitized)
 */
export function formatArticleContent(raw: string): string {
  if (!raw || typeof raw !== "string") return "";

  // If content already contains HTML block tags (<p>, <h3>, <div>, etc.), sanitize and return
  const hasHtmlBlocks = /<(p|h[1-6]|div|blockquote|ul|ol|table|article|section)[^>]*>/i.test(raw);
  if (hasHtmlBlocks) {
    return sanitizeHtml(raw);
  }

  // Parse Markdown and plain text paragraphs
  const lines = raw.split(/\r?\n/);
  const result: string[] = [];
  let inList: "ul" | "ol" | null = null;
  let inBlockquote = false;
  let currentBlockquote: string[] = [];

  const flushBlockquote = () => {
    if (inBlockquote && currentBlockquote.length > 0) {
      result.push(`<blockquote>${currentBlockquote.join("<br />")}</blockquote>`);
      currentBlockquote = [];
      inBlockquote = false;
    }
  };

  const flushList = () => {
    if (inList) {
      result.push(`</${inList}>`);
      inList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushBlockquote();
      flushList();
      continue;
    }

    // Horizontal Divider
    if (/^(---|___|\*\*\*)$/.test(line)) {
      flushBlockquote();
      flushList();
      result.push("<hr />");
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      flushBlockquote();
      flushList();
      const text = parseInlineFormatting(line.slice(4));
      result.push(`<h4>${text}</h4>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushBlockquote();
      flushList();
      const text = parseInlineFormatting(line.slice(3));
      result.push(`<h3>${text}</h3>`);
      continue;
    }
    if (line.startsWith("# ")) {
      flushBlockquote();
      flushList();
      const text = parseInlineFormatting(line.slice(2));
      result.push(`<h2>${text}</h2>`);
      continue;
    }

    // Blockquote
    if (line.startsWith("> ") || line.startsWith(">")) {
      flushList();
      inBlockquote = true;
      const text = parseInlineFormatting(line.replace(/^>\s?/, ""));
      currentBlockquote.push(text);
      continue;
    } else {
      flushBlockquote();
    }

    // Unordered List
    if (/^[-*•]\s+/.test(line)) {
      flushBlockquote();
      if (inList !== "ul") {
        flushList();
        result.push("<ul>");
        inList = "ul";
      }
      const text = parseInlineFormatting(line.replace(/^[-*•]\s+/, ""));
      result.push(`<li>${text}</li>`);
      continue;
    }

    // Ordered List
    if (/^\d+\.\s+/.test(line)) {
      flushBlockquote();
      if (inList !== "ol") {
        flushList();
        result.push("<ol>");
        inList = "ol";
      }
      const text = parseInlineFormatting(line.replace(/^\d+\.\s+/, ""));
      result.push(`<li>${text}</li>`);
      continue;
    }

    // Regular paragraph
    flushList();
    const text = parseInlineFormatting(line);
    result.push(`<p>${text}</p>`);
  }

  flushBlockquote();
  flushList();

  const finalHtml = result.join("\n");
  return sanitizeHtml(finalHtml);
}

function parseInlineFormatting(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

