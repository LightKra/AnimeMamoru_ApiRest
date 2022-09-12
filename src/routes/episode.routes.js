const episodeController = require('../controllers/episode.controller');
const validations = require('../middlewares/episode.validations');
const {Router} = require('express');
const episodeRouter = Router();

episodeRouter.post('/:id', [validations.validationTitle, validations.checkTitleDuplicate, validations.validationDescription, validations.validationRatings, validations.validationPosterPath, validations.validateUrlJsonDownload, validations.validateUrlJsonPlay], function(req, res){
    episodeController.createEpisode(req, res);
});
episodeRouter.get('/', function(req, res){
    episodeController.searchEpisodeAll(req, res);
});
episodeRouter.get('/:id', function(req, res){
    episodeController.searchEpisodeById(req, res);
});
episodeRouter.put('/:id', function(req, res){
    episodeController.updateEpisodeById(req, res);
});
episodeRouter.delete('/:id', function(req, res){
    episodeController.deleteEpisodeById(req, res);
});

module.exports = {episodeRouter}