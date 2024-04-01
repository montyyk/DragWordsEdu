import express from "express"
import { createActiveGame, getActiveGameByGameId, getActiveGameByPin } from "../controllers/activeGameController"

const router = express.Router()

// Public route: Get a game by ID
router.get("/", getActiveGameByGameId) // gameId in query params
router.get("/:pin", getActiveGameByPin)
router.post("/create", createActiveGame)

export default router
