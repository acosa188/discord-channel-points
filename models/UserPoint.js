const mongoose = require("mongoose");

const userPointSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    channelPointId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("UserPoint", userPointSchema);