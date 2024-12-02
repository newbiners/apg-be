import { Request, Response } from "express";
import { lomba } from "../lombaModel/lombaModel";
import { User } from "../../users/usersModel/userModel";
import jwt from 'jsonwebtoken'
export const GetAllLomba = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.body
    var filter: any = {};

    if (user) {
      const token = user && user.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
      const currentUser: any = await User.findOne({ _id: decoded.payload });

      if (currentUser.lomba) {
        filter._id = currentUser.lomba
      }
    }
    const getLomba = await lomba.find(filter);

    res.status(200).json(getLomba);
  } catch (err) {
    console.log(err);
  }
};
