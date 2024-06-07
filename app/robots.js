export default function robots() {
  return {
    rules: {
      userAgent: "*",
      Allow: "/terms",
      Allow: "/privacy",
      Allow: "/cookies",
      Allow: "/faq",
      Allow: "/aboutus",
      Allow: "/contactus",
      Allow: "/paid",
      Disallow: "/controlpanel",
    },
    sitemap: "https://linkamon.com/sitemap.xml",
  };
}
