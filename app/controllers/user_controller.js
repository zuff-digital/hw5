import jwt from 'jwt-simple';
import User from '../models/user_model';
import config from '../config';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

export const signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }
  return res.send({ token: tokenForUser(req.user) });
};
// eslint-disable-next-line consistent-return
export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }
  // eslint-disable-next-line consistent-return
  User.findOne({ email }, (err, userObject) => {
    if (err) {
      return next(err);
    }
    if (userObject) {
      return res.status(422).send('A user with the email you provided already exists.');
    }
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save()
      .then(result => {
        res.json({ message: 'User created!' });
      })
      .catch(error => {
        res.json({ error });
      });
    // and then return a token same as you did in in signin
    res.send({ token: tokenForUser(user) });
  });
};
