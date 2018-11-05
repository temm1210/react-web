const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const Member = new Schema({
    username :{
        type     : String,
        required : true,
        index    : true,
        unique   : true
    },
    password :{
        type     : String,
        required : true
    },
    email    :{
        type     : String,
        required : true,
        unique   : true,
    },
    gender   :{
        type     : String,
        require  : true
    },
    joinDate :{
        type     : Date,
        default  : Date.now()
    }
})

Member.pre('save', function(next) {
    const user = this;

    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err,salt) => {
            if(err) throw new Error('getSalt Error Invoke');
            bcrypt.hash(user.password, salt, null, function(err, hashPassword) {
                if(err) return err;
                else {
                    user.password = hashPassword;
                    next();
                }
            })
        })
    } else {
        return next();
    }
})

Member.method('comparePassword', function(pwd, callback) {
    bcrypt.compare(pwd, this.password, function(err, result) {
        if(err) return callback(err);
        else callback(null, result)
    })
})

module.exports = mongoose.model('Member', Member);