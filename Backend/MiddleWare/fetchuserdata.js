const jwt = require("jsonwebtoken");
const JWT_SECRECT = "HimanshuisagoodB$oy";

const fetchUserData = (req,res,next) =>{
    // get the user from the jwt token and add id to req obj
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "Please authenticate with a valid token"})
    }
    try {
        const data = jwt.verify(token , JWT_SECRECT);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error : "Please authenticate with a valid token"})
    }
}
module.exports = fetchUserData;