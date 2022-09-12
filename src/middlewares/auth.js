const {role} = require('../models/role');
const {user} = require('../models/user');
const {messageResult} = require('../libs/functions');
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers["x-access-token"];
        if(!token) return messageResult(res, 200, 'invalid token');
        const decode = jwt.verify(token, config.SECRET);
        req.userId = decode.id;
        const result = await user.findById(decode.id, {"password": 0});
        if(!result) return messageResult(res, 200, 'No user found');
        next();
    }catch(err){
        console.log(err);
    }
}
const isRolUser = (req, res, next)=>{
    checkValidRol("user", req, res, next);
}
const isRolAdmin = (req, res, next)=>{
    checkValidRol("admin", req, res, next);
}
const isRolRoot = (req, res, next)=>{
    checkValidRol("root", req, res, next);
}
const isRolModerator = (req, res, next)=>{
    checkValidRol("moderator", req, res, next);
}
//sin exportar
const checkValidRol = async (userRol, req, res, next)=>{
    let stateRoles = false;
    const resultUser = await user.findById({"_id": req.userId});
    if(!resultUser) return messageResult(res, 200, 'invalid data user');
    const roles = resultUser.roles;
    if(!roles) return messageResult(res, 200, 'invalid roles');
    const codeRole = await role.find({"name": userRol});
    
    if(roles.length > 0){
        roles.forEach(item=>{
            if(item.toString()==codeRole[0]._id){
                stateRoles = true;
            } 
        });
    }
    if(stateRoles){
        next();
    }else{
        return messageResult(res, 200, 'invalid roles');
    }
}

module.exports = {isRolUser, isRolAdmin, isRolRoot, isRolModerator, verifyToken}