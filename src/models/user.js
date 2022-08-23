const mongooseSchema = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongooseSchema.Schema({
    "user_name":{
        "type": String,
        "unique": true
    },
    "email":{
        "type": String,
        "unique": true
    },
    "password":{
        "type": String,
        "required": true
    }, 
    "roles": [{
        "ref": "role",
        "type": mongooseSchema.Schema.Types.ObjectId
    }],
    "warn": {
        "type": Number,
        "default": 0
    },
    "enable":{
        "type": Boolean,
        "default": true
    }
},{
    "timestamps": true,
    "versionkey": false
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
userSchema.statics.comparePassword = async (password, recevedPassword) => {
    return await bcrypt.compare(password, recevedPassword)
}
const user = mongooseSchema.model("user",userSchema);
module.exports = {user}