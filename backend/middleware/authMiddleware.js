import {config} from "dotenv";
import jwt from "jsonwebtoken";


config();

const auth = async(req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });

}
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId };
        next();
        
    }catch (e){
        console.error("Token verification error: ", e.message);
        res.status(401).json({ message: 'Token is not valid' });

         }
    
};

export {auth};