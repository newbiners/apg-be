import express from 'express';
import { userPost } from '../usersController/userPost';
import { GetAllUsers } from '../usersController/getAllUser';
import { DeleteUser } from '../usersController/deleteUser';
import { GetUserById } from '../usersController/getByUser';
import { userLogin } from '../usersController/login';
import { authenticateToken } from '../../../global/authenticateToken';
import { authorizeRoles } from '../../../global/authorizeRoles';
import { signup } from '../usersController/signup';
const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', signup);
router.use(authenticateToken)
router.get('/', GetAllUsers);
router.delete('/:id', DeleteUser);
router.get('/:id', GetUserById);
router.post('/', userPost);

export const userRouter = router;
