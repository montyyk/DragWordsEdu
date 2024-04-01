import express from "express"
import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db"
import userRoutes from "./routes/userRoutes"
import gameRoutes from "./routes/gameRoutes"
import activeGameRoutes from "./routes/activeGameRoutes"

connectDB()

const app = express()
app.use(express.json()) // Middleware for parsing JSON bodies

app.use("/api/users", userRoutes)
app.use("/api/games", gameRoutes)
app.use("/api/active-games", activeGameRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
