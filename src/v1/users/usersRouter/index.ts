import express from 'express';
import { userPost } from '../usersController/userPost';
import { GetAllUsers } from '../usersController/getAllUser';
import { DeleteUser } from '../usersController/deleteUser';
import { GetUserById } from '../usersController/getByUser';
import { userLogin } from '../usersController/login';
import { authenticateToken } from '../../../global/authenticateToken';
import { EditUser } from '../usersController/editUser';
import { authorizeRoles } from '../../../global/authorizeRoles';
import { signup } from '../usersController/signup';
import { userLogout } from '../usersController/logout';
const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', signup);
router.get('/logout/:id', userLogout);
router.use(authenticateToken, authorizeRoles(['ADMIN']));
router.get('/', GetAllUsers);
router.put('/:id', EditUser);
router.delete('/:id', DeleteUser);
router.get('/:id', GetUserById);
router.post('/', userPost);

export const userRouter = router;
