const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { AuthService } = require('../services');

const homeMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!AuthService.validateToken(token)) {
        res.redirect('/login');
        return;
    }
    next();
};
router.get('/', homeMiddleware, (_, res) => res.redirect('/home'));
router.get('/home', homeMiddleware, (_, res) => res.render('home'));

const loginMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (AuthService.validateToken(token)) {
        res.redirect('/home');
        return;
    }
    next();
};
router.get('/login', loginMiddleware, (_, res) => res.render('login'));

router.post('/login', loginMiddleware, (req, res) => {
    if (!req.body || !req.body.user || !req.body.pass) {
        res.send(createError(400));
        return;
    }

    if (AuthService.login(req.body.user, req.body.pass)) {
        const token = AuthService.sign(req.body.user);
        res.render('login', { cookie: token });
        return;
    }

    res.render('login', { error: 'User or password incorrect.' });
});

module.exports = router;
