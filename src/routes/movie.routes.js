const {Router} = require('express');
const movieRouter = Router();
const movieController = require('../controllers/movie.controller');
const auth = require('../middlewares/auth');
const validations = require('../middlewares/movie.validations');
movieRouter.post('/', [auth.verifyToken, auth.isRolAdmin || auth.isRolRoot, validations.validationTitle, validations.checkTitleDuplicate, validations.validationlandScapePosterPath, validations.validationYear, validations.validationGenres, validations.validationLenguages, validations.validationDescription, validations.validationRatings, validations.validationPosterPath, validations.validateUrlJsonDownload, validations.validateUrlJsonPlay], function(req, res){
    movieController.createMovie(req, res);
});
movieRouter.get('/page/:search',function(req, res){
    movieController.searchMovieAll(req, res);
});
movieRouter.get('/title/:search',function(req, res){
    movieController.searchMovieByTitle(req, res);
});
movieRouter.get('/description/:search', function(req, res){
    movieController.searchMovieByDescription(req, res);
});
movieRouter.get('/ratings/:search',function(req, res){
    movieController.searchMovieByRatings(req, res);
});
movieRouter.get('/year/:search',function(req, res){
    movieController.searchMovieByYear(req, res);
});
movieRouter.get('/id/:search',function(req, res){
    movieController.searchMovieById(req, res);
});
movieRouter.put('/:id', [auth.verifyToken, auth.isRolAdmin || auth.isRolRoot, validations.validationTitle, validations.checkTitleDuplicate, validations.validationDescription, validations.validationRatings, validations.validationPosterPath, validations.validationlandScapePosterPath, validations.validateUrlJsonDownload, validations.validateUrlJsonPlay],function(req, res){
    movieController.updateMovieById(req, res);
});
movieRouter.delete('/:id', [auth.verifyToken, auth.isRolAdmin || auth.isRolRoot],function(req, res){
    movieController.deleteMovieById(req, res);
});
module.exports = {movieRouter}