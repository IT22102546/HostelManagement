import express from 'express';
import {addBooking, deleteBooking, getBookings} from '../controllers/booking.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/addbooking',verifyToken,addBooking);
router.delete('/deletebooking/:bookingId/:userId',verifyToken,deleteBooking);
router.get('/getbookings',getBookings);

export default router;