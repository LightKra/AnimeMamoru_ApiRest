const episodeController = require('../controllers/episode.controller');
const validations = require('../middlewares/episode.validations');
const auth = require('../middlewares/auth');
const {Router} = require('express');
const episodeRouter = Router();

episodeRouter.post('/:id', [auth.verifyToken, auth.isRolAdmin || auth.isRolRoot, validations.validationTitle, validations.validationDescription, validations.validationRatings, validations.validationPosterPath, validations.validateUrlJsonDownload, validations.validateUrlJsonPlay], function(req, res){
    episodeController.createEpisode(req, res);
});
episodeRouter.get('/page/:search', function(req, res){
    episodeController.searchEpisodeAll(req, res);
});
episodeRouter.get('/title/:search', function(req, res){
    episodeController.searchEpisodeByTitle(req, res);
});
episodeRouter.get('/description/:search', function(req, res){
    episodeController.searchEpisodeByDescription(req, res);
});
episodeRouter.get('/ratings/:search', function(req, res){
    episodeController.searchEpisodeByRatings(req, res);
});
episodeRouter.get('/id/:search', function(req, res){
    episodeController.searchEpisodeById(req, res);
});
episodeRouter.put('/:id', [auth.verifyToken, auth.isRolAdmin || auth.isRolRoot, validations.validationTitle, validations.validationDescription, validations.validationRatings, validations.validationPosterPath, validations.validateUrlJsonDownload, validations.validateUrlJsonPlay], function(req, res){
    episodeController.updateEpisodeById(req, res);
});
episodeRouter.delete('/:id', [auth.verifyToken, auth.isRolAdmin || auth.isRolRoot], function(req, res){
    episodeController.deleteEpisodeById(req, res);
});

module.exports = {episodeRouter}