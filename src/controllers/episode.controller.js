const {episode} = require('../models/episode');
const {messageResult, messageResultJson, convertStringToObjectId} = require('../libs/functions');
const createEpisode = async (req, res)=>{
    const {title, 
            description,
            ratings,
            poster_path,
            url_play,
            url_download} = req.body;
    const _id = req.params.id;
    const result = episode.find({title});
    const size = Object.keys(result).length;
    if(size>0){
         messageResult(res, 201, "Episode already exists");
    }else{
        const newEpisode = new episode({"season_ref": convertStringToObjectId(_id), title, description, ratings,
        poster_path, url_play, url_download});
        await newEpisode.save();
        messageResult(res, 201, "Saved Episode");
    }
}

const updateEpisodeById = async (req, res)=>{
    const _id = req.params.id;
    const {title, 
        description,
        ratings,
        poster_path,
        url_play,
        url_download} = req.body;
    await episode.findByIdAndUpdate(_id,{title, description, ratings,
    "poster_path": new_PosterPath, "url_play": new_UrlPlay, "url_download": new_UrlDownload});
    messageResult(res, 201, "Update Episode");
    
}
const searchEpisodeById = async (req, res)=>{
    const _id = req.params.id;
    const search = await episode.find({_id});
    messageResultJson(res, search);
}

const searchEpisodeAll = async (req, res)=>{
    const searchAll = await episode.find({});
    messageResultJson(res, searchAll);
}

const deleteEpisodeById = async (req, res)=>{
    const _id = req.params.id;
    await episode.findByIdAndDelete(_id);
    messageResult(res, 201, "delete Episode Id="+ _id);
}

module.exports = {createEpisode, updateEpisodeById, searchEpisodeById, searchEpisodeAll, deleteEpisodeById}