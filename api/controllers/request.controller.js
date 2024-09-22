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
    
}