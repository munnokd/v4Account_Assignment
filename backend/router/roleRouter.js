import express from "express";
import { addNewRole } from "../controllers/RoleController.js";

var router= express.Router()

router.get('/',()=>{console.log('hello')})
router.post('/add-role',addNewRole)

export default router