// Create web server using node js

// Import libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

// Import schema
const Comments = require('../models/comments');

// Create router
const commentRouter = express.Router();

// Use body parser
commentRouter.use(bodyParser.json());

// Get comments
commentRouter.route('/')
    .get((req, res, next) => {
        Comments.find({})
            .populate('author')
            .then((comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Comments.create(req.body)
            .then((comment) => {
                console.log('Comment created: ', comment);
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported on /comments');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Comments.remove({})
            .then((resp) => {
                console.log('All comments deleted');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// Get comment by id
commentRouter.route('/:commentId')
    .get((req, res, next) => {
        Comments.findById(req.params.commentId)
            .populate('author')
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation is not supported