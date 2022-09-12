const https = require('https');
const {messageResult} = require('../libs/functions');
const {season} = require('../models/season');
const validationTitle = (req, res, next)=>{
    const title = req.body.title;
    const sizeTitle = title ? title.length : 0;
    if(sizeTitle>1){
        next();
    }else{
        return messageResult(res, 200, 'invalid title');
    }
}
const validationDescription = (req, res, next)=>{
    const description = req.body.description;
    const sizeDescription = description ? description.length : 0;
    if(sizeDescription>10){
        next();
    }else{
        return messageResult(res, 200, 'invalid description');
    }
}
const validationRatings = (req, res, next)=>{
    const ratings = req.body.ratings;
    if(ratings>=0){
        next();
    }else{
        return messageResult(res, 200, 'invalid ratings');
    }
}
const validationPosterPath = (req, res, next)=>{
    const poster_path = req.body.poster_path;
    if(checkValidUrl(poster_path)){
        next();
    }else{
        return messageResult(res, 200, 'invalid poster path');
    }
}
const validateUrlJsonDownload = (req, res, next)=>{
    let stateJson = true;
    const urlJson = req.body.url_download;
    Object.keys(urlJson).forEach(key=>{
        if(!checkValidUrl(urlJson[key])) stateJson = false;
    });
    if(stateJson){
        next();
    }else{
     messageResult(res, 201, 'invalid download url');
    }
}
const validateUrlJsonPlay = (req, res, next)=>{
    let stateJson = true;
    const urlJson = req.body.url_play;
    Object.keys(urlJson).forEach(key=>{
        if(!checkValidUrl(urlJson[key])) stateJson = false;
    });
    if(stateJson){
        next();
    }else{
     messageResult(res, 201, 'invalid download url');
    }
}

const checkTitleDuplicate = async (req, res, next)=>{
    const title = req.body.title;
    const seasonResult = await season.find({title});
    const size = Object.keys(seasonResult).length;
    if(size>0){
        messageResult(res, 201, "season already exists");
    }else{
        next();
    }
}

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

module.exports = {validationTitle, validationDescription, validationRatings, validationPosterPath, checkValidUrl, validateUrlJsonDownload, validateUrlJsonPlay, checkTitleDuplicate}