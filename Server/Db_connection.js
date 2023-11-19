const mongoose = require('mongoose')

// connect to DB
const connection = async () => {
    try{
        const reponse = await mongoose.connect(process.env.DB_URL)
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connection