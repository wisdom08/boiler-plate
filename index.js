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

app.post("/login", (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다.",
            })
        }


        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다.",
                })
            }

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('x_auth', user.token).status(200).json({
                    loginSuccess: true,
                    userId: user._id
                })
            })

        });
    });

})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})