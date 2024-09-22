import express from "express";
import { createRequest, test } from "../controllers/request.controller.js";

const router = express.Router();

router.get("/test",test);
router.post("/place_clean_req",createRequest);
// router.post("/signin",signin);
// router.post("/google",google);


export default router;