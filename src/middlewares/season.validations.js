const generalValidations = require('./general.validations');
const {season} = require('../models/season');
const {messageResult} = require('../libs/functions');
generalValidations.checkTitleDuplicate = async (req, res, next)=>{
    const title = req.body.title;
    const seasonResult = await season.find({title});
    const size = Object.keys(seasonResult).length;
    if(size>0){
        messageResult(res, 201, "season already exists");
    }else{
        next();
    }
}

module.exports = generalValidations