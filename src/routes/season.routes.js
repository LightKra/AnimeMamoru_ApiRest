const seasonController = require('../controllers/season.controller');
const Router = require('express');
const auth = require('../middlewares/auth');
const validations = require('../middlewares/season.validations');
const seasonRouter = Router();
seasonRouter.post('/',[auth.verifyToken, auth.isRolAdmin || auth.isRolRoot, validations.validationTitle, validations.checkTitleDuplicate, validations.validationDescription, validations.validationRatings, validations.validationPosterPath, validations.validationlandScapePosterPath, validations.validationYear, validations.validationGenres, validations.validationLenguages],function(req, res){
    seasonController.createSeason(req, res);
});
seasonRouter.get('/page/:search',function(req, res){
    seasonController.searchSeasonAll(req, res);
});
seasonRouter.get('/title/:search',function(req, res){
    seasonController.searchSeasonByTitle(req, res);
});
seasonRouter.get('/description/:search', function(req, res){
    seasonController.searchSeasonByDescription(req, res);
});
seasonRouter.get('/ratings/:search',function(req, res){
    seasonController.searchSeasonByRatings(req, res);
});
seasonRouter.get('/year/:search',function(req, res){
    seasonController.searchSeasonByYear(req, res);
})
seasonRouter.get('/id/:search',function(req,res){
    seasonController.searchSeasonById(req, res);
});
seasonRouter.put('/:id',[auth.verifyToken, auth.isRolAdmin || auth.isRolRoot, validations.validationTitle, validations.checkTitleDuplicate, validations.validationDescription, validations.validationRatings, validations.validationPosterPath, validations.validationlandScapePosterPath],function(req, res){
    seasonController.updateSeasonById(req,res);
});
seasonRouter.delete('/:id',[auth.verifyToken, auth.isRolAdmin || auth.isRolRoot],function(req,res){
    seasonController.deleteSeasonById(req,res);
});
module.exports = {seasonRouter}