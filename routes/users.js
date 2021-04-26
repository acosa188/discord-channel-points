const router = require("express").Router();
const User = require("../models/User");
const ChannelPoint = require("../models/ChannelPoint");
const UserPoint = require("../models/UserPoint");
const { registerValidation } = require("../validation");

router.get("/", async (req, res) => {
    try{
        const response = await User.find({});
        res.send(response);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post("/register", async (req, res) => {
    // user input validation
    const { error }  = registerValidation(req.body);
    if(error) return res.status(400).send(error.details.map(x=>x.message).join('\n'));

    // Check if user is already in the database
    const userExist = await User.findOne({userName: req.body.userName});
    if(userExist) return res.status(400).send(`${req.body.userName} already exists`);

    // Creating User
    const user = new User({
        userName: req.body.userName,
        userId: req.body.userId
    });

    // Creating user channel points
    const channelPoints = new ChannelPoint({
        amount: 0
    });

    // Creating reference for user and their channel points
    const userChannelPoints = new UserPoint({
        userId: user.userId,
        channelPointId: channelPoints._id
    });

    try{
        await channelPoints.save();
        await userChannelPoints.save();
    }catch(err){
        console.log(err);
    }

    try{
        await user.save();
        
        res.send({
            user: {
                _dbId: user._id,
                userId: user.userId,
                userName: user.userName,
                created: user.created
            }
        })
    }catch(err){
        res.status(400).send(e);
    }
});

module.exports = router;