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
const countRegistration = (count, numberPageActual)=>{
    let foundCount = false;
    count = count + 1;
    if(count<20){
        return 1;
    }
    for(let i = 20; i<500000; i = i+20){  
        if(count == i){
            foundCount = true;
            return numberPageActual + 1
        }
    }
    if(!foundCount) return numberPageActual;
}

module.exports = {messageResult, messageResultJson, convertStringToObjectId, countRegistration}