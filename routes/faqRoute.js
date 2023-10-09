import jwtCheck from "../config/auth0Config.js";
import express from "express";
import { adminCheck } from "../middleware/adminCheck.middleware.js";
import { createHomeLoan, deleteHomeLoan, getHomeLoan, getSingleHomeLoan, updateHomeLoan } from "../controllers/homeLoanCntrl.js";
import { createFaq, deleteFaq, getFaq, getSingleFaq, updateFaq } from "../controllers/faqCntrl.js";
const router = express.Router();

router.get("/", getFaq);
router.post("/", jwtCheck, createFaq);
router.get("/:id", getSingleFaq);
router.patch("/:id", jwtCheck, updateFaq);
router.delete("/:id", jwtCheck, deleteFaq);

export { router as faqRoute };
