const jwt = require('jsonwebtoken');
const model = require('../Schema/User')
const User = model.User
require('dotenv').config();

const JWTauth = async (req, res, next) => {
    try{
        const authHeader = req.headers?.authorization;
        if(authHeader){
            const token = authHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.HMAC_PRIVATE_KEY)
            const userId = decoded.userId
            const user = await User.find({_id:userId})
            if(user){
                //user exist
                req.body.userId = userId
                next()
            }
            else{
                //user doesn't exist
                res.status(401).json({"name": "Please login to access this resource"})
            }
        }
        else{
            res.status(401).json({"name":"Please login to access this resource"})
        }
    }
    catch(err){
        res.status(401).json({"name":"Error Occured", err})
    }

}

module.exports = JWTauth