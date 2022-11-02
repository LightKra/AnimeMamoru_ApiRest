const {httpStatusCodes} = require('./httpStatusCodes');
const {BaseError} = require('./baseError');

class Api404Error extends BaseError {
    constructor(name, statusCode = httpStatusCodes.NOT_FOUND, description = 'not found', isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}

module.exports = {Api404Error};