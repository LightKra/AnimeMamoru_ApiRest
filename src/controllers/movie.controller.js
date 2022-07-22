const {movie} = require('../models/movie');
const {messageResult, messageResultJson, validateUrlJson} = require('../libs/functions');
const createMovie = async (req, res)=>{
    const {
        title,
        description,
        ratings,
        poster_path,
        url_play,
        url_download} = req.body;
    let newUrl_play = validateUrlJson(url_play);
    let newUrl_download = validateUrlJson(url_download);
    const result = await movie.find({title});
    const size = Object.keys(result).length;
    if(size>0){
        messageResult(res, 201, 'movie already exists');
    }else{
        const newMovie = await new movie({title, description, ratings,
            poster_path, "url_play":newUrl_play, "url_download": newUrl_download});
        newMovie.save();
        messageResult(res, 201, 'saved movie');
    }
}

const updateMovieById = async (req, res)=>{
    const _id = req.params.id;
    const {
        title,
        description,
        ratings,
        poster_path,
        url_play,
        url_download} = req.body;
    let newUrl_play = validateUrlJson(url_play);
    let newUrl_download = validateUrlJson(url_download);
    await movie.findByIdAndUpdate(_id,{title, description, ratings,
        poster_path, "url_play": newUrl_play, "url_download": newUrl_download});
    messageResult(res, 201, "update Movie");
}

const searchMovieById = async (req, res)=>{
    const _id = req.params.id;
    const search = await movie.find({_id});
    messageResultJson(res, search);
}

const searchMovieAll = async (req, res)=>{
    const _id = req.params.id;
    const searchAll = await movie.find({});
    messageResultJson(res, searchAll);
}

const deleteMovieById = async (req, res)=>{
    const _id = req.params.id;
    await movie.findByIdAndDelete({_id});
    messageResult(res, 201, "Detele movie Id: "+ _id);
}
module.exports = {createMovie, updateMovieById, searchMovieById, searchMovieAll, deleteMovieById}