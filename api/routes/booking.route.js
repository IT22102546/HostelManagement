import express from 'express';
import {addBooking, getBookings} from '../controllers/room.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/addbooking',verifyToken,addBooking);

router.get('/getbookings',getBookings);

export default router;