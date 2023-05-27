import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
    const token = jwt.sign(userId, "multiplayerChess@@$$")
    return token;
}
