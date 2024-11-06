import jwt from 'jsonwebtoken';

export default function AdminAuth(req, res, next) {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({message: "Unauthorized"});
    }
    req.admin = decoded.admin;
    next();     
}