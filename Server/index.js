const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection = require('./Db_connection')
const Notes = require('./Routes/Notes')
const User = require('./Routes/User')
const JWTauth = require('./Middleware/JWTauth')
const model = require('./Schema/User')
const UserSchema = model.User
require('dotenv').config();

//body parser
app.use(express.json());
app.use(cors());
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send("notes app server running...")
})
app.get('/api/autoRedirectToDashboard', JWTauth, async (req, res) => {
    try{
        const userId = req.body.userId
        const user = await UserSchema.findOne({_id:userId})
        res.status(200).json({"username" : user.name})
    }
    catch(err){
        res.status(401).json({err})
    }
})
app.use("/api/notes/", JWTauth, Notes.router);
app.use("/api/user/", User.router);

app.listen(process.env.REACT_APP_PORT, () => {
    console.log("server started")
    connection()
})