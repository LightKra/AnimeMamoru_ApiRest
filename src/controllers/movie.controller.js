const {movie} = require('../models/movie');
const {messageResult, messageResultJson, countRegistration} = require('../libs/functions');
const createMovie = async (req, res)=>{
    try{
        const {
            title,
            description,
            year,
            genres,
            ratings,
            lenguages,
            poster_path,
            landScapePoster_path,
            url_play,
            url_download} = req.body;
        const countMovies = await movie.estimatedDocumentCount();
        const latestMovie = await movie.find().sort({"_id": -1}).limit(1);
        if(latestMovie.length==0) latestMovie.push({"page": 0});
        const page = countRegistration(countMovies, latestMovie.page);
        const newMovie = new movie({title, description, year, genres, ratings, lenguages, page,
            poster_path, landScapePoster_path, url_play, url_download});
        await newMovie.save();
        messageResult(res, 201, 'saved movie');
    }catch(error){
        console.log(error);
    }
}

const updateMovieById = async (req, res)=>{
    try{
        const _id = req.params.id;
        const {
            title,
            description,
            year,
            genres,
            ratings,
            lenguages,
            poster_path,
            landScapePoster_path,
            url_play,
            url_download} = req.body;
        await movie.findByIdAndUpdate(_id,{title, description, year, genres, ratings, lenguages,
            poster_path, landScapePoster_path, url_play, url_download});
    messageResult(res, 201, "update Movie");
    }catch(error){
        console.log(error);
    }
}

const searchMovieById = async (req, res)=>{
    try{
        const _id = req.params.search;
        const search = await movie.find({_id});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}
const searchMovieByTitle = async (req, res)=>{
    try{
        const title = req.params.search;
        const search = await movie.find({"title": {$regex: title, "$options": "i"}});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}
const searchMovieByDescription = async (req, res)=>{
    try{
        const description = req.params.search;
        const search = await movie.find({"description": {$regex: description, "$options": "i"}});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}

const searchMovieByRatings = async (req, res)=>{
    try{
        const ratings = req.params.search;
        const search = await movie.find({ratings});
        messageResultJson(res,search);
    }catch(error){
        console.log(error);
    }
}
const searchMovieByYear = async (req, res) => {
    try{
        const year = req.params.search;
        const search = await movie.find({year});
        messageResultJson(res, search);
    }catch(error){
        console.log(error);
    }
}
const searchMovieAll = async (req, res)=>{
    try{
        const page = req.params.search;
        const searchAll = await movie.find({page});
        messageResultJson(res, searchAll);
    }catch(error){
        console.log(error);
    }
}

const deleteMovieById = async (req, res)=>{
    try{
        const _id = req.params.id;
        await movie.findByIdAndDelete({_id});
        messageResult(res, 201, "detele movie Id: "+ _id);
    }catch(error){
        console.log(error);
    }
}
module.exports = {createMovie, updateMovieById, searchMovieById, searchMovieByTitle, searchMovieByDescription, searchMovieByRatings, searchMovieByYear, searchMovieAll, deleteMovieById}