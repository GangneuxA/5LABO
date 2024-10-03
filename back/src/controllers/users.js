const users = require('../models/users');
const jwt = require('jsonwebtoken');

class UserController {
  async get(req, res) { 
    const id = req.auth.user._id;
  try {
    const user = await users.findById(id);
    if (!user) {
      return res.status(404).send({
        status: "Error",
        message: `No user found with id: ${id}`,
      });
    }
    res.status(200).send(newItem);
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: `An error occurred while searching for user with id: ${id}`,
      error: error.message,
    });
  }
};

  async create(req, res) {
    try {

      const { pseudo ,password , apikey } = req.body;
      const user = new users({ pseudo ,password , apikey });
      user.save();

      res.status(201).json(user);
    } catch (error) {
      res.status(500).send({
        status: "Error",
        message: "An error occurred while inserting new user",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const id = req.auth.user._id;
    if (!ObjectID.isValid(id)) {
      return res.status(400).send({
        status: "Error",
        message: `Invalid ID: ${id}`,
      });
    }
    try {
      const deletedUser = await users.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).send({
          status: "Error",
          message: `No user found with id: ${id}`,
        });
      }
      res.status(200).send(deletedUser);
    } catch (error) {
      res.status(500).send({
        status: "Error",
        message: `An error occurred while deleting user with id: ${id}`,
        error: error.message,
      });
    }
  };

  async delete(req, res)  {
    const id = req.auth.user._id;
    if (!ObjectID.isValid(id)) {
      return res.status(400).send({
        status: "Error",
        message: `Invalid ID: ${id}`,
      });
    }
    try {
      const deletedUser = await users.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).send({
          status: "Error",
          message: `No user found with id: ${id}`,
        });
      }
      res.status(200).send(deletedUser);
    } catch (error) {
      res.status(500).send({
        status: "Error",
        message: `An error occurred while deleting user with id: ${id}`,
        error: error.message,
      });
    }
  };

  async login(req, res, next) {
  try {
    await users.findOne({ pseudo: req.body.pseudo }).then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      user.checkPassword(req.body.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        const token = jwt.sign(
          { user: user},
          process.env.JWT_Token,
          { expiresIn: '24h' }
        );

        res.status(200).json({
          user: user,
          token: token,
        });
      });
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: `An error occurred while login`,
      error: error.message,
    });
  }
};
}

module.exports = UserController;