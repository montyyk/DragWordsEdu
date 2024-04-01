import express from "express"
import { createGame, listGames, getGameById, updateGame } from "../controllers/gameController"
import { protect } from "../middleware/authMiddleware"

const router = express.Router()

// Public route: Get a game by ID
router.get("/:gameId", getGameById)

// Protected routes: Apply the 'protect' middleware
router.post("/create", protect, createGame)
router.put("/edit/:gameId", protect, updateGame)
router.get("/list/:teacherId", protect, listGames)

export default router
