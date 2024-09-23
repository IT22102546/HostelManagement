import Booking from "../models/booking.model.js";
import { errorHandler } from "../utils/error.js";

export const addBooking = async (req, res, next) => {
  try {
    const newbooking= new Booking({
      ...req.body,
      userId: req.user.id,
    });

    const savedBooking = await newbooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
    try {
      const { searchTerm, page = 1, limit = 9, username } = req.query;
      const queryOptions = {};
  
      if (searchTerm) {
        queryOptions.username = { $regex: searchTerm, $options: 'i' };
      }
  
      if (username) {
        queryOptions.username = username;
      }
  

      const totalBookings = await Booking.countDocuments(queryOptions);
      const bookings = await Booking.find(queryOptions)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      res.status(200).json({
        bookings,
        totalBookings,
        totalPages: Math.ceil(totalBookings / limit),
        currentPage: Number(page),
      });
    } catch (error) {
      next(error);
    }
  };
  