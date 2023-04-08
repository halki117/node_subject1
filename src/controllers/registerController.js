"use strict";
const bcrypt = require('bcrypt');
const User = require('../../models').User;
exports.signup = (req, res, next) => {
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
    // User.findAll().then(users => {
    //   res.send(users);
    // });
};
// exports.index = (req: any, res: any, next: any) => {
//   res.send('index');
// };
