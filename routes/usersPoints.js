const router = require("express").Router();
const UserPoint = require("../models/UserPoint");
const ChannelPoint = require("../models/ChannelPoint");

router.get("/:userid", async (req, res) => {
    // Check if userid is in db 
    const userExist = await UserPoint.findOne({userId: req.params.userid});
    if(!userExist) return res.status(404).send("user doesn't exist");
    
    // Retrieve channelpoint id
    const points = await ChannelPoint.findById(userExist.channelPointId);
    return res.send(points);
});

router.put("/:userid/:amount", async (req, res) => {
    // Check if userid is in db 
    const userExist = await UserPoint.findOne({userId: req.params.userid});
    if(!userExist) return res.status(404).send("user doesn't exist");

    // Retrieve channelpoint id
    const updated = await ChannelPoint.updateOne({_id: userExist.channelPointId}, {amount: req.params.amount});

    return res.send(`${updated.nModified} modified`);
});



module.exports = router;
