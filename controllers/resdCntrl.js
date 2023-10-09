import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const { title, description, price, address, country, city, facilities, image, userEmail } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});

export const myResidencies = asyncHandler(async (req, res) => {
  const { email } = req.header;

  if (!email) res.status(400).json({ message: "Email not found" });

  const myProperty = await prisma.residency.findMany({
    where: { userEmail: email },
  });

  res.status(200).json({ message: "Residency fetched successfully", myProperty });
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    if (!residency) res.status(404).json({ message: "Residency not found" });

    await prisma.residency.delete({
      where: { id },
    });
    res.status(200).json({ message: "Residency deleted successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});

export const updateResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const body = req.body;
  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    if (!residency)
      res.status(404).json({
        message: "No residency found",
      });
    await prisma.residency.update({
      where: { id },
      data: { ...body },
    });
    res.status(200).json({
      message: "residency Update successfully",
    });
  } catch (err) {}
});
