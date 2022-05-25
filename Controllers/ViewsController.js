
const Work = require('../models/Works_model')
const USER = require('../models/UserModel')
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.home = async (req, res, next) => {
    try{
        res
        .status(200)
        .render('home', {
            title: 'index'
          });
    }
    catch(err){
        res
            .status(404)
            .json({
                status: 'error',
                message: err
            });
    }
};

exports.projects = async (req, res, next) => {
    // 1) verify token
    const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
    );

    // 2) Check if user still exists
    const user = await USER.findById(decoded.id);
    const works= await Work.find();
    try{
        res
        .status(200)
        .render('projects',{
            works,
            user
        });
    }
    catch(err){
        res
            .status(404)
            .json({
                status: 'error',
                message: err
            });
    }
};

exports.project = async (req, res, next) => {
    const work= await Work.findOne({slug: req.params.slug});
    // 1) verify token
    const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
    );

    // 2) Check if user still exists
    const user = await USER.findById(decoded.id);
    try{
        
        res
        .status(200)
        .render('dashboard',{
            work,
            user
        });
    }

    catch(err){
        res
            .status(404)
            .json({
                status: 'error',
                message: err
            });
    }
};

exports.services = async (req, res, next) => {
    try{
        res
        .status(200)
        .render('services');
    }
    catch(err){
        res
            .status(404)
            .json({
                status: 'error',
                message: err
            });
    }
};

exports.users = async (req, res, next) => {
    // 1) verify token
    const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
    );

    // 2) Check if user still exists
    const user = await USER.findById(decoded.id);
    const users=await USER.find();
    try{
        res
        .status(200)
        .render('users',{
            users,
            user
        });
    }
    catch(err){
        res
            .status(404)
            .json({
                status: 'error',
                message: err
            });
    }
};

exports.register = async (req, res, next) => {
    try{
        res
        .status(200)
        .render('register');
    }
    catch(err){
        res
            .status(404)
            .json({
                status: 'error',
                message: err
            });
    }
};

exports.members = async (req, res, next) => {
    // 1) verify token
    const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
    );

    // 2) Check if user still exists
    const user = await USER.findById(decoded.id);
    const users=await USER.find();
    try{
        res
        .status(200)
        .render('members',{
            users,
            user
        });
    }
    catch(err){
        res
            .status(404)
            .json({
                status: 'error',
                message: err
            });
    }
};

exports.login = async (req, res, next) => {
    try{
        res
        .status(200)
        .render('login');
    }
    catch(err){
        res
            .status(404)
            .json({
                status: 'error',
                message: err
            });
    }
};

