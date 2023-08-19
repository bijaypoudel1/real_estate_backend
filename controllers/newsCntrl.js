import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createNews = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    const news = await prisma.news.create({
      data: { ...body, ownner: { connect: { email: body.userEmail } } },
    });
    res.send({ message: "News created successfully", news });
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getNews = asyncHandler(async (req, res) => {
  const news = await prisma.news.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(news);
});

export const gesSingleNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const news = await prisma.news.findUnique({
      where: { id },
    });
    res.send(news);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const news = await prisma.news.findUnique({
      where: { id },
    });
    if (!news)
      res.status(404).json({
        message: "No news found",
      });
    await prisma.news.update({
      where: { id },
      data: { ...body },
    });
    res.status(200).json({
      message: "News Update successfully",
    });
  } catch (err) {}
});

export const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const news = await prisma.news.delete({
      where: { id },
    });
    res.status(200).json({ message: "News deleted successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});
