const {user} = require('../models/user');
const {role} = require('../models/role');
const {messageResult, messageResultJson} = require('../libs/functions');
const createUser = async (req, res)=>{
    let {user_name, email, password, roles} = req.body;
    let newRoles;
    const sizeEmail = Object.keys(await user.find({email})).length;
    const sizeUser = Object.keys(await user.find({user_name})).length;
    if(sizeEmail > 0){
        return messageResult(res, 201, "email already exists");
    }
    if(sizeUser > 0){
        return messageResult(res, 201, "user already exists");
    }
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
    await newUser.save();
    messageResult(res, 201, "saved user");
    
}

const updateUser = async (req, res) =>{
    let {user_name, email, password, roles} = req.body;
    const _id = req.params.id;
    let newRole;
    
    const resultUser = await user.findOne({_id});
    if(resultUser.user_name != user_name){
        const sizeUser = Object.keys(await user.find({user_name}));
        if(sizeUser>0){
            return messageResult(res, 201, 'user already exists');
        }
    }
    if(resultUser.email != email){  
        const sizeEmail = Object.keys(await user.find({email}));
        if(sizeEmail>0){
            return messageResult(res, 201, 'email already exists');
        }
    }
    if(roles.length > 0){
        const resultRoles = await role.find({"name": {$in: roles}});
        newRole = resultRoles.map(roleItem => roleItem._id);
    }
    await user.findByIdAndUpdate(_id,{
        user_name,
        email,
        password,
        "roles": newRole
    });
    return messageResult(res, 201, 'update user');
    
}

const searchUser = async (req, res)=>{

}

const searchAll =async (req, res) =>{

}

const deleteUser = async (req, res)=>{

}

const bannedUser = async (req, res)=>{

}

module.exports = {createUser, updateUser, searchUser, searchAll, deleteUser, bannedUser}