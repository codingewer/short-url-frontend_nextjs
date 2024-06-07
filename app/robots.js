export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/terms",
      allow: "/privacy",
      allow: "/cookies",
      allow: "/faq",
      allow: "/aboutus",
      allow: "/contactus",
      allow: "/paid",
      Disallow: "/controlpanel",
    },
    sitemap: "https://linkamon.com/sitemap.xml",
  };
}
