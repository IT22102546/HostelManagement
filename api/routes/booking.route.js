import express from 'express';
import {addBooking} from '../controllers/room.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getBookings } from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/addbooking',verifyToken,addBooking);

router.get('/getbookings',getBookings);

export default router;