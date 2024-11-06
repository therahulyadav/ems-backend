import express from 'express';
import { User } from '../DB/Model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserAuth from '../MiddleWare/UserAuth.js';

const saltRounds = 10;

const router = express.Router();


router.post('/signin',UserAuth, async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "User does not exist"});
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(400).json({message: "Invalid password"});
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.status(200).json({message: "User logged in successfully", token});
});

router.post('/updatetask', UserAuth, async (req, res) => {
    const {id, status} = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, {status}, {new: true});
    res.status(200).json({message: "Task updated successfully", task: updatedTask});
});

export default router; 