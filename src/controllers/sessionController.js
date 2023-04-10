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
            email: email
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
        // if(compared){
        //   req.session.name = user.name;
        //   req.session.email = user.email;
        //   console.log(session);
        //   res.redirect('/');
        // } else {
        //   console.log('ログイン失敗');
        // }
    });
    // if(req.session.name){
    //   console.log(req.session.name);
    // } else {
    //   req.session.name = name;
    // }
};
