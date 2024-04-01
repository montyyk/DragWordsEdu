import { Request, Response } from "express"
import Game, { IGame } from "../models/Game"

// Function to create a new game
export const createGame = async (req: Request, res: Response) => {
  try {
    const { name, categories, words, createdBy } = req.body

    // Create a new game instance
    const newGame = new Game({
      name,
      categories,
      words,
      createdBy
    })

    // Save the new game to the database
    const savedGame = await newGame.save()

    res.status(201).json(savedGame)
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: "Failed to create game", error: error.message })
  }
}

// Function to update an existing game
export const updateGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params
    const { name, categories, words } = req.body

    // Find the game by its ID and update it
    const updatedGame = await Game.findByIdAndUpdate(gameId, { name, categories, words }, { new: true })

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" })
    }

    res.status(200).json(updatedGame)
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: "Failed to update game", error: error.message })
  }
}

// Function to list all games created by a teacher
export const listGames = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params // Assuming teacherId is passed as a URL parameter

    // Find games created by the teacher
    const games = await Game.find({ createdBy: teacherId })

    res.status(200).json(games)
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: "Failed to list games", error: error.message })
  }
}

// Function to fetch a single game by ID
export const getGameById = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params

    // Find the game by its ID
    const game = await Game.findById(gameId)

    if (!game) {
      return res.status(404).json({ message: "Game not found" })
    }

    res.status(200).json(game)
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch game", error: error.message })
  }
}
