const express = require('express');
const createError = require('http-errors');
const { AuthService } = require('../services');

const router = express.Router();

router.use('/', (req, res, next) => {
    const token = req.cookies.token;
    if(!AuthService.validateToken(token)) {
        res.send(createError(403));
        return;
    }
    next();
});

router.get('/', (_, res) => res.send('could send the endpoints to query'));

module.exports = router;
