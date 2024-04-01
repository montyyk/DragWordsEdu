import { Request, Response } from "express"
import ActiveGame, { IActiveGame } from "../models/ActiveGame"
import Game from "../models/Game"

const activeDuration = 7 * 24 * 60 * 60 * 1000 // one week in milliseconds

// Helper function to generate a unique 4-digit PIN
const generateUniquePin = async (): Promise<number> => {
    let pin: number
    let pinExists: boolean

    do {
        pin = Math.floor(1000 + Math.random() * 9000) // Generate 4-digit PIN
        const existingGame = await ActiveGame.findOne({ pin })
        if (existingGame && existingGame.createdAt.getTime() + activeDuration < Date.now()) {
            await ActiveGame.findByIdAndDelete(existingGame._id)
            pinExists = false
        } else pinExists = !!existingGame
    } while (pinExists)

    return pin
}

const gameIsActive = async (gameId: string): Promise<boolean> => {
    const activeGame = await ActiveGame.findOne({ game: gameId }).populate("game")

    return !!activeGame
}

// Function to create a new active game session
export const createActiveGame = async (req: Request, res: Response) => {
    try {
        const { gameId } = req.body

        if (!gameId) {
            return res.status(400).json({ message: "Game ID is required" })
        }

        if (await gameIsActive(gameId)) {
            return res.status(400).json({ message: "Game is already active" })
        }

        const game = await Game.findById(gameId)

        if (!game) {
            return res.status(404).json({ message: "Game not found" })
        }

        const pin = await generateUniquePin()

        const newActiveGame = new ActiveGame({
            pin,
            game: gameId
        })

        const savedActiveGame = await newActiveGame.save()

        res.status(201).json(savedActiveGame)
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ message: "Failed to create active game session", error: error.message })
    }
}

// Function to fetch an active game session by  PIN
export const getActiveGameByPin = async (req: Request, res: Response) => {
    try {
        const { pin } = req.params

        const activeGame = await ActiveGame.findOne({ pin }).populate("game")

        if (!activeGame || activeGame.createdAt.getTime() + activeDuration < Date.now()) {
            return res.status(404).json({ message: "Active game session not found" })
        }

        res.status(200).json(activeGame)
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ message: "Failed to fetch active game session", error: error.message })
    }
}

export const getActiveGameByGameId = async (req: Request, res: Response) => {
    try {
        const queryId = req.query.gameId
        if (!queryId) {
            return res.status(400).json({ message: "Game ID is required" })
        }

        if (typeof queryId !== "string") {
            return res.status(400).json({ message: "Invalid game ID" })
        }

        const gameId = queryId

        const activeGame = await ActiveGame.findOne({ game: gameId }).populate("game")

        if (!activeGame || activeGame.createdAt.getTime() + activeDuration < Date.now()) {
            return res.status(404).json({ message: "Active game session not found" })
        }

        res.status(200).json(activeGame)
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ message: "Failed to fetch active game session", error: error.message })
    }
}
