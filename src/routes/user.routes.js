const {Router} = require('express');
const userRouter = Router();
const userController = require('../controllers/user.controller');
userRouter.post('/', function(req, res){
    userController.createUser(req, res);
});
userRouter.get('/', function(req, res){
    userController.searchAll(req, res);
});
userRouter.get('/:id', function(req, res){
    userController.searchUser(req, res);
});
userRouter.put('/:id', function(req, res){
    userController.updateUser(req, res);
});
userRouter.delete('/:id', function(req, res){
    userController.deleteUser(req, res);
});

module.exports = {userRouter}