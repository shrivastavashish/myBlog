// auth.route.js
import express from 'express';
import { signin, signup, google } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google); // Use the google function defined in auth.controller.js
export default router;
