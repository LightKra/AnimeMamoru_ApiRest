const seasonController = require('../controllers/season.controller');
const Router = require('express');
const seasonRouter = Router();
seasonRouter.post('/',function(req, res){
    seasonController.createSeason(req, res);
});
seasonRouter.get('/');
seasonRouter.get('/:id');
seasonRouter.put('/:id', function(req, res){
    seasonController.updateSeason(req,res);
});
seasonRouter.delete('/');
module.exports = {seasonRouter}