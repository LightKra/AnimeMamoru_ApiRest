const mongooseSchema = require('mongoose');
const roleSchema = mongooseSchema.Schema({
    "name": {
        "type": String,
        "required": true
    }
},{
    "versionKey": false
});
mongoseSchema.model("Role", roleSchema);
module.exports = {mongoseSchema}