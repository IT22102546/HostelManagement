import express from 'express';
import { addRoom} from '../controllers/room.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add',verifyToken,addRoom);
//router.delete('/delete/:id',verifyToken,deleteRoom);
//router.post('/update/:id',verifyToken,updateRoom);
//router.get('/get/:id',getRooms);
//router.get('/get', getbookingreqs);

export default router;