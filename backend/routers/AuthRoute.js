import express from "express";
import { 
    Login, 
    LogOut, 
    getUserLogin
} from "../controllers/Auth.js";

const router = express.Router();

router.get('/me', getUserLogin);
router.post('/login', Login);
router.delete('/logout', LogOut);

export default router;