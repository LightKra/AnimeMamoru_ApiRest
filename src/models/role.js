const mongooseSchema = require('mongoose');
const roleSchema = mongooseSchema.Schema({
    "name": String
},{
    "versionKey": false
});
mongoseSchema.model("Role", roleSchema);
module.exports = {mongoseSchema}