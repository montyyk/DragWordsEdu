// interfaces/IGame.ts

export interface Word {
    text: string
    category: string
}

export interface Game {
    _id?: string // Optional for new games being created
    name: string
    categories: string[]
    words: Word[]
    createdBy?: string // Optional based on context (e.g., when creating a game)
}
