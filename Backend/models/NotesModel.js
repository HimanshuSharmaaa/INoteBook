const mongoose = require('mongoose');
const {Schema} = mongoose;
const NotesSchema = new Schema({
    user : {
        // mapping the user with there notes with the id
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title : {
        type : String,
        require : true,
        unique : true
    },
    description : {
        type : String,
        require : true
    },
    tag : {
        type : String,
        default : "General"
    },
    date : {
        type : Date,
        default : Date.now
    }
})
module.exports = mongoose.model("NotesDataBase" , NotesSchema);