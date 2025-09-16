import os
import psycopg2
import requests
import xml.etree.ElementTree as ET

PG_URI = os.getenv("PG_URI")
JINA_API_KEY = os.getenv("JINA_API_KEY")


def get_articles(limit=50):
    """Fetch articles from DB"""
    conn = psycopg2.connect(PG_URI)
    cur = conn.cursor()
    cur.execute("SELECT id, title, content FROM articles LIMIT %s;", (limit,))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows


def fetch_reuters_urls():
    """Fetch sitemap XML and extract article URLs"""
    url = "https://www.reuters.com/arc/outboundfeeds/sitemap-index/?outputType=xml"
    resp = requests.get(url)
    resp.raise_for_status()

    root = ET.fromstring(resp.content)
    namespaces = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    sitemap_urls = [s.text for s in root.findall(".//ns:loc", namespaces)]
    return sitemap_urls


def fetch_articles_from_sitemap(sitemap_url):
    """Parse a sitemap page to get article links"""
    resp = requests.get(sitemap_url)
    resp.raise_for_status()

    root = ET.fromstring(resp.content)
    namespaces = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    urls = [u.text for u in root.findall(".//ns:loc", namespaces)]
    return urls


def generate_embedding(text):
    """Generate embeddings using Jina API"""
    headers = {"Authorization": f"Bearer {JINA_API_KEY}"}
    data = {"text": text}
    response = requests.post("https://api.jina.ai/embeddings", json=data, headers=headers)
    response.raise_for_status()
    return response.json().get("embedding")


def upsert_embedding(article_id, vector):
    """Store embeddings back into DB"""
    conn = psycopg2.connect(PG_URI)
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO article_embeddings (article_id, embedding)
        VALUES (%s, %s)
        ON CONFLICT (article_id)
        DO UPDATE SET embedding = EXCLUDED.embedding;
        """,
        (article_id, vector),
    )
    conn.commit()
    cur.close()
    conn.close()


def main():
    sitemaps = fetch_reuters_urls()
    print(f"Found {len(sitemaps)} sitemaps")

    latest_sitemap = sitemaps[0]
    article_links = fetch_articles_from_sitemap(latest_sitemap)
    print(f"Found {len(article_links)} article URLs in latest sitemap")

    articles = get_articles(limit=10)
    for article_id, title, content in articles:
        embedding = generate_embedding(content)
        upsert_embedding(article_id, embedding)
        print(f"Upserted embedding for article {article_id}")


if __name__ == "__main__":
    main()
