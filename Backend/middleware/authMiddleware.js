import jwt from 'jsonwebtoken';
import 'dotenv/config'
const JWT_SECRET = process.env.JWT_SERET_Key

// create token here
const createToken = (email)=>{
    return jwt.sign({email},JWT_SECRET , {expiresIn:'1h'})
}

// verifyToken here 
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization') || req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ msg: 'Token not found' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: 'token not found 😒..!' });
        }

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err);
        res.status(403).json({ msg: 'Invalid or expired token' });
    }
};

export {verifyToken , createToken}