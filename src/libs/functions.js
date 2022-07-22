const https = require('https');
const messageResult = (res, code, message)=>{
    console.log({"message": message});
    return res.status(code).json({"message": message});
}
const messageResultJson = (res, result)=>{
    console.log({"message": "success"});
    return res.json(result);
}

const checkValidUrl = (url)=>{
    let stateUrl = false;
    const regexpression = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regexpression.test(url)){
        if(validateWebPageResponse(url)) stateUrl = true;
    }
    return stateUrl;
}
const validateWebPageResponse = async (url)=>{
    if(await https.get(url, res=>{}).on('error',e=> console.error(e))){
        return true;
    }else{
        return false;
    }
}
const validateUrlJson = (urlJson)=>{
    let newJson = {};
    if (!urlJson) return {};
    Object.keys(urlJson).forEach(key=>{
        let stateUrl = checkValidUrl(urlJson[key]);
        if(!stateUrl) urlJson[key] = '';
        newJson[key] = urlJson[key];
    });
    return newJson;
}
module.exports = {messageResult, messageResultJson, checkValidUrl, validateUrlJson}