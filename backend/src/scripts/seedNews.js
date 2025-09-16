const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const newsData = [
  {
    title: 'Google Gemini tops app store charts in India amid viral Nano Banana AI trend',
    content: 'Google Gemini has recently surged in popularity, topping app store charts amid the viral Nano Banana AI trend...',
    url: 'https://indianexpress.com/section/technology/',
    publishedAt: new Date('2025-09-15T10:00:00Z'),
  },
  {
    title: 'Microsoft’s new Xbox app for Windows 11 and handhelds puts all your PC games in one place',
    content: 'Microsoft has launched a new Xbox app for Windows 11 and handheld devices that consolidates all your PC games...',
    url: 'https://indianexpress.com/section/technology/',
    publishedAt: new Date('2025-09-14T08:00:00Z'),
  },
  {
    title: 'Apple iPhone 17 series to go on sale from Sept 19',
    content: 'Apple officially announces that the iPhone 17 series will begin sales starting September 19 with various pricing options...',
    url: 'https://indianexpress.com/section/technology/',
    publishedAt: new Date('2025-09-14T09:30:00Z'),
  },
  {
    title: 'US, China reach framework deal on TikTok',
    content: 'Following talks in Madrid, the US and China have reached a framework agreement on TikTok ownership and control...',
    url: 'https://reuters.com/technology/',
    publishedAt: new Date('2025-09-15T12:00:00Z'),
  }, {
    title: 'Revolutionizing agriculture: Drone technology for efficient pesticide spraying in Nayagarh',
    content: 'Farmers in Nayagarh, Odisha are using drone technology to spray pesticides, improving precision and reducing labour. Government training programs help adoption. …',
    url: 'https://timesofindia.indiatimes.com/city/bhububhabhububhubhub/…',
    publishedAt: new Date('2025-09-16T05:00:00Z'),
  },
  {
    title: 'AI not a threat but an amplifier of human ingenuity: Karandikar',
    content: 'At VNIT’s 23rd convocation, Karandikar urged graduates to see AI as tool to enhance human creativity, not replace it. He highlighted ethics, creativity & empathy. …',
    url: 'https://timesofindia.indiatimes.com/city/nagpur/…',
    publishedAt: new Date('2025-09-16T07:00:00Z'),
  },
  {
    title: 'IIT-K, ARAI to strengthen automotive security',
    content: 'IIT Kanpur’s C3iHub and Automotive Research Association of India are partnering on automotive cybersecurity, focusing on connected and autonomous vehicle safety. …',
    url: 'https://timesofindia.indiatimes.com/city/kanpur/…',
    publishedAt: new Date('2025-09-15T12:30:00Z'),
  },
  {
    title: '‘Digital Swaraj Mission’: GTRI flags risks of US tech dependence; calls for India’s cloud and OS self-reliance by 2030',
    content: 'The Global Trade Research Initiative emphasizes India should build sovereign cloud infrastructure, independent OS, and reduce reliance on US technologies by 2030 under Digital Swaraj Mission. …',
    url: 'https://timesofindia.indiatimes.com/business/india-business/…',
    publishedAt: new Date('2025-09-14T10:15:00Z'),
  },
  {
    title: 'Amazon Ads taps India as global innovation hub',
    content: 'Amazon Ads is increasingly leveraging its Indian teams to build global ad tech products, turning India into a center for innovation beyond just market growth. …',
    url: 'https://economictimes.indiatimes.com/industry/services/advertising/…',
    publishedAt: new Date('2025-09-15T08:20:00Z'),
  },
  {
    title: 'Innovation first, regulation later: Vaishnaw on India’s tech playbook',
    content: 'Minister Ashwini Vaishnaw says India will prioritize innovation over regulation in tech policy, especially in emerging areas like AI, to maximize impact. …',
    url: 'https://economictimes.indiatimes.com/tech/technology/…',
    publishedAt: new Date('2025-09-15T11:45:00Z'),
  },
  {
    title: 'MSI to manufacture RTX 50 series graphics powered Katana and Crosshair laptops in India',
    content: 'MSI will locally manufacture its Katana & Crosshair laptop series powered by NVIDIA RTX-50 graphic cards in Chennai via a partnership with Syrma SGS Technology. …',
    url: 'https://timesofindia.indiatimes.com/technology/laptops-pc/…',
    publishedAt: new Date('2025-09-13T14:00:00Z'),
  },
  {
    title: 'Samsung announces festive offers on Galaxy A06 5G in India: Check details here',
    content: 'The Galaxy A06 5G is now available with festive deals. Features include a 50MP camera, fast charging, and good display, targeting mid-range buyers. …',
    url: 'https://businesstoday.in/technology/…',
    publishedAt: new Date('2025-09-16T04:30:00Z'),
  },
  {
    title: 'Huawei Watch GT 6, GT 6 Pro Price, Specifications Leak Ahead of September 19 Launch',
    content: 'Details for Huawei’s Watch GT6 & Pro have leaked: improved sensors, battery life, design tweaks. Launch expected Sept 19. …',
    url: 'https://gadgets360.com/news/…',
    publishedAt: new Date('2025-09-16T06:45:00Z'),
  },
  {
    title: 'MediaTek Dimensity 9500 Launch Date Announced; Company Designs Its First Chip Using TSMC’s 2nm Process',
    content: 'MediaTek is pushing the envelope with its new chip designed using TSMC 2nm process. Expected to power upcoming flagship devices. …',
    url: 'https://gadgets360.com/news/…',
    publishedAt: new Date('2025-09-16T03:20:00Z'),
  }, 
  {
    title: "Samsung releases One UI 8 software update to Galaxy S25 series",
    content: "Samsung has officially launched the One UI 8 update, initially for its Galaxy S25 phones. Other eligible devices (S24, Z Fold6, Z Flip6, etc.) will also receive the update later. The update brings UX improvements and performance tweaks.",
    url: "https://timesofindia.indiatimes.com/technology/tech-news/samsung-releases-one-ui-8-software-update-to-galaxy-s25-series/articleshow/123915020.cms",
    publishedAt: new Date("2025-09-16T00:00:00")
  },
  {
    title: "Samsung announces storage upgrade offer for Galaxy S25 FE: All the details",
    content: "Samsung India has revealed a storage upgrade deal for the Galaxy S25 FE, with the device set to launch on September 29. The 128GB base model is priced at ₹59,999; the promotional offer provides extra storage worth ₹12,000.",
    url: "https://timesofindia.indiatimes.com/technology/tech-news/samsung-announces-storage-upgrade-offer-for-galaxy-s25-fe-all-the-details/articleshow/123902605.cms",
    publishedAt: new Date ("2025-09-16T00:00:00") 
  },
  {
    title: "Ingram Micro India to distribute Apple’s iPhone 17 series, Apple Watch models, and more through IndiaIstore",
    content: "Ingram Micro India has partnered with IndiaIstore to distribute Apple’s latest lineup (iPhone 17, updated Apple Watch, etc.), starting 19th September. This aims to make Apple’s products more accessible across India.",
    url: "https://timesofindia.indiatimes.com/technology/mobiles-tabs/ingram-micro-india-to-distribute-apples-iphone-17-series-apple-watch-models-and-more-through-indiaistore/articleshow/123900801.cms",
    publishedAt: new Date("2025-09-16T00:00:00")
  },
  {
    title: "Meta accidentally leaks Smart Glasses Display announcement ahead of Connect 2025",
    content: "Meta leaked early information about its upcoming smart glasses featuring an integrated display. The leak occurred via a blog post ahead of Meta Connect 2025, stirring interest in the anticipated product.",
    url: "https://timesofindia.indiatimes.com/technology/tech-news/meta-accidentally-leaks-smart-glasses-display-announcement-ahead-of-connect-2025/articleshow/123912692.cms",
    publishedAt: new Date("2025-09-16T00:00:00")
  },
  {
    title: "Tech students securing top three positions to get laptops: Minister",
    content: "In Bihar, students who rank in the top three in all engineering and polytechnic streams will receive laptops starting next year. The award scheme (“Medhavi Chhatra Protsahan Puraskar”) currently gives medals, certificates and cash; the new addition aims to support students’ access to technology.",
    url: "https://timesofindia.indiatimes.com/city/patna/tech-students-securing-top-three-positions-to-get-laptops-minister/articleshow/123902299.cms",
    publishedAt: new Date("2025-09-16T00:00:00")
  },
];

(async () => {
  for (const article of newsData) {
    await prisma.news.create({ data: article });
  }
  await prisma.$disconnect();
  console.log('Seeded real sample news articles');
})();
