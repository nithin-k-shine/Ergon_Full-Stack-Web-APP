const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const createtoken = id => {
    return jwt.sign(
        { id: id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN })
}
exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            photo: req.body.photo,
            password: req.body.password,
            passwordChangedAt: req.body.passwordChangedAt,
            role:req.body.role
        });
        const token = createtoken(newUser._id)
        res
            .status(201)
            .json({
                status: 'success',
                token,
                data: {
                    User: newUser
                }
            });
    }
    catch (err) {
        res
            .status(400)
            .json({
                status: 'errorm',
                message: err
            });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            
                res
                    .status(400)
                    .json({
                        status: 'error',
                        message: 'Invalid email or password'
                    })
            return;
        }
        const user = await User.findOne({email}).select('+password');
        //console.log(user._name);
        //const correct = user.correctPassword(password,user.password);
        if (!user || !(await user.PasswordCheck(password, user.password))) {
            res
                .status(401)
                .json({
                    status: 'error',
                    message: 'Incorrect email or password'
                });
            return;
        }
         const token = createtoken(user._id)
        // res
        //     .status(200)
        //     .json({
        //         status: 'success',
        //         token
        //     });
        //const token = signToken(user._id);
        // Remove password from output
        user.password = undefined;
        res
            .cookie('jwt', token, {
            expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
            })

            .status(200).json({
                status: 'success'
            });

        
    }

    catch (err) {
        res
            .status(400)
            .json({
                status: err,
                message: 'Invalid email or password. ERROR!'
            });
    }
}

exports.protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            
        }
        
        if(req.cookies.jwt){
            token = req.cookies.jwt;
        }

        
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        
        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
            next(res
                .status(401)
                .json({
                    status: err,
                    message: '1Please login to get access'
                }))
        }
        
        if (freshUser.changedPasswordAfter(decoded.iat)) {
            next(res
                .status(401)
                .json({
                    status: err,
                    message: '2Please login to get access'
                }))
        }
        req.user = freshUser;
        next();
    }
    catch (err) {
        next(res
            .status(401)
            .json({
                status: err,
                message: '3Please login to get access'
            }))
    }
}

exports.restrictTo = (...roles) => { 
    return (req,res,next)=>{
        if (!roles.includes(req.user.role))
        next(res
        .status(403)
        .json({
            status: 'error',
            message: 'Permission denied'
        }));
        next();
    }
}

exports.logout = async (req,res) =>{
    try{
        res
            .cookie('jwt', 'loggedout', {
                expires: new Date(Date.now() + 10 * 1000),
                httpOnly: true
            })
            .status(200).json({ 
                status: 'success' 
            });
    }
    catch (err) {
        next(res
            .status(500)
            .json({
                status: err,
                message: 'no idea'
            }))
    }
}