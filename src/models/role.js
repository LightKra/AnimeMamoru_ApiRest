const mongooseSchema = require('mongoose');
const roleSchema = mongooseSchema.Schema({
    "name": {
        "type": String,
        "required": true
    }
},{
    "versionKey": false
});
const role = mongooseSchema.model("roles", roleSchema);
module.exports = {role}