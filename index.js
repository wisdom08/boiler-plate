import mongoose from "mongoose";
import express from "express";

const app = express()
const port = 3000

mongoose.connect('mongodb+srv://byunjihjye:asdf33@cluster0.qulah.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected!"))
    .catch((e) => console.log(e))

app.get('/', (req, res) => {
    res.send('Hello World!')
}) 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})