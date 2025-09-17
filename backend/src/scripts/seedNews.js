const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const newsData = [
  {
  title: "Startup India & DPIIT Partner with CarDekho to Boost Mobility and Fintech Innovation",
  content: "The MoU offers mentorship, funding, and market access to startups in mobility, insurtech, and sustainability through CarDekho’s platforms.",
  url: "https://www.psuconnect.in/ministry-of-india-news/startup-india-dpiit-cardekho-partnership-for-mobility-and-fintech-startups",
  publishedAt: new Date("2025-09-16T06:34:00Z")
},{
  title: "Yogi Govt Pushes Education Reforms With Tech-Enabled Kitab Vitran App",
  content: "Uttar Pradesh launches QR-based app to track textbook distribution across 1.32 lakh schools, benefiting 1.48 crore students.",
  url: "https://www.freepressjournal.in/uttar-pradesh/yogi-govt-pushes-education-reforms-with-tech-enabled-kitab-vitran-app",
  publishedAt: new Date("2025-09-10T14:06:00Z")
}
,{
  title: "Instamart Quick India Movement Sale Begins September 19: 90% Off on Tech Products",
  content: "Swiggy’s Instamart launches India’s first quick commerce mega sale with steep discounts on Lenovo, ASUS, OPPO, and more.",
  url: "https://www.gizbot.com/deal-of-the-day/instamart-quick-india-movement-sale-best-tech-deals-and-easy-tricks-to-save-more-118799.html",
  publishedAt: new Date("2025-09-16T12:39:00Z")
}



];

(async () => {
  for (const article of newsData) {
    await prisma.news.create({ data: article });
  }
  await prisma.$disconnect();
  console.log('Seeded real sample news articles');
})();
