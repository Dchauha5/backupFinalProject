const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, {collection: "user"});

module.exports = mongoose.model("UserSchema", UserSchema);