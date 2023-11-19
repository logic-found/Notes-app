const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection = require('./Db_connection')
const Notes = require('./Routes/Notes')
const User = require('./Routes/User')
const JWTauth = require('./Middleware/JWTauth')
const UserSchema = require('./Schema/User').User
const NotesSchema = require('./Schema/Notes').Notes
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
app.get('/api/dummy1', (req, res) => {
    res.json("success")
})
app.get('/api/dummy2', async(req, res) => {
    const note = await NotesSchema.findOne({_id : '6558a29009ddbeaac6faffb6'})
    console.log(note)
    res.json(note)
})

app.use("/api/notes/", JWTauth, Notes.router);
app.use("/api/user/", User.router);

app.listen(process.env.REACT_APP_PORT, () => {
    console.log("server started")
    connection()
})