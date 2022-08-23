const https = require('https');
const {messageResult} = require('../libs/functions');
const validationOfEmptyVariablesJson = (req, res, next)=>{
    const json = req.body;
    let count = 0;
    let variableName = [];
    Object.keys(json).forEach(key =>{
        const data = json[key];  
        if(typeof(data) == "string"){
            if(data==""){
                count++;
                variableName.push(key);
            } 
        }
        if(typeof(data) == "number"){
            if(data<0){
                count++;
                variableName.push(key); 
            }
        };
        if(key == "poster_path"){
            checkValidUrl(data) ? '' : count++;
        }
        if(typeof(data)=="undefined" || typeof(data)=="null") count++;
        if(Array.isArray(data)){
            if(data.length==0){
                count++;
                variableName.push(key);
            };
        }
        if(count>0)return;
        Object.keys(data).forEach(item=>{
            if(data[item]==""){
                count++;
            }
            if(!checkValidUrl(data[item])){
                count++;
            }
        });
        if(count>0) variableName.push("url_play and url_download");
    });
    
    if(count>0){
        messageResult(res, 201, `empty variables = ${variableName}`);
    }else{
        //indica que esta lleno
        next();
    }
}

const checkValidEmail = (req, res, next) => {
    const email = req.body.email;
    const regexpression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regexpression.test(email)){
       next();
    }
    messageResult(res, 200, 'invalid email');
}

const checkValidPassword = (req, res, next) =>{
    const password = req.body.password;
    const regexpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(regexpression.test(password)) next();
    return messageResult(res, 200, 'invalid password');
}
//test
/*const validateUrlJson = (urlJson)=>{
    let newJson = {};
    Object.keys(urlJson).forEach(key=>{
        let stateUrl = checkValidUrl(urlJson[key]);
        if(!stateUrl) urlJson[key] = '';
        newJson[key] = urlJson[key];
    });
    return newJson;
}
*/

//funciones no exportadas
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

module.exports = {validationOfEmptyVariablesJson, checkValidEmail, checkValidUrl, checkValidPassword}