const https = require('https');
const {messageResult} = require('../libs/functions');
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
const validationlandScapePosterPath = async (req, res, next)=>{
    const landScapePoster_path = req.body.landScapePoster_path;
    if(checkValidUrl(landScapePoster_path)){
        next();
    }else{
        return messageResult(res, 200, 'invalid land Scape Poster path');
    }
}
const validationYear = async (req, res, next) =>{
    const year = parseInt(req.body.year);
    if(year > 1917){
        next();
    }else{
        return messageResult(res, 200, 'invalid year')
    }
}
const validationGenres = async (req, res, next)=>{
    const arrayGenres = ["shounen","shoujo","seinen","josei","kodomo","shoujo-ai","yuri","bishoujo","moe","yaoi","bishounen","kemono","mecha","ecchi","gender-bender","hentai","gore","slice-of-life","aniparo","escolar","harem","deportes","isekai","reencarnación","súperpoderes","misterio","psicológico","drama","romance"];
    const reqGenres = req.body.genres;
    let countGenres = 0;
    const sizeReqGenres = reqGenres.length;
    if(sizeReqGenres > 0 && sizeReqGenres < 6){
        reqGenres.forEach(genre =>{
            arrayGenres.forEach(x=>{
                if(x.toLowerCase() == genre.toLowerCase()){
                    countGenres++;
                }       
            });
        });
    countGenres == sizeReqGenres ? next() : messageResult(res, 200, 'invalid genres');
    }else{
        return messageResult(res, 200, 'invalid genres');
    }
}
const validationLenguages = async (req, res, next)=>{
    const arrayLenguages = ["es","spa","en","eng"];
    const reqLenguages = req.body.lenguages;
    const sizeReqLenguages = reqLenguages.length;
    let countLenguages = 0;
    if(sizeReqLenguages > 0 && sizeReqLenguages < 6){
        reqLenguages.forEach(lenguage =>{
            arrayLenguages.forEach(x =>{
                if(x.toLowerCase() == lenguage.toLowerCase()){
                    countLenguages++;
                }
            });
        });
    countLenguages == sizeReqLenguages ? next() : messageResult(res, 200, 'invalid lenguages');
    }else{
        return messageResult(res, 200, 'invalid lenguages');
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

module.exports = {validationTitle, validationDescription, validationRatings, validationPosterPath, validationlandScapePosterPath, validationYear, validationGenres, validationLenguages, checkValidUrl, validateUrlJsonDownload, validateUrlJsonPlay}