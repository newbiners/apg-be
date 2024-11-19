import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../v1/users/usersModel/userModel';

export const authenticateToken = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    // const str = JSON.parse(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    
    try {
        const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        const user = await User.findOne({ _id: decoded.payload }).exec();

        if (!user) return res.sendStatus(401);
        req.user = user;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};
