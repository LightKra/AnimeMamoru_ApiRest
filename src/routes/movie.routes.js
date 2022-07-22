const {Router} = require('express');
const movieRouter = Router();
const movieController = require('../controllers/movie.controller');
movieRouter.post('/',function(req, res){
    movieController.createMovie(req, res);
});
movieRouter.get('/',function(req, res){
    movieController.searchMovieAll(req, res);
});
movieRouter.get('/:id',function(req, res){
    movieController.searchMovieById(req, res);
});
movieRouter.put('/:id',function(req, res){
    movieController.updateMovieById(req, res);
});
movieRouter.delete('/:id',function(req, res){
    movieController.deleteMovieById(req, res);
});
module.exports = {movieRouter}