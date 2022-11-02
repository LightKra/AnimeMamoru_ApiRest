const {episode} = require('../models/episode');
const {messageResult, messageResultJson, convertStringToObjectId, countRegistration} = require('../libs/functions');
const createEpisode = async (req, res)=>{
    try{
        const {title,
            chapter_number, 
            description,
            ratings,
            poster_path,
            url_play,
            url_download} = req.body;
        const countEpisodes = await episode.estimatedDocumentCount();
        const latestEpisode = await episode.find().sort({"_id": -1}).limit(1);
        if(latestEpisode.length == 0) latestEpisode.push({"page":0});
        const page = countRegistration(countEpisodes, latestEpisode[0].page);
        const _id = req.params.id;
        const newEpisode = new episode({"season_ref": convertStringToObjectId(_id), title, chapter_number, description, ratings, page,
            poster_path, url_play, url_download});
        await newEpisode.save();
        messageResult(res, 201, "Saved Episode");
    }catch(error){
        console.log(error);
    }
    
}

const updateEpisodeById = async (req, res)=>{
    try{
            const _id = req.params.id;
            const {title,
            chapter_number, 
            description,
            ratings,
            poster_path,
            url_play,
            url_download} = req.body;
        await episode.findByIdAndUpdate(_id,{title, chapter_number, description, ratings,
        poster_path, url_play, url_download});
        messageResult(res, 201, "Update Episode");
    }catch(error){
        console.log(error);
    }
    
}
const searchEpisodeById = async (req, res)=>{
    try{
        const _id = req.params.search;
        const search = await episode.find({_id});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}
const searchEpisodeByTitle = async (req, res)=>{
    try{ 
        const title = req.params.search;
        const search = await episode.find({"title": {$regex: title, "$options": "i" }});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}

const searchEpisodeByDescription = async (req, res)=>{
    try{
        const description = req.params.search;
        const search = await episode.find({"description": {$regex: description, "$options": "i"}});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}

const searchEpisodeByRatings = async (req, res)=>{
    try{
        const ratings = req.params.search;
        const search = await episode.find({ratings});
        messageResultJson(res,search);
    }catch(error){
        console.log(error);
    }
}

const searchEpisodeAll = async (req, res)=>{
    try{
        const page = req.params.search;
        const searchAll = await episode.find({page});
        messageResultJson(res, searchAll);
    }catch(error){
        console.log(error);
    }
}

const deleteEpisodeById = async (req, res)=>{
    try{
        const _id = req.params.id;
        await episode.findByIdAndDelete(_id);
        messageResult(res, 201, "delete Episode Id="+ _id);
    }catch(error){
        console.log(error);
    }
}

module.exports = {createEpisode, updateEpisodeById, searchEpisodeById, searchEpisodeByTitle, searchEpisodeByDescription, searchEpisodeByRatings, searchEpisodeAll, deleteEpisodeById}