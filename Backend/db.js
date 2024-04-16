const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";
const connectToMongo = () => {
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to Mongo successfully.");
    }).catch((e)=>{
        console.log("Error Occur IN CONNECTING TO MONGODB: " + e);
    })
}
module.exports = connectToMongo;