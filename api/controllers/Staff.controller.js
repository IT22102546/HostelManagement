
import staff from "../models/staff.model.js";
import { errorHandler } from "../utils/error.js";

export const add = async(req,res,next)=>{
   
   const Staffmembername=req.body.membername;
   
   const Age=Number(req.body.age);
  
   const email=req.body.email;
   const address=req.body.Address;
   const task=req.body.task;
   const phonenumber=req.body.number;
  const Picture=req.body.image;
  
      const newstaffmember = new staff({
        Staffmembername,
        Age,
        phonenumber,
        email,
        address,
     
     
        task,
       
        Picture,
        
});

      try {
        const savedmember = await newstaffmember.save();
        res.status(201).json(savedmember);
      
      } catch (error) {
        next(error);
       
      }



}

export const getstaff = async(req,res,next)=>{
   

    staff.find().then((Staff)=>{
      res.json(Staff)
     
      }).catch((err)=>{
      console.log(err);
  })
  
 


}

export const Delete= async(req,res,next)=>{
   let userId = req.params.id;
  
   staff.findByIdAndDelete(userId)
.then (() => {
res.status (200).send({status: "Member deleted"})
}).catch((err) => {
console.log(err);
res.status (500). send({status: "Error with deleting data", error: err.message});
})
}



export const Getmember= async(req,res,next)=>{
  const userId= req.params.id;
  console.log(userId);
  staff.findOne({_id:userId}).then((staff)=>{

    if (staff){
        res.json(staff)
       } else {
        res.status(401);
        console.log("error")
        
      }

})

}

export const updatestaff= async (req, res, next) => {

  try {
    const updatestaff = await staff.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
     Staffmembername:req.body.membername,
    
    Age:req.body.age,
    phonenumber:req.body.phonenumber,
    email:req.body.EmailAddress,
    address:req.body.Address,
    task:req.body.task,
 
    Picture:req.body.image,

        },
      },
      { new: true }
    );
    res.status(200).json(updatestaff);
  } catch (error) {
    next(error);
  }
};