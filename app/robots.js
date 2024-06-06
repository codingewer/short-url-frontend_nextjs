export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      allow: "/",
      allow: "/terms",
      allow: "/privacy",
      allow: "/cookies",
      allow: "/faq",
      allow: "/aboutus",
      allow: "/contactus",
      allow: "/paid",
      disallow: "/private/",
    },
    sitemap: "https://linkamon.com/sitemap.xml",
  };
}
