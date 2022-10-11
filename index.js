const express = require('express');
const mongoose = require('mongoose');
const authorizationRoutes = require('./routes/User')
const topicRoutes = require('./routes/Topic')
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(express.json());
app.use("/user", authorizationRoutes)
app.use("/topic", topicRoutes)


const connectToDB = async() => {
    mongoose.connect(
        process.env.DB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
}

const initProcess = async () => {
    try {
        await connectToDB()
        app.listen(PORT, async () => {
            console.log(`Server Started at ${PORT}`)
        })
    } catch (e) {
        console.log("could not connect");
    }
}


initProcess()


