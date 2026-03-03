import { Router } from "express";
import { handleGenerate } from "../controllers/generate.controller";

const router = Router();

router.post("/", handleGenerate);

export default router;
