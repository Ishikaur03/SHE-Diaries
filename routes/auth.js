//import { Router } from 'express';

 //const router = Router();
//import { authenticate } from 'passport';
//import User, { register } from '../models/User';
/*const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const register= require('../models/User');
router.get('/user', (req, res) => {
    if (req.user)
        return res.send({
            user: req.user
        });
    res.send({
        user: null
    });
});

router.post('/signup', (req, res) => {
    register(new User({
        email: req.body.email
    }), req.body.password, (err, user) => {
        if (err)
            return res.status(400).send(err)
        else
            res.status(200).send(user)
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
        // console.log('logged' + req.user);
        return res.send({
            
            user: {email: req.user.email}
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(200);
});

// export default router;

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/user', (req, res) => {
    if (req.user)
        return res.send({
            user: req.user
        });
    res.send({
        user: null
    });
});

router.post('/signup', (req, res) => {
    User.register(new User({
        email: req.body.email
    }), req.body.password, (err, user) => {
        if (err)
            return res.status(400).send(err)
        else
            res.status(200).send(user)
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
        return res.send({
            user: {email: req.user.email}
        });
    }
});

router.get('/logout', (req, res,next) => {
    req.logout(req.user, err =>{
        if(err) return next(err);
        res.redirect("/");
    });
    req.session.destroy();
    res.sendStatus(200);
});

module.exports = router;