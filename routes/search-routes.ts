import { Router } from "express";
import { generalSearch } from "../controllers/search-controller";

const router = Router();

// GET /api/search - General search for cities and experiences
// Query parameters: ?q=searchTerm&limit=5
router.get("/", generalSearch);

// POST /api/search - General search for cities and experiences
// Body: { query: "searchTerm", limit: 5 }
router.post("/", generalSearch);

export default router;