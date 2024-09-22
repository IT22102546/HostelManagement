import { errorHandler } from "../utils/error.js";
import cleanRequest from "../models/request.model.js";


//for api testing
export const test = (req, res) => {
    res.json({
      message: 'API is working on requests'
    });
  };

//create clean request in db
export const createRequest = async (req, res, next) => {
    if ( !req.body.email || !req.body.name || !req.body.roomNumber || !req.body.date) {
        console.log(req.body);
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    const email = req.body.email;
    const name = req.body.name;
    const roomNumber = req.body.roomNumber;
    const date = req.body.date;

    const newRequest = new cleanRequest({
        email,name,roomNumber,date
    })

    try {
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        next(error);
    }
};

//Get all the records
export const  getAllRequests = async(req,res,next)=>{
    cleanRequest.find().then((requestData)=>{
        res.json(requestData);
    }).catch((error)=>{
        console.log(error);
    })
};

//Delete Request record from databse
export const deleteRequest = async(req, res ,next)=>{
    let requestId = req.params.id;
    try {
        await cleanRequest.findByIdAndDelete(requestId);
        res.status(200).json('The record has been deleted');
      } catch (error) {
        next(error);
      }
};

//get onlu one record

export const getOnlyOneRequest = async (req, res, next) => {
    try {
        const requestId = req.params.id;
        const requestedRecord = await cleanRequest.findById(requestId);
        
        if (!requestedRecord) {
            return res.status(404).json({ error: 'Clean record not found' });
        }
        res.json(requestedRecord);    

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//add a comment for cleaning request by student
export const addCommentToRequestStudent = async(req, res, next)=>{
    let recordId = req.params.id;
    const {comment} = req.body;
    
    const updateRecord = {
        comment
    }

    try {
        await cleanRequest.findByIdAndUpdate(recordId, updateRecord);
        res.status(200).json(updateRecord);
    } catch (error) {
        next(error);
    }
};

//add a comment for cleaning request by student
export const addCommentToRequestAdmin = async(req, res, next)=>{
    let recordId = req.params.id;
    const {comment} = req.body;
    
    const updateRecord = {
        comment
    }

    try {
        await cleanRequest.findByIdAndUpdate(recordId, updateRecord);
        res.status(200).json(updateRecord);
    } catch (error) {
        next(error);
    }
};

//update the status of the cleaning request
export const updateTheStatus = async(req, res, next)=>{
    let recordId = req.params.id;
    const {status} = req.body;
    
    const updateRecord = {
        status
    }

    try {
        await cleanRequest.findByIdAndUpdate(recordId, updateRecord);
        res.status(200).json(updateRecord);
    } catch (error) {
        next(error);
    }
};