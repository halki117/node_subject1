"use strict";
exports.login = (req, res, next) => {
    const session = require('express-session');
    const bcrypt = require('bcrypt');
    const User = require('../../models').User;
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    User.findOne({
        where: {
            name: name,
        }
    }).then((user) => {
        bcrypt.compare(pass, user.password).then((res) => {
            console.log(res); // return true
            req.session.name = user.name;
            req.session.email = user.email;
            console.log(req.session);
            req.session.save();
        })
            .catch((err) => console.error(err.message));
        res.redirect('/');
    });
};
exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
};
