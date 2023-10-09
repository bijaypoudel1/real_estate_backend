import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createFaq = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    const faq = await prisma.faQ.create({
      data: { ...body },
    });
    res.send({ message: "Faq created successfully", faq });
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getFaq = asyncHandler(async (req, res) => {
  const faq = await prisma.faQ.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(faq);
});

export const getSingleFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const faq = await prisma.faQ.findUnique({
      where: { id },
    });
    res.send(faq);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const updateFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const faq = await prisma.homeLoan.findUnique({
      where: { id },
    });
    if (!faq)
      res.status(404).json({
        message: "No news found",
      });
    await prisma.faQ.update({
      where: { id },
      data: { ...body },
    });
    res.status(200).json({
      message: "homeLoan Update successfully",
    });
  } catch (err) {}
});

export const deleteFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const homeLoan = await prisma.faQ.delete({
      where: { id },
    });
    res.status(200).json({ message: "homeLoan deleted successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});
