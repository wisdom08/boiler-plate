import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const saltRounds = 10;
userSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    const user = this;
    user.token = jwt.sign(user._id.toJSON(), process.env.SECRET_KEY);
    user.save(function (err, user) {
        if(err) return cb(err);
        cb(null, user);
    });

};

userSchema.statics.findByToken = function (token, cb) {
    const user = this;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        user.findOne({"_id": decoded, "token": token}, function (err, user) {
            if(err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model('User', userSchema);

export default User;