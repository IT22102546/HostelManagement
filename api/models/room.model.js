import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
           
        },
        roomId: {
            type: String,
          
            unique: true,
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