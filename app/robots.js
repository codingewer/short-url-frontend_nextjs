export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/terms",
        "/privacy",
        "/cookies",
        "/faq",
        "/aboutus",
        "/contactus",
        "/paid",
      ],
      disallow: ["/controlpanel"],
    },
    sitemap: "https://linkamon.com/sitemap.xml",
  };
}
