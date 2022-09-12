const {Router} = require('express');
const validations = require('../middlewares/user.validations');
const auth = require('../middlewares/auth');
const userRouter = Router();
const userController = require('../controllers/user.controller');
userRouter.post('/', [validations.validationUser, validations.checkUserDuplicate, validations.checkValidEmail, validations.checkValidPassword, validations.checkValidRolUser], function(req, res){
    userController.createUser(req, res);
});
userRouter.post('/signin',function(req, res){
    userController.signin(req, res);
});
userRouter.get('/logout', function(req, res){
    userController.logout(req, res);
});
userRouter.get('/', function(req, res){
    userController.searchUserAll(req, res);
});
userRouter.get('/:id', function(req, res){
    userController.searchUserById(req, res);
});
userRouter.put('/:id', [validations.validationUser, validations.checkUserDuplicatePut,validations.checkValidEmail, validations.checkValidPassword, validations.checkValidRolUser], function(req, res){
    userController.updateUserById(req, res);
});
userRouter.put('/root/:id', [validations.validationUser, validations.checkUserDuplicatePutForRoot, validations.checkValidEmail, validations.checkValidPassword, auth.verifyToken, auth.isRolRoot], function(req, res){
    userController.updateUserByIdForRoot(req, res);
});
userRouter.put('/banned/:id', function(req, res){
    userController.bannedUserByIdForAdminModeratorRoot(req, res);
});
userRouter.put('/warn/:id', function(req, res){
    userController.warnUserByIdForAdminModeratorRoot(req, res);
});
userRouter.put('/removeBan/:id', function(req, res){
    userController.removeWarningsAndEnableUserByIdForAdminModeratorRoot(req, res);
})
userRouter.delete('/:id', function(req, res){
    userController.deleteUserById(req, res);
});

module.exports = {userRouter}