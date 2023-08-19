import jwtCheck from "../config/auth0Config.js";
import express from "express";
import { createNews, deleteNews, gesSingleNews, getNews, updateNews } from "../controllers/newsCntrl.js";
const router = express.Router();

router.get("/", getNews);
router.post("/", jwtCheck, createNews);
router.get("/:id", gesSingleNews);
router.patch("/:id", jwtCheck, updateNews);
router.delete("/:id", jwtCheck, deleteNews);

export { router as newsRoute };
