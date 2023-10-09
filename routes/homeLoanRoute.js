import jwtCheck from "../config/auth0Config.js";
import express from "express";
import { adminCheck } from "../middleware/adminCheck.middleware.js";
import { createHomeLoan, deleteHomeLoan, getHomeLoan, getSingleHomeLoan, updateHomeLoan } from "../controllers/homeLoanCntrl.js";
const router = express.Router();

router.get("/", getHomeLoan);
router.post("/", jwtCheck, createHomeLoan);
router.get("/:id", getSingleHomeLoan);
router.patch("/:id", jwtCheck, updateHomeLoan);
router.delete("/:id", jwtCheck, deleteHomeLoan);

export { router as homeLoanRoute };
