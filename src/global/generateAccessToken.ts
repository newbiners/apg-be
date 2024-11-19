import jwt from "jsonwebtoken"

export const generateAccessToken = (payload: any) => {
    return "Bearer " + jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string)
}
