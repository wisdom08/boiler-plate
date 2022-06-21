import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";

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

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})