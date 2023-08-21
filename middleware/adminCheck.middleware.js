import asyncHandler from "express-async-handler";

export const adminCheck = asyncHandler((req, res, next) => {
  const { role } = req.headers;

  if (!role)
    res.status(401).json({
      message: "Unauthorized",
    });

  if (role !== "admin")
    res.status(401).json({
      message: "Unauthorized",
    });

  next();
});
