const seasonController = require('../controllers/season.controller');
const Router = require('express');
const seasonRouter = Router();
seasonRouter.post('/',function(req, res){
    seasonController.createSeason(req, res);
});
seasonRouter.get('/',function(req, res){
    seasonController.searchSeasonAll(req, res);
});
seasonRouter.get('/:id',function(req,res){
    seasonController.searchSeasonById(req, res);
});
seasonRouter.put('/:id', function(req, res){
    seasonController.updateSeasonById(req,res);
});
seasonRouter.delete('/:id',function(req,res){
    seasonController.deleteSeasonById(req,res);
});
module.exports = {seasonRouter}