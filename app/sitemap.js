export default function sitemap() {
  return [
    { url: "/", changefreq: "daily", priority: 0.3 },
    { url: "/aboutus", changefreq: "daily", priority: 0.3 },
    { url: "/contactus", changefreq: "daily", priority: 0.3 },
    { url: "/terms", changefreq: "daily", priority: 0.3 },
    { url: "/privacy", changefreq: "daily", priority: 0.3 },
    { url: "/dashboard/shorturl", changefreq: "daily", priority: 0.3 },
    { url: "/dashboard", changefreq: "daily", priority: 0.3 },
    { url: "/dashboard/settings", changefreq: "daily", priority: 0.3 },
    { url: "/dashboard/balance", changefreq: "daily", priority: 0.3 },
    { url: "/dashboard/help", changefreq: "daily", priority: 0.3 },
    { url: "/paid", changefreq: "daily", priority: 0.3 },
    { url: "/cookies", changefreq: "daily", priority: 0.3 },
    {
      url: '/:username/:shortenedUrl/r/:adIndex"',
      changefreq: "daily",
      priority: 0.3,
    },
  ];
}
