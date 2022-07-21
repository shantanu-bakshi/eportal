const mongoose = require("mongoose");

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        postname : { type: String, required: true },
        postcontent : { type: String, required: true },
        postauthor : { type: String, required: true }
    })
)

module.exports = Post;