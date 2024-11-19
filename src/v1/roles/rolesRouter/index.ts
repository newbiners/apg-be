import express from 'express';
const router = express.Router();
import { PostRoles } from '../rolesController/postRoles';
import { GetAllRoles } from '../rolesController/getAllRoles';
import { DeleteRoles } from '../rolesController/deleteRoles';
router.post('/', PostRoles);

router.get('/', GetAllRoles);

router.get('/:id', (req, res) => {
  res.send(`Hello, world! test get id ${req.params.id}`);
});

router.delete('/:id', DeleteRoles);

export const rolesRouter = router;
