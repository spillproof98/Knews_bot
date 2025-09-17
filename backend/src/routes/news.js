// // 
// const express = require('express');
// const { PrismaClient } = require('../generated/prisma');
// const prisma = new PrismaClient();
// const router = express.Router();

// router.get('/news', async (req, res) => {
//   try {
//     const search = req.query.search?.trim() || '';
//     if (!search) {
//       // Return latest 10 news if no search
//       const news = await prisma.News.findMany({
//         orderBy: { publishedAt: 'desc' },
//         take: 10,
//       });
//       return res.json({ news });
//     }

//     // Split search string into words/tokens
//     const tokens = search.split(/\s+/);

//     // Build OR conditions for each token on title/content
//     const tokenConditions = tokens.map(token => ({
//       OR: [
//         { title: { contains: token, mode: 'insensitive' } },
//         { content: { contains: token, mode: 'insensitive' } },
//       ]
//     }));

//     // Detect date token in YYYY-MM-DD format (only first one)
//     const dateMatch = tokens.find(t => /^\d{4}-\d{2}-\d{2}$/.test(t));
//     const dateCondition = dateMatch ? {
//       publishedAt: {
//         gte: new Date(dateMatch),
//         lt: new Date(new Date(dateMatch).getTime() + 24 * 60 * 60 * 1000),
//       }
//     } : {};

//     // Combine conditions: AND all token conditions and dateCondition (if any)
//     const where = {
//       AND: [
//         ...tokenConditions,
//         ...(dateMatch ? [dateCondition] : []),
//       ],
//     };

//     // Query matching news ordered by date
//     const news = await prisma.News.findMany({
//       where,
//       orderBy: { publishedAt: 'desc' },
//       take: 20,
//     });

//     res.json({ news });
//   } catch (error) {
//     console.error('Failed to fetch news:', error);
//     res.status(500).json({ error: 'Failed to fetch news' });
//   }
// });

// module.exports = router;
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.get('/news', async (req, res) => {
  try {
    const search = req.query.search?.trim() || '';
    if (!search) {
      const news = await prisma.News.findMany({
        orderBy: { publishedAt: 'desc' },
        take: 10,
      });
      return res.json({ news });
    }

    const tokens = search.split(/\s+/);

    const tokenConditions = tokens.map(token => ({
      OR: [
        { title: { contains: token, mode: 'insensitive' } },
        { content: { contains: token, mode: 'insensitive' } },
      ]
    }));

    const dateMatch = tokens.find(t => /^\d{4}-\d{2}-\d{2}$/.test(t));
    const dateCondition = dateMatch ? {
      publishedAt: {
        gte: new Date(dateMatch),
        lt: new Date(new Date(dateMatch).getTime() + 24 * 60 * 60 * 1000),
      }
    } : {};

    const where = {
      AND: [
        ...tokenConditions,
        ...(dateMatch ? [dateCondition] : []),
      ],
    };

    const news = await prisma.News.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: 20,
    });

    res.json({ news });
  } catch (error) {
    console.error('Failed to fetch news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
