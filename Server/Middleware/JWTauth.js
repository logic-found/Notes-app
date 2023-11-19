const jwt = require('jsonwebtoken');
const model = require('../Schema/User')
const User = model.User
require('dotenv').config();

const JWTauth = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
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
                res.status(401).json({"name": "user doesn't exist"})
            }
        }
        else{
            res.status(401).json({"name":"no token in header"})
        }
    }
    catch(err){
        res.status(401).json({"name":"authorization error", err})
    }

}

module.exports = JWTauth