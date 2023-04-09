const bcrypt = require('bcrypt');
const User = require('../../models').User;

const { validationResult } = require('express-validator');

exports.signup = (req: any, res: any, next: any) => {

  // バリデーションの結果にエラーがあるかのチェック
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('register.ejs', {errors: errors.array()});
    return;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.pass;

  bcrypt.hash(password, 10).then((hashed_password: string) => {
    User.create({
      name: name,
      email: email,
      password: hashed_password,
    }).then((user: any) => {
      console.log(user);
    });
  });

  res.redirect('/');

};

// User.findAll().then(users => {

//   res.send(users);

// });


// exports.index = (req: any, res: any, next: any) => {
//   res.send('index');
// };