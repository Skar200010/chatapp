const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Manually set the secret key (not recommended for production)
const secretKey = 'sohan_khedekar';

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Check if the username or email already exists
  User.findOne({ $or: [{ username }, { email }] })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }

      // If not, create a new user
      const newUser = new User({ username, email, password });

      // Hash the password before saving it to the database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored hash
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // Create a token for the user
            const payload = { id: user.id, username: user.username };
            jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
              res.json({ success: true, token: 'Bearer ' + token });
            });
          } else {
            res.status(400).json({ message: 'Incorrect password' });
          }
        });
    });
};
