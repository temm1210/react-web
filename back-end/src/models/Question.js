const mongoose = require('mongoose');
const { Schema } = mongoose;

const Question = new Schema({
    _id:{
        type    : Number,
        unique  : true,
        required: true
    },
    username:{
        type    : String,
        required: true
    },
    boardField:{
        type    : String,
        required: true
    },
    title: {
        type    : String,
        required: true
    },
    content: {
        type    : String,
        required: true
    },
    writeDate: {
        type    : Date,
        default : Date.now()
    },
    views: {
        type    : Number,
        default : 0
    }
})


module.exports = mongoose.model('Question', Question);
