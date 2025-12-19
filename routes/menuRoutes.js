import express from "express";
import upload from "../middleware/upload.js";
import {
  addMenuItem,
  getMenu,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuController.js";

const router = express.Router();

/* CREATE */
router.post("/", upload.single("image"), addMenuItem);

/* READ */
router.get("/", getMenu);
router.get("/:id", getMenuItemById);   // ✅ MUST BE BEFORE put/delete

/* UPDATE */
router.put("/:id", upload.single("image"), updateMenuItem);

/* DELETE */
router.delete("/:id", deleteMenuItem);

export default router;
