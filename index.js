require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const cors = require("cors");

// routers
const userRoute = require("./routes/users");
const pointsRoute = require("./routes/usersPoints");

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log("connected to database");
    });

// Middlewares
app.use(express.json());
app.use(cors());

// Router Middlewares
app.use("/api/users", userRoute);
app.use("/api/points", pointsRoute);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})