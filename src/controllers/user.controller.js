const {user} = require('../models/user');
const {role} = require('../models/role');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {messageResult, messageResultJson} = require('../libs/functions');
const createUser = async (req, res)=>{
    let {user_name, email, password, roles} = req.body;
    let newRoles;
    if(roles.length > 0){
        const resultRoles = await role.find({"name": {$in: roles}});
        newRoles = resultRoles.map(roleItem=> roleItem._id);
    }else{
        const resultRoles = await role.find({"name": "user"});
        newRoles = resultRoles._id;
    }
    const newUser = new user({
        user_name,
        email,
        "password": await user.encryptPassword(password),
        "roles": newRoles
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({"id": savedUser._id},config.SECRET,{
        expiresIn: 84600
    });
    console.log("saved user");
    res.json(token);
}
const signin = async (req, res) => {
    const userFound = await user.findOne({"user_name": req.body.user_name});
    const userSize = Object.keys(userFound).length;
    if(userSize==0) return messageResult(res, 201, 'invalid user data');
    const matchPassword = await user.comparePassword(req.body.password, userFound.password);
    if(!matchPassword) return messageResult(res, 201, 'invalid user data');
    const token = jwt.sign({"id": userFound._id},config.SECRET,{
        expiresIn: 84600
    });
    console.log("logging in");
    res.json(token);
}
const logout = async (req, res)=>{
    const token = jwt.sign({"id": "empty"}, config.SECRET,{
        expiresIn: 84600
    });
    console.log('closed session');
    res.json(token);
}
const updateUserById = async (req, res) =>{
    let {user_name, email, password, roles} = req.body;
    const _id = req.params.id;
    let newRole;
    if(roles.length > 0){
        const resultRoles = await role.find({"name": {$in: roles}});
        newRole = resultRoles.map(roleItem => roleItem._id);
    }
    await user.findByIdAndUpdate(_id,{
        user_name,
        email,
        "password": await user.encryptPassword(password),
        "roles": newRole
    });
    return messageResult(res, 201, 'update user');
    
}

const searchUserById = async (req, res)=>{
    const _id = req.params.id;
    const searchUser = await user.findByIdAndUpdate({_id});
    messageResultJson(res, searchUser);
}

const searchUserAll =async (req, res) =>{
    const searchAll = await user.find({});
    messageResultJson(res, searchAll);
}

const deleteUserById = async (req, res)=>{
    const _id = req.params.id;
    await user.findByIdAndDelete({_id});
    messageResult(res, 201, 'user deleted');
}
//admins root moderator
const updateUserByIdForRoot = async (req, res) =>{
    let {_id, user_name, email, password, roles} = req.body;
    await user.findByIdAndUpdate(_id,{
        user_name,
        email,
        "password": await user.encryptPassword(password),
        roles
    });
    return messageResult(res, 201, 'update user');
    
}
const bannedUserByIdForAdminModeratorRoot = async (req, res)=>{
    const _id = req.body._id;
    await user.findByIdAndUpdate(_id,{"enable": false});
    messageResult(res, 201, 'banned user');
}

const warnUserByIdForAdminModeratorRoot = async (req, res)=>{
    const _id = req.body._id;
    let warns = await user.find({_id}).warn;
    if(warns=>0 && warns <=3){
        warns++;
        await user.findByIdAndUpdate(_id,{"warn": warns});
        messageResult(res, 201, `warns = ${warns}`);
    }else{
        await user.findByIdAndUpdate(_id,{"enable": false});
        messageResult(res, 201, 'banned user');
    }
}
const removeWarningsAndEnableUserByIdForAdminModeratorRoot = async (req, res)=>{
    const _id = req.body._id;
    await user.findByIdAndUpdate(_id,{"warn": 0, "enable": false});
    messageResult(res, 201, 'warning and ban removed');
}
module.exports = {createUser, updateUserById, searchUserById, searchUserAll, deleteUserById, bannedUserByIdForAdminModeratorRoot, warnUserByIdForAdminModeratorRoot, removeWarningsAndEnableUserByIdForAdminModeratorRoot, updateUserByIdForRoot, signin, logout}