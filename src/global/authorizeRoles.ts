// import { Request, Response, NextFunction } from 'express'
// import { User } from '../v1/users/usersModel/userModel';
// import { roles } from '../v1/roles/rolesModel/rolesModel';

// export const authorizeRoles = (roless: any) => {
//     return async (req: any, res: Response, next: NextFunction) => {
//         if (!req.user) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         // res.send(200).json({roless})
//         const roles_id = await roles.findOne({ _id: req.user.role_id });
//         if (!roles_id || !roless.includes(roles_id.role_name)) {
//             return res.status(403).json({ message: req.user ? req.user.role_id : 'Forbidden' });
//         }
//         next();
//     };

//     // console.log(roless)

//     // res
// };

import { Request, Response, NextFunction } from 'express';
import { User } from '../v1/users/usersModel/userModel';
import { roles } from '../v1/roles/rolesModel/rolesModel';

export const authorizeRoles = (allowedRoles: string[]) => {
    return async (req: any, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const role = await roles.findOne({_id :req.user.role_id}).exec();

            if (!role || !allowedRoles.includes(role.name)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (err) {
            return res.status(500).json({ message: 'Server Error' });
        }
    };
};
