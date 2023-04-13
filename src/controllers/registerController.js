"use strict";
exports.signup = (req, res, next) => {
    const bcrypt = require('bcrypt');
    const { validationResult } = require('express-validator');
    const User = require('../../models').User;
    // バリデーションの結果にエラーがあるかのチェック
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('register.ejs', { errors: errors.array() });
        return;
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.pass;
    bcrypt.hash(password, 10).then((hashed_password) => {
        User.create({
            name: name,
            email: email,
            password: hashed_password,
        }).then((user) => {
            console.log(user);
        });
    });
    res.redirect('/');
};
