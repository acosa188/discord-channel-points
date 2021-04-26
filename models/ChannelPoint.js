const mongoose = require("mongoose");

const channelPointSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ChannelPoint", channelPointSchema);