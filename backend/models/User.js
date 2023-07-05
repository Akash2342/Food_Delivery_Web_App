const mongoose = require('mongoose')

// this is called destructuring in javascript
const {Schema} = mongoose;

//schema is created here
const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

//this schema is exported
module.exports=mongoose.model('user',UserSchema)
