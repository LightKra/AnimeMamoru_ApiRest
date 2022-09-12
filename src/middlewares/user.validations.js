const {messageResult} = require('../libs/functions');
const {user} = require('../models/user');

const validationUser = (req, res, next)=>{
    const user = req.body.user_name;
    const sizeUser = user ? user.length : 0;
    if(sizeUser > 3){
        next();
    }else{
        return messageResult(res, 200, 'invalid user');
    }
}
const checkValidRolUser =(req, res, next) =>{
    const rol = req.body.roles;
    let stateRol = false;
    if(!rol) return messageResult(res, 201, 'invalid rol');
    if(rol.length > 0 && rol.length < 2){
        rol[0]=="user" ? stateRol = true :  '';
    }else{
        return messageResult(res, 201, 'invalid rol');
    }
    if(stateRol){
        next();
    }else{
        return messageResult(res, 201, 'invalid rol');
    }
}
const checkValidEmail = (req, res, next) =>{
    const email = req.body.email;
    const regexpression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regexpression.test(email)){
       next();
    }else{
        return messageResult(res, 200, 'invalid email');
    }
    
}
const checkUserDuplicatePut = async (req, res ,next) => {
    const _id = req.params.id;
    const user_name = req.body.user_name;
    const email = req.body.email;
    const resultUser = await user.findOne({_id});
    if(resultUser.user_name != user_name){
        const sizeUser = Object.keys(await user.find({user_name})).length;
        if(sizeUser>0){
            return messageResult(res, 201, 'user already exists');
        }else{
            next();
        }
    }else if(resultUser.email != email){  
        const sizeEmail = Object.keys(await user.find({email})).length;
        if(sizeEmail>0){
            return messageResult(res, 201, 'email already exists');
        }else{
            next();
        }
    }else{
        next();
    }
}
const checkUserDuplicatePutForRoot = async (req, res ,next) => {
    const _id = req.body._id;
    const user_name = req.body.user_name;
    const email = req.body.email;
    const resultUser = await user.findOne({_id});
    if(resultUser.user_name != user_name){
        const sizeUser = Object.keys(await user.find({user_name})).length;
        if(sizeUser>0){
            return messageResult(res, 201, 'user already exists');
        }else{
            next();
        }
    }else if(resultUser.email != email){  
        const sizeEmail = Object.keys(await user.find({email})).length;
        if(sizeEmail>0){
            return messageResult(res, 201, 'email already exists');
        }else{
            next();
        }
    }else{
        next();
    }
}
const checkUserDuplicate = async (req, res, next) =>{
    const email = req.body.email;
    const user_name = req.body.user_name;
    const sizeEmail = Object.keys(await user.find({email})).length;
    const sizeUser = Object.keys(await user.find({user_name})).length;
    if(sizeEmail > 0){
        return messageResult(res, 201, "email already exists");
    }else if(sizeUser > 0){
        return messageResult(res, 201, "user already exists");
    }else{
        next();
    }
}

const checkValidPassword = (req, res, next) =>{
    const password = req.body.password;
    const regexpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(regexpression.test(password)){
        next()
    }else{
        return messageResult(res, 200, 'invalid password');
    }
}


module.exports = {checkValidEmail, checkValidPassword, checkValidRolUser, validationUser, checkUserDuplicate, checkUserDuplicatePut, checkUserDuplicatePutForRoot}