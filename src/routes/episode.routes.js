const episodeController = require('../controllers/episode.controller');
const validations = require('../middlewares/validations');
const {Router} = require('express');
const episodeRouter = Router();

episodeRouter.post('/', validations.validationOfEmptyVariablesJson, function(req, res){
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