import express from 'express';
import AdminAuth from '../MiddleWare/AdminAuth.js';
import jwt from 'jsonwebtoken'; 
import { Admin } from '../DB/Model.js';
import bcrypt from 'bcrypt';
import Task from '../DB/Model.js';

const router = express.Router();

const saltRounds = 10;

router.post('/signup', async (req, res) => {  
    const { email, password} = req.body;
    const admin = await Admin.findOne({email}); 
    if(admin) return res.status(400).json({message: "Admin already exists"});
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({ email, password: hashedPassword});
    await newAdmin.save();
    const token = jwt.sign({id: newAdmin._id }, process.env.JWT_SECRET, {expiresIn: "1h"}  );
    res.status(200).json({message: "Admin created successfully", token});
});

router.post('/signin', async (req, res) => {    
    const {email, password} = req.body;
    const admin = await Admin.findOne({email});
    if(!admin) return res.status(400).json({message: "Admin does not exist"});
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if(!isPasswordValid) return res.status(400).json({message: "Invalid password"});
    const token = jwt.sign({id: admin._id }, process.env.JWT_SECRET, {expiresIn: "1h"}  );
    res.status(200).json({message: "Admin logged in successfully", token});
});

router.post('/createtask',AdminAuth, async (req, res) => {    
    const {title, description, dueDate, status} = req.body;
    const newTask = new Task({title, description, dueDate, status});
    await newTask.save();
    res.status(200).json({message: "Task created successfully", task: newTask});
});
router.post('/updatetask', AdminAuth, async (req, res) => {    
    const {id, title, description, dueDate, status} = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, {title, description, dueDate, status}, {new: true});
    res.status(200).json({message: "Task updated successfully", task: updatedTask});    
});
router.post('/deletetask', AdminAuth, async (req, res) => {    
    const {id} = req.body;
    await Task.findByIdAndDelete(id);
    res.status(200).json({message: "Task deleted successfully"});    
});

router.post('/createuser', AdminAuth, async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if(user) return res.status(400).json({message: "User already exists"});
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({name, email, password: hashedPassword});
    await newUser.save();
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.status(200).json({message: "User created successfully", token});
});

router.get('/getallusers', AdminAuth, async (req, res) => {
    const users = await User.find();
    res.status(200).json({users});
});

export default router;