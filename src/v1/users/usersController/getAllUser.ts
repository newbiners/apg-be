import { Request, Response } from "express";
import { User } from "../usersModel/userModel";
import { roles, IRoles } from "../../roles/rolesModel/rolesModel";
import { lomba as lombaDb, ILomba } from "../../lomba/lombaModel/lombaModel";


interface UserWithRole {
    role: string | null;
    lomba: ILomba | null; // Tambahkan `null` di tipe
    [key: string]: any;
}
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
        throw new Error("Failed to fetch roles from the database.");
    }
};

// Function to fetch related competitions (lomba)
export const getlomba = async (arrayLomba: string[]) => {
    try {

        return arrayLomba;
        const data_lomba = await lombaDb.find({ _id: { $in: arrayLomba } });
        const data_result: Record<string, IRoles> = {}; // Define a map for roles

        for (const role of data_lomba) {
            data_result[role._id.toString()] = role.toObject(); // Convert Mongoose document to plain object
        }

        return data_result;
    } catch (error) {
        console.error("Error fetching competitions:", error);
        throw new Error("Failed to fetch competitions.");
    }
};

// Function to fetch all users and assign roles
export const GetAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch users and roles
        const getUsers = await User.find();
        const getRoles = await getRole();

        // res.status(200).json(getUsers);
        // Collect unique lomba IDs
        const lomba_id: string[] = getUsers.map((user) => user.lomba.toString() ?? null);
        res.status(200).json(lomba_id);

        // Fetch related lomba data
        const lombaReturn: any = await getlomba(lomba_id);

        // Map users with roles and lomba
        const usersWithRoles = getUsers.map((user) => {
            const userWithRole = user.toObject(); // Convert Mongoose document to plain object
            userWithRole.role = getRoles[user.role.toString()] || null; // Assign role or null if not found
            userWithRole.lomba = lombaReturn[user.lomba.toString()] || null; 
            return userWithRole;
        });

        // Send response
        res.status(200).json(usersWithRoles);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
