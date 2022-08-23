const mongooseF= require('mongoose');
const messageResult = (res, code, message)=>{
    console.log({"message": message});
    return res.status(code).json({"message": message});
}
const messageResultJson = (res, result)=>{
    console.log({"message": "success"});
    return res.json(result);
}

const convertStringToObjectId = (str)=>{
    const newObjectId = new mongooseF.mongo.ObjectId(str);
    return newObjectId;
}


module.exports = {messageResult, messageResultJson, convertStringToObjectId}