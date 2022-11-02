const {user} = require('../models/user');
const {role} = require('../models/role');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {messageResult, messageResultJson} = require('../libs/functions');
const createUser = async (req, res)=>{
    try{
        let {user_name, email, password, roles} = req.body;
        const newUser = new user({
            user_name,
            email,
            "password": await user.encryptPassword(password),
            roles
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({"id": savedUser._id},config.SECRET,{
            expiresIn: 84600
        });
        console.log("saved user");
        res.json(token);
    }catch(error){
        console.log(error);
    }
}
const signin = async (req, res) => {
    try{
        const userFound = await user.findOne({"user_name": req.body.user_name});
        const userSize = Object.keys(userFound).length;
        if(userSize==0) return messageResult(res, 201, 'invalid user data');
        const matchPassword = await user.comparePassword(req.body.password, userFound.password);
        if(!matchPassword) return messageResult(res, 201, 'invalid user data');
        const token =  jwt.sign({"id": userFound._id},config.SECRET,{
            expiresIn: 84600
        });
        console.log("logging in");
        res.json(token);
    }catch(error){
        console.log(error);
    }
}
const logout = async (req, res)=>{
    try{
        res.json("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
        console.log('closed session');
    }catch(error){
        console.log(error);
    }
}
const updateUserById = async (req, res) =>{
    try{
        const {user_name, email, password} = req.body;
        const _id = req.params.id;
        await user.findByIdAndUpdate(_id,{
            user_name,
            email,
            "password": await user.encryptPassword(password)
        });
        return messageResult(res, 201, 'update user');
    }catch(error){
        console.log(error);
    }
}

const searchUserById = async (req, res)=>{
    try{
        const _id = req.params.id;
        const searchUser = await user.findByIdAndUpdate({_id});
        messageResultJson(res, searchUser);
    }catch(error){
        console.log(error);
    }
}

const searchUserAll =async (req, res) =>{
    try{
        const searchAll = await user.find({});
        messageResultJson(res, searchAll);
    }catch(error){
        console.log(error);
    }
}

const deleteUserById = async (req, res)=>{
    try{
        const _id = req.params.id;
        await user.findByIdAndDelete({_id});
        messageResult(res, 201, 'user deleted');
    }catch(error){
        console.log(error);
    }
}
//options root
const updateUserByIdForRoot = async (req, res) =>{
    try{
        const {user_name, email, password, roles} = req.body;
        const _id = req.params.id
        await user.findByIdAndUpdate(_id,{
            user_name,
            email,
            "password": await user.encryptPassword(password),
            roles
        });
        return messageResult(res, 201, 'update user');
    }catch(error){
        console.log(error);
    }
    
}
const bannedUserByIdForAdminModeratorRoot = async (req, res)=>{
    try{
        const _id = req.params._id;
        await user.findByIdAndUpdate(_id,{"enable": false});
        messageResult(res, 201, 'banned user');
    }catch(error){
        console.log(error);
    }
}

const warnUserByIdForAdminModeratorRoot = async (req, res)=>{
    try{
        const _id = req.params._id;
        let warns = await user.find({_id}).warn;
        if(warns=>0 && warns <=3){
            warns++;
            await user.findByIdAndUpdate(_id,{"warn": warns});
            messageResult(res, 201, `warns = ${warns}`);
        }else{
            await user.findByIdAndUpdate(_id,{"enable": false});
            messageResult(res, 201, 'banned user');
        }
    }catch(error){
        console.log(error);
    }
}
const removeWarningsAndEnableUserByIdForAdminModeratorRoot = async (req, res)=>{
    try{
        const _id = req.params._id;
        await user.findByIdAndUpdate(_id,{"warn": 0, "enable": false});
        messageResult(res, 201, 'warning and ban removed');
    }catch(error){
        console.log(error);
    }
}
module.exports = {createUser, updateUserById, searchUserById, searchUserAll, deleteUserById, bannedUserByIdForAdminModeratorRoot, warnUserByIdForAdminModeratorRoot, removeWarningsAndEnableUserByIdForAdminModeratorRoot, updateUserByIdForRoot, signin, logout}