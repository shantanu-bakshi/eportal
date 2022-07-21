const mongoose = require("mongoose");

const Department = mongoose.model(
    "Department",
    new mongoose.Schema({
        title : { type: String, required: true },
        image : {type: String, required : false},
        description : { type: String, required: true },
        //maintext : { type: String, required: true }
    },)
)

module.exports = Department;