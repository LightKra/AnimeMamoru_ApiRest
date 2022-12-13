const {season} = require('../models/season');
const {messageResult, messageResultJson, countRegistration} = require('../libs/functions')
const createSeason = async (req, res) => {
    try{
        const {title,
            description,
            number_Episodes,
            year,
            genres,
            ratings,
            lenguages,
            poster_path,
            landScapePoster_path} = req.body;
            const countSeasons = await season.estimatedDocumentCount();
            const latestSeason = await season.find().sort({"_id": -1}).limit(1);
            if(latestSeason.length == 0) latestSeason.push({"page":0});
            const page = countRegistration(countSeasons, latestSeason.page);
            const newSeason = new season({title, description, number_Episodes, year,
                genres, ratings, lenguages, page, poster_path, landScapePoster_path
                });
            await newSeason.save();
            messageResult(res, 201, "saved Season");
    }catch(error){
        console.log(error);
    }
}
const updateSeasonById = async (req, res)=>{
    try{
        const {title,
            description,
            number_Episodes,
            year,
            genres,
            ratings,
            lenguages,
            poster_path,
            landScapePoster_path} = req.body;
        const _id = req.params.id;
        await season.findByIdAndUpdate(_id,{title, description, number_Episodes, year,
            genres, ratings, lenguages, poster_path, landScapePoster_path});
        messageResult(res, 201, "update Season");
    }catch(error){
        console.log(error);
    }
}
const searchSeasonById = async (req, res)=>{
    try{
        const _id = req.params.search;
        const search = await season.find({_id});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}
const searchSeasonByTitle = async(req, res)=>{
    try{
        const title = req.params.search;
        const search = await season.find({"title": {$regex: title, "$options": "i"}});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}
const searchSeasonByDescription = async (req, res)=>{
    try{
        const description = req.params.search;
        const search = await season.find({"description": {$regex: description, "$option":"i"}});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}
const searchSeasonByRatings = async (req, res)=>{
    try{
        const ratings = req.params.search;
        const search = await season.find({ratings});
        messageResultJson(res,search);
    }catch(error){
        console.log(error);
    }
}
const searchSeasonByYear = async (req, res)=>{
    try{
        const year = req.params.search;
        const search = await season.find({year});
        messageResultJson(res. search);
    }catch(error){
        console.log(error);
    }
}
const searchSeasonAll = async (req, res)=>{
    try{
        const page = req.params.search;
        const searchAll = await season.find({page});
        messageResultJson(res, searchAll);
    }catch(error){
        console.log(error);
    }
}

const deleteSeasonById = async (req, res)=>{
    try{
        const _id = req.params.id;
        await season.findByIdAndDelete(_id);
        messageResult(res, 201, "delete Season id=" + _id);
    }catch(error){
        console.log(error);
    }
}
module.exports = {createSeason, updateSeasonById, searchSeasonById, searchSeasonByTitle, searchSeasonByDescription, searchSeasonByRatings, searchSeasonByYear, searchSeasonAll, deleteSeasonById}