import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import User from "./models/User.js";

const app = express()

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected!"))
    .catch((e) => console.log(e))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/register", (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
        if(err) return res.json({success: false, err: err});
        return res.status(200).json({success: true})
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})