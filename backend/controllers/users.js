const User = require("../models/user.js");

//GET-ALL
exports.getAll = async (req, res, next) => {
  try {
    const ALL = await User.findAll();
    console.log(ALL.map(el => el.dataValues));
    return res.status(200).json(ALL);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//GET-ONE
exports.getOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    console.log(user.dataValues);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//CREATE-ONE
exports.createOne = async (req, res) => {
  console.log('creating user with: ', req.body)
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });
    console.log("createOne USER: ", user);
    return res.status(201).json(user);
  } catch (error) {
    console.log('ERROR in createOne ' + "USER:", error);
    return res.status(500).json(error);
  }
};

//UPDATE-ONE. TODO check
exports.updateOne = (req, res, next) => {
  User.update(
    {
      id: req.body.id,
      username: req.body.username,
      password: req.body.password
    },
    { where: { id: req.params.id } } //QueryParam
  )
    .then(user => {
      console.log("updateOne " + "USER: ", user);
      return res.status(200).json(user);
    })
    .catch(err => {
      console.log('USER ERROR:', err);
      return res.status(500).json('ERROR in ' + 'updateOne: ', err);
    });
};

//DELETE-ONE
exports.deleteOne = (req, res, next) => {
  User.destroy(
    { where: { id: req.params.id } } //QueryParams in req.params
  )
    .then(user => {
      console.log("DELETE: ", user);
      return res.status(200).json(user);
    })
    .catch(err => {
      console.log('DELETE ERROR:', err);
      return res.status(500).json('ERROR', err);
    });
};