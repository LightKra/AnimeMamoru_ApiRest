const {role} = require('../models/role');
const {user} = require('../models/user');
const createRoles = async ()=>{
    try{
        const count = await role.estimatedDocumentCount();
        if(count>0) return;
        const values = await Promise.all([
            new role({"name": "user"}).save(),
            new role({"name": "moderator"}).save(),
            new role({"name": "admin"}).save(),
            new role({"name": "root"}).save()        
    ]);
        console.log(values);
    }catch(e){
        console.log(e);
    }
}
const createDefaultRoot = async ()=>{
    try{
        const result = await user.find({"user_name": "root"});
        const resultSize = Object.keys(result).length;
        if(resultSize>0){
            console.log("user root already exist");
        }else{
            const roles = await role.find({"name": {$in: ["user", "moderator", "admin", "root"]}});
            let newRoles = [];
            roles.forEach((role) => {newRoles.push(role._id)});
            const userRoot = {
                "user_name": "root",
                "email": "root@root.com",
                "password": await user.encryptPassword("root123456789&"),
                "roles": newRoles
            }
            const newUser = new user(userRoot);
            await newUser.save();
            console.log(newUser);
        }   
    }catch(e){
        console.log(e);
    }   
}

module.exports = {createRoles, createDefaultRoot}