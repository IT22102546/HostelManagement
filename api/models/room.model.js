import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
           
        },
        furnished:{
            type:Boolean,
            required:true,
        },
        roomtype:{
            type:String,
            required:true,
        },
        gender:{
            type:String,
            required:true,
        },
        roomno:{
            type:String,
            required:true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
          },
        slug: {
            type: String,
            required:true,
            unique: true,
        },
       
    },{timestamps:true}
)

const Rooms = mongoose.model('Rooms',roomSchema);

export default Rooms;