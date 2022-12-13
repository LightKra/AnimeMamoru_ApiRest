const {user} = require('../models/user');
const {role} = require('../models/role');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {messageResult, messageResultJson, countRegistration} = require('../libs/functions');
const createUser = async (req, res)=>{
    try{
        let {user_name, email, password, roles} = req.body;
        const countUsers = await user.estimatedDocumentCount();
        const latestUser = await user.find().sort({"_id": -1}).limit(1);
        if(latestUser.length==0) latestUser.push({"page": 0});
        const page = countRegistration(countUsers, latestUser.page);
        const newUser = new user({
            user_name,
            email,
            "password": await user.encryptPassword(password),
            roles,
            page
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
const deleteUserById = async (req, res)=>{
    try{
        const _id = req.params.id;
        const userRoot = await user.find({_id});
        const rolRoot = await role.find({"name": "root"});
        let state = false;
        userRoot[0].roles.forEach(rol=>{
            if(rol.toString() === rolRoot[0]._id.toString()){
                state = true;
            }
        });
        if(state){
            messageResult(res, 201, 'Root account cannot be deleted');
        }else{
            await user.findByIdAndDelete({_id});
            messageResult(res, 201, 'user deleted');
        }

    }catch(error){
        console.log(error);
    }
}
//options root
const searchUserByIdForAdminModeratorRoot = async (req, res)=>{
    try{
        const _id = req.params.id;
        const searchUser = await user.find({_id});
        messageResultJson(res, searchUser);
    }catch(error){
        console.log(error);
    }
}
const searchUserAllForAdminModeratorRoot =async (req, res) =>{
    try{
        const page = req.params.page;
        const searchAll = await user.find({page});
        messageResultJson(res, searchAll);
    }catch(error){
        console.log(error);
    }
}
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
const bannedUserByIdForAdminRoot = async (req, res)=>{
    try{
        const _id = req.params.id;
        await user.findByIdAndUpdate(_id,{"enable": false});
        messageResult(res, 201, 'banned user');
    }catch(error){
        console.log(error);
    }
}

const warnUserByIdForAdminModeratorRoot = async (req, res)=>{
    try{
        const _id = req.params.id;
        let resultUser = await user.find({_id});
        let warns = resultUser[0].warn;
        if(warns>=0 && warns <=3){
            warns++;
            await user.findByIdAndUpdate(_id,{"warn": warns});
            messageResult(res, 201, `warns = ${warns}`);
        }else{
            await user.findByIdAndUpdate(_id,{"warn": 0,"enable": false});
            messageResult(res, 201, 'banned user');
        }
    }catch(error){
        console.log(error);
    }
}
const removeWarningsAndEnableUserByIdForAdminModeratorRoot = async (req, res)=>{
    try{
        const _id = req.params.id;
        await user.findByIdAndUpdate(_id,{"warn": 0, "enable": true});
        messageResult(res, 201, 'warning and ban removed');
    }catch(error){
        console.log(error);
    }
}
module.exports = {createUser, updateUserById, searchUserByIdForAdminModeratorRoot, searchUserAllForAdminModeratorRoot, deleteUserById, bannedUserByIdForAdminRoot, warnUserByIdForAdminModeratorRoot, removeWarningsAndEnableUserByIdForAdminModeratorRoot, updateUserByIdForRoot, signin, logout}