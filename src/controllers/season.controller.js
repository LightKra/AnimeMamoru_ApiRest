const {season} = require('../models/season');
const {messageResult, messageResultJson} = require('../libs/functions')
const createSeason = async (req, res) => {
    const {title,
    description,
    number_Episodes,
    date,
    genres,
    ratings,
    lenguages,
    poster_path} = req.body;
    const newSeason = new season({title, description, number_Episodes, date,
        genres, ratings, lenguages, poster_path
        });
    await newSeason.save();
    messageResult(res, 201, "saved Season");
}
const updateSeasonById = async (req, res)=>{
    const {title,
        description,
        number_episodes,
        date,
        genres,
        ratings,
        lenguages,
        poster_path} = req.body;
    const _id = req.params.id;
    await season.findByIdAndUpdate(_id,{title, description, number_episodes, 
        date, genres, ratings,lenguages, poster_path});
    messageResult(res, 201, "update Season");
}
const searchSeasonById = async (req, res)=>{
    const _id = req.params.id;
    const search = await season.find({_id});
    messageResultJson(res, search);
}
const searchSeasonAll = async (req, res)=>{
    const searchAll = await season.find({});
    messageResultJson(res, searchAll);
}

const deleteSeasonById = async (req, res)=>{
    const _id = req.params.id;
    await season.findByIdAndDelete(_id);
    messageResult(res, 201, "delete Season id=" + _id);
}
module.exports = {createSeason, updateSeasonById, searchSeasonById, searchSeasonAll, deleteSeasonById}