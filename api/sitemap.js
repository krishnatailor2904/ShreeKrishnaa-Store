export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://shree-krishna-backend.vercel.app/api/products/"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    const staticUrls = [
      "https://shreekrishnaa.com/",
      "https://shreekrishnaa.com/shop",
      "https://shreekrishnaa.com/about",
      "https://shreekrishnaa.com/contact",
    ];

    const productUrls = products.map(
      (product) =>
        `https://shreekrishnaa.com/product/${product.slug}`
    );

    const allUrls = [...staticUrls, ...productUrls];

    const xmlUrls = allUrls
      .map(
        (url) => `
  <url>
    <loc>${url}</loc>
  </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=86400"
    );

    return res.status(200).send(xml);
  } catch (error) {
    console.error(error);

    return res.status(500).send("Sitemap generation failed");
  }
}