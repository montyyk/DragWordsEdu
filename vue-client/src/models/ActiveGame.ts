import type { Game } from './Game'

export interface ActiveGame {
    _id?: string
    pin: number
    gameId: string // Reference to a Game
    game: Game
}
