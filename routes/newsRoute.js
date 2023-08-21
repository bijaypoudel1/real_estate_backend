import jwtCheck from "../config/auth0Config.js";
import express from "express";
import { createNews, deleteNews, gesSingleNews, getNews, updateNews } from "../controllers/newsCntrl.js";
import { adminCheck } from "../middleware/adminCheck.middleware.js";
const router = express.Router();

router.get("/", getNews);
router.post("/", jwtCheck, adminCheck, createNews);
router.get("/:id", gesSingleNews);
router.patch("/:id", jwtCheck, adminCheck, updateNews);
router.delete("/:id", jwtCheck, adminCheck, deleteNews);

export { router as newsRoute };
