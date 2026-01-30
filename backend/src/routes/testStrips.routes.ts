import { Router } from "express";
import { upload } from "../middleware/upload";
import * as ctrl from "../controllers/testStrips.controller";

const router = Router();

router.post("/upload", upload.single("image"), ctrl.uploadTestStrip);
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);

export default router;
