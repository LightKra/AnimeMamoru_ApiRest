const {BaseError} = require('../../libs/error/baseError');
const logError = (error)=>{
    console.log(error);
}

const logErrorMiddleware = (error, req, res, next)=>{
    logError(error);
    next(error);
}

const returnError = (error, req, res, next)=>{
    res.status(error.statusCode || 500).send(error.message);
}

const isOperationalError = (error)=>{
    if(error instanceof BaseError){
        return error.isOperational
    }
    return false;
}

module.exports = {logError, logErrorMiddleware, returnError, isOperationalError}