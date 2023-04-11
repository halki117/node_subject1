exports.login = (req: any, res: any, next: any) => { 
  const session = require('express-session');
  const bcrypt = require('bcrypt');
  const User = require('../../models').User;

  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.pass;

  User.findOne({ 
  where: { 
    name: name,
    email: email
  } }).then((user: any) => {

    bcrypt.compare(pass, user.password).then((res: any) => {
      console.log(res) // return true

      req.session.name = user.name;
      req.session.email = user.email;

      console.log(req.session);

      req.session.save();
    })
    .catch((err: any) => console.error(err.message));

    res.redirect('/');

  });

};


exports.logout = (req: any, res: any, next: any) => {
  req.session.destroy();
  res.redirect('/');
}