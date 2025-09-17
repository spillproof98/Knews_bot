const axios = require("axios");
const xml2js = require("xml2js");
const pool = require("../config/postgres");

async function fetchXml(url) {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/xml,text/xml",
    },
  });
  return await xml2js.parseStringPromise(data);
}

async function processSitemap(sitemapUrl) {
  console.log("Processing sitemap:", sitemapUrl);
  const parsed = await fetchXml(sitemapUrl);

  if (!parsed.urlset?.url) return;

  for (const u of parsed.urlset.url) {
    const url = u.loc?.[0];
    const lastmod = u.lastmod?.[0];
    const newsTitle = u["news:news"]?.[0]["news:title"]?.[0];

    if (!url) continue;

    const publishedAt = lastmod ? new Date(lastmod) : new Date();

    const queryText = `
      INSERT INTO articles (title, url, published_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (url) DO NOTHING
    `;
    const values = [newsTitle || "Untitled", url, publishedAt];

    try {
      await pool.query(queryText, values);
      console.log("Inserted:", newsTitle || url);
    } catch (err) {
      console.error("DB insert error:", err.message);
    }
  }
}

async function fetchReutersSitemapIndex() {
  const indexUrl =
    "https://www.reuters.com/arc/outboundfeeds/sitemap-index/?outputType=xml";

  try {
    const parsed = await fetchXml(indexUrl);

    if (!parsed.sitemapindex?.sitemap) {
      console.error("No sitemaps found in index");
      return;
    }

    const sitemaps = parsed.sitemapindex.sitemap.map((s) => s.loc[0]);

    for (const sitemapUrl of sitemaps) {
      try {
        await processSitemap(sitemapUrl);
      } catch (err) {
        console.error("Failed to process sitemap:", sitemapUrl, err.message);
      }
    }

    console.log("✅ Done fetching Reuters sitemaps");
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

setInterval(fetchReutersSitemapIndex, 5 * 60 * 1000);


fetchReutersSitemapIndex();
