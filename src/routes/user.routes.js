const {Router} = require('express');
const validations = require('../middlewares/user.validations');
const auth = require('../middlewares/auth');
const userRouter = Router();
const userController = require('../controllers/user.controller');
userRouter.post('/registration', [validations.validationUser, validations.checkUserDuplicate, validations.checkValidEmail, validations.checkValidPassword, validations.checkValidRolUser], function(req, res){
    userController.createUser(req, res);
});
userRouter.post('/signin',function(req, res){
    userController.signin(req, res);
});
userRouter.get('/logout', function(req, res){
    userController.logout(req, res);
});
userRouter.put('/:id',[auth.verifyToken, auth.isRolAdmin || auth.isRolModerator || auth.isRolRoot, auth.isRolUser] ,[validations.validationUser, validations.checkUserDuplicatePut,validations.checkValidEmail, validations.checkValidPassword], function(req, res){
    userController.updateUserById(req, res);
});
userRouter.get('/:page', [auth.verifyToken, auth.isRolAdmin || auth.isRolModerator || auth.isRolRoot], function(req, res){
    userController.searchUserAllForAdminModeratorRoot(req, res);
});
userRouter.get('/:id',[auth.verifyToken, auth.isRolAdmin || auth.isRolRoot], function(req, res){
    userController.searchUserByIdForAdminModeratorRoot(req, res);
});
userRouter.put('/root/:id', [auth.verifyToken, auth.isRolRoot, validations.validationUser, validations.checkUserDuplicatePutForRoot, validations.checkValidEmail, validations.checkValidPassword, validations.checkValidRol], function(req, res){
    userController.updateUserByIdForRoot(req, res);
});
userRouter.put('/banned/:id',[auth.verifyToken, auth.isRolRoot || auth.isRolAdmin] ,function(req, res){
    userController.bannedUserByIdForAdminRoot(req, res);
});
userRouter.put('/warn/:id',[auth.verifyToken, auth.isRolRoot || auth.isRolModerator || auth.isRolAdmin] ,function(req, res){
    userController.warnUserByIdForAdminModeratorRoot(req, res);
});
userRouter.put('/removeBan/:id', [auth.verifyToken, auth.isRolRoot || auth.isRolAdmin], function(req, res){
    userController.removeWarningsAndEnableUserByIdForAdminModeratorRoot(req, res);
})
userRouter.delete('/:id',[auth.verifyToken, auth.isRolAdmin || auth.isRolModerator || auth.isRolUser],function(req, res){
    userController.deleteUserById(req, res);
});

module.exports = {userRouter}