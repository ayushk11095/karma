const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
})

const User = mongoose.model("Users", UserSchema)

module.exports = User