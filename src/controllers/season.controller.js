const {season} = require('../models/season');

const createSeason = async (req, res) => {
    const {title,
    description,
    number_Episodes,
    date,
    genres,
    ratings,
    lenguages,
    poster_path} = req.body;
    season.find({title},(error, docs)=>{
        if(docs.length){
            console.log("Season name already exists");
            return
        }
    })    
    const newSeason = new season({title, description, number_Episodes, date,
    genres, ratings, lenguages, poster_path
    })
    await newSeason.save();
    console.log("saved Season");
    res.status(201).json({"saved Season": true});
}
const updateSeason = async (req, res)=>{
    const {title,
        description,
        number_episodes,
        date,
        genres,
        ratings,
        lenguages,
        poster_path} = req.body;
    const _id = req.params.id;
    await season.findByIdAndUpdate(_id,{title, description, number_episodes, 
        date, genres, ratings,lenguages, poster_path});
    res.status(201).json({"update Season": true});
}
const searchSeason = async (req, res)=>{
    const _id = req.params.id;
    const search = season.find({_id});
    res.status(201).json(search);
}
module.exports = {createSeason, updateSeason, searchSeason}