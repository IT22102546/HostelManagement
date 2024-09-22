import express from "express";
import { addCommentToRequestAdmin, addCommentToRequestStudent, createRequest, deleteRequest, getAllRequests, getOnlyOneRequest, test, updateTheStatus } from "../controllers/request.controller.js";

const router = express.Router();

router.get("/test",test);
router.post("/place_clean_req",createRequest);
router.get("/get_all_req", getAllRequests);
router.put("/add_comment_stu", addCommentToRequestStudent);
router.put("/add_comment_admin", addCommentToRequestAdmin);
router.delete("/delete_req",deleteRequest);
router.put("update_status", updateTheStatus);
router.get("get_req", getOnlyOneRequest);


export default router;