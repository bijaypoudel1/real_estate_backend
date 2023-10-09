import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createHomeLoan = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    const homeLoan = await prisma.homeLoan.create({
      data: { ...body },
    });
    res.send({ message: "Home loan created successfully", homeLoan });
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getHomeLoan = asyncHandler(async (req, res) => {
  const homeLoan = await prisma.homeLoan.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(homeLoan);
});

export const getSingleHomeLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const homeLoan = await prisma.homeLoan.findUnique({
      where: { id },
    });
    res.send(homeLoan);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const updateHomeLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const homeLoan = await prisma.homeLoan.findUnique({
      where: { id },
    });
    if (!homeLoan)
      res.status(404).json({
        message: "No news found",
      });
    await prisma.homeLoan.update({
      where: { id },
      data: { ...body },
    });
    res.status(200).json({
      message: "homeLoan Update successfully",
    });
  } catch (err) {}
});

export const deleteHomeLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const homeLoan = await prisma.homeLoan.delete({
      where: { id },
    });
    res.status(200).json({ message: "homeLoan deleted successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});
