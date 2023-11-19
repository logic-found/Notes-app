const model = require('../Schema/User')
const User = model.User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async (req, res) => {
    try{
        const {name, email, password} = req.body
        const existingUser = await User.findOne({ email });
        if(existingUser){
            res.status(400).json({error : "already registered email"})
        }
        else{
            bcrypt.hash(password, 5, async (err, hash) => {
                if(err){
                    res.status(500).json({"hashing password error" : err})
                }
                else{
                    try{
                        const newUser = new User({name, email, password : hash})
                        newUser.token =  process.env.USER_DUMMY_TOKEN              // dummy token as token is a required field 
                        const savedUser = await newUser.save()
                        res.status(201).json({name : savedUser.name, email : savedUser.email})
                    }
                    catch(err){
                        if(err.code === 11000){
                            res.status(400).json({error : "already registered email"})
                        }
                        else res.status(500).json(err)
                    }
                }
            }) 
        }
    }
    catch(error){
       //res.status(500).json(error)
       res.json(error)
    }
}

exports.signIn = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({ email });
    
        if(user){
            // user exist, match password now
            const {_id: id, name, password : hash} = user
            const userId = id.toString()
            bcrypt.compare(password, hash, async (err, result) => {
                if(err){
                    //some error is caused
                    res.status(500).json(err)
                }
                else{
                    if(result){
                        // password matched
                        const privateKey = process.env.HMAC_PRIVATE_KEY
                        options = {
                            expiresIn : '1h'
                        }
                        var token = jwt.sign({ userId}, privateKey, options);
                        user.token = token                          // set token for this user
                        await user.save()
                        // res.cookie("token", token, { httpOnly: true, domain: 'localhost', secure: true })
                        // console.log(res.getHeaders())
                        res.status(200).json({name, result, token})
                    }
                    else{
                        // password didn't match
                        res.status(400).json({result})
                    }
                }
            })
        }
        else{
            // user doesn't exist
            res.status(400).json({'user':user})
        }

    }
    catch(err){
        res.status(500).json({err})
        //console.log(err)
        //res.json(err)
    }

}

exports.logout = async (req, res) => {
    //res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });  
}

exports.deleteAllUsers = async (req, res) => {
    try{
        const response = await User.deleteMany()
        res.status(200).json(response)
    }
    catch(err){
        //res.status(500).json(err)
        res.json(err)
    }
}




