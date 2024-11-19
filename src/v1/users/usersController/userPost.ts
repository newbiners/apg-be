import { User } from "../usersModel/userModel";
import { roles } from "../../roles/rolesModel/rolesModel";
import { schools } from "../../schools/schoolsModel/schoolsModel";
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
export const userPost = async (req : Request, res : Response): Promise<void> => {
    try{
        const { full_name, username, password, confirmPassword ,phone_number, email, address, school_id, status_person, role_id } = req.body;

        const userAll = await User.findOne({phone_number : phone_number});
        if(userAll != null){
            res.status(400).json({message : "Phone number already exists"})
        }

        const roless = await roles.findOne({_id : role_id});
        if(roless == null){
            res.status(400).json({message : "Role not found"})
        }

        const school = await schools.findOne({_id : school_id});
        if(school == null){
            res.status(400).json({message : "School not found"})
        }

        if(password != confirmPassword){
            res.status(400).json({message : "Password not match"})
        }
        const salt_id = process.env.SALT;
        const salt =  bcrypt.genSaltSync(Number(salt_id));
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            full_name,
            username,
            password : hashPassword,
            phone_number,
            email,
            address,
            school_id,
            status_person,
            role_id
        });
        const saveUser = await newUser.save();
        res.json(saveUser);
    }catch(error){ 
        res.status(400).json({message : error})
    }
}

