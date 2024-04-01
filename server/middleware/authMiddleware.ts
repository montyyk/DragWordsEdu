import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface IDecodedToken {
  id: string
  iat: number
  exp: number
}

// Middleware to validate token and protect routes
export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IDecodedToken

      // Add user from the payload
      req.body.user = decoded.id

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: "Not authorized, token failed" })
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" })
  }
}
