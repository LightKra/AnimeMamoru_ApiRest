const generalValidations = require('./general.validations');
const {messageResult} = require('../libs/functions');
const {movie} = require('../models/movie');
generalValidations.checkTitleDuplicate = async (req, res, next)=>{
    const title = req.body.title;
    const seasonResult = await movie.find({title});
    const size = Object.keys(seasonResult).length;
    if(size>0){
        messageResult(res, 201, "movie already exists");
    }else{
        next();
    }
}

module.exports = generalValidations;