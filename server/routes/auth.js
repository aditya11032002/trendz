
import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";

const router = express.Router();

//Crate a user
router.post("/signup", signup)

//signin
router.post("/signin", signin)

//Google auth
router.post("/google", googleAuth)

export default router;