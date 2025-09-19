import { Router } from "express";
import { getNotFoundPageData } from "../controllers/not-found-controller";

const router = Router();

router.get("/", getNotFoundPageData);

export default router;