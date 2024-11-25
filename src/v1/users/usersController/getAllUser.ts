import { Request, Response } from "express";
import { User } from "../usersModel/userModel";
import { roles, IRoles } from "../../roles/rolesModel/rolesModel";

// Function to fetch roles and return a map of roles by ID
export const getRole = async (): Promise<Record<string, IRoles>> => {
    try {
        const data_roles = await roles.find(); // Fetch roles from the database
        const data_result: Record<string, IRoles> = {}; // Define a map for roles
        for (const role of data_roles) {
            data_result[role._id.toString()] = role.toObject(); // Convert Mongoose document to plain object
        }
        return data_result; // Return the roles map
    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error; // Propagate the error
    }
};

// Function to fetch all users and assign roles
export const GetAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const getUsers = await User.find();
        const getRoles = await getRole();

        const usersWithRoles = getUsers.map((user) => {
            const userWithRole = user.toObject(); // Convert Mongoose document to plain object
            userWithRole.role = getRoles[user.role.toString()] || null; // Assign role or null if not found
            return userWithRole;
        });

        res.status(200).json(usersWithRoles);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
