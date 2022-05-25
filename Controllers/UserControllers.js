const express = require('express');
const User = require('./../models/UserModel');

exports.get_users = async (req, res) => {
    const users =await User.find();
    try{
        res
        .status(200)
        .json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
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

exports.create_user = (req, res) => {
    res
        .status(500)
        .json({
            status: 'error',
            message: 'Route not defined yet',
        });
};

exports.get_user = (req, res) => {
    res
        .status(500)
        .json({
            status: 'error',
            message: 'Route not defined yet',
        });
};

exports.update_user = (req, res) => {
    res
        .status(500)
        .json({
            status: 'error',
            message: 'Route not defined yet',
        });
};

exports.delete_user = (req, res) => {
    res
        .status(500)
        .json({
            status: 'error',
            message: 'Route not defined yet',
        });
};