const {movie} = require('../models/movie');
const {messageResult, messageResultJson} = require('../libs/functions');
const createMovie = async (req, res)=>{
    const {
        title,
        description,
        ratings,
        poster_path,
        url_play,
        url_download} = req.body;
    const newMovie = await new movie({title, description, ratings,
        poster_path, url_play, url_download});
    newMovie.save();
    messageResult(res, 201, 'saved movie');
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
    await movie.findByIdAndUpdate(_id,{title, description, ratings,
        poster_path, url_play, url_download});
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
    messageResult(res, 201, "detele movie Id: "+ _id);
}
module.exports = {createMovie, updateMovieById, searchMovieById, searchMovieAll, deleteMovieById}