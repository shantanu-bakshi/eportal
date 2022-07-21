const mongoose = require("mongoose");

const Policy = mongoose.model(
    "Policy",
    new mongoose.Schema({
        date : { type: String, required: true },
        department : { type: String, required: true },
        maintext : { type: String, required: true },
        // image : {type: String, required : false},
    })
)

module.exports = Policy;