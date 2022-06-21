import User from "../models/User.js";

const auth = (req, res, next) => {
    const token = req.cookies.x_auth;
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, err:true});

        req.token = token;
        req.user = user;
        next();
    })
}

export default auth;