import Rooms from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";

export const addRoom = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to Add rooms'));
    }
    if (!req.body.roomtype || !req.body.gender || !req.body.furnished ) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }

    const slug = req.body.roomId.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newRoom = new Rooms({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    next(error);
  }
}
export const getProducts = async (req, res, next) => {
  try {
    const { slug, searchTerm, page = 1, limit = 9, roomtype } = req.query;
    const queryOptions = {};

    if (slug) {
      queryOptions.slug = slug;
    }

    if (searchTerm) {
      queryOptions.roomtype = { $regex: searchTerm, $options: 'i' };
    }

    if (roomtype) {
      queryOptions.roomtype = roomtype;
    }


    const totalrooms = await Rooms.countDocuments(queryOptions);
    const rooms = await Rooms.find(queryOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      rooms,
      totalrooms,
      totalPages: Math.ceil(totalrooms / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};


export const updateRoom = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update room details'));
    }
    if (!req.body.roomtype || !req.body.gender || !req.body.furnished ) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }

    const updatedRoom = await Rooms.findByIdAndUpdate(
      req.params.roomId,
      {
        $set: {
          roomtype: req.body.roomtype,
          gender: req.body.gender,
          furnished: req.body.furnished,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteproduct = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete Room '));
    }
    await Rooms.findByIdAndDelete(req.params.roomId);
    res.status(200).json('The Room has been deleted');
  } catch (error) {
    next(error);
  }
};