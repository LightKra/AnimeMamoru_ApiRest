const {BaseError} = require('./baseError');
const {httpStatusCodes} = require('./httpStatusCodes');
class Api400Error extends BaseError{
    constructor(name, statusCode = httpStatusCodes.BAD_REQUEST, description = 'invalid syntax', isOperational = true) {
        super(name, statusCode, description, isOperational);
    }
}

module.exports = {Api400Error}