const express = require('express');
const fs = require('fs');

const Works = require('./../models/Works_model');

exports.get_works = async (req, res) => {
    try{
        const queryobj= {...req.query};
        ['sort','page','limit','fields'].forEach(el => {
            delete queryobj[el];
        })

        let querystr= JSON.stringify(queryobj);
        querystr =querystr.replace(/\b(gt|lt|gte|lte)\b/g,match=>`$${match}`);
        let query =JSON.parse(querystr);
        console.log(query);
        let works_data= Works.find(query);

        if(req.query.sort){
            works_data =works_data.sort(req.query.sort);
        }

        const works=await works_data;
    res
        .status(200)
        .json({
            status: 'success',
            results: works.length,
            data: {
                works
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
exports.get_works_id = async (req, res) => {
    try{
        const work= await Works.findById(req.params.id);
        res
        .status(200)
        .json({
            status: 'success',
            data: {
                work
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
exports.post_works = async(req, res) => {
    try{
        const newwork = await Works.create(req.body);
        res
            .status(201)
            .json({
                status: 'success',
                data: {
                    Work: newwork
                }
            });
    }
    catch(err){
        res
            .status(400)
            .json({
                status: 'error',
                message: err
            });
    }
};

exports.works_patch = async (req, res) => {
    try{
        const work= await Works.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });
        res
        .status(200)
        .json({
            status: 'success',
            data: {
                work
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

exports.works_delete = async (req, res) => {
    try{
        await Works.findByIdAndDelete(req.params.id)
        res
        .status(204)
        .json({
            status: 'success',
            data: null
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