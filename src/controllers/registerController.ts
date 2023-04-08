const bcrypt = require('bcrypt');
const User = require('../../models').User;

exports.signup = (req: any, res: any, next: any) => {

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

  // User.findAll().then(users => {

  //   res.send(users);

  // });
};

// exports.index = (req: any, res: any, next: any) => {
//   res.send('index');
// };