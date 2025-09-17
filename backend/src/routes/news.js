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
