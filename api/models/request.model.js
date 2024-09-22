import mongoose from "mongoose";


const requestSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    roomNumber: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    additionalDetails: {
      type: String,
      trim: true
    },
    status:{
        type: Boolean
    },
    comments:{
        type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },{timestamps:true});

const cleanRequest = mongoose.model('CleanRequest',requestSchema);
export default cleanRequest;

