const mongoose = require('mongoose');
async function connectDB(){
 await mongoose.connect(process.env.MONGO_URI);
 console.log("Connected to MongoDB");
}

connectDB().catch((err) => {
    console.log(err);
});

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}); 

const TaskSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    finalDate: {
        type: Date,
        required: true
    }
});        

exports.Admin = mongoose.model('Admin', AdminSchema);
exports.User = mongoose.model('User', UserSchema);
exports.Task = mongoose.model('Task', TaskSchema);  


