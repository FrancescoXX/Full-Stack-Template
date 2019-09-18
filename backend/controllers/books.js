const book = require("../models/book.js");
const BookObject = require("../models/bookObject").default;

const MODEL = book;

//GET-ALL
exports.getAll = async (req, res, next) => {
  try {
    const ALL = await MODEL.findAll();
    console.log(ALL.map(el => el.dataValues));
    return res.status(200).json(ALL);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//GET-ONE SECRET. get a specific book based on decoded token
exports.getOne = async (req, res, next) => {
  console.log("req.tokenvalues: ", req.tokenvalues);
  try {
    const ONE = await MODEL.findByPk(req.tokenvalues.id);
    
    // console.log("getOne: ", ONE);
    // return res.status(200).json(ONE);

    //Mock value to return
    var MOCKSECRET = {
      mock: 'testmock',
      version: '1.0.0'
    }

    return res.status(200).json(MOCKSECRET);
  } catch (error) {
    console.log('book ERROR in getOne: ', error);
    return res.status(500).json(error);
  }
};

//CREATE-ONE
exports.createOne = (req, res, next) => {
  MODEL.create(
    { id: req.body.id, name: req.body.name, cost: req.body.cost } // Json object from body request
  )
    .then(book => {
      console.log("book createOne: ", book);
      return res.status(200).json(book);
    })
    .catch(err => {
      console.log('book ERROR in createOne:', err);
      return res.status(500).json(err);
    });
};

//UPDATE-ONE
exports.updateOne = async (req, res, next) => {
  try {
    let TOUPDATE = new BookObject(req.tokenvalues.id, req.body.name, req.body.cost);
    await MODEL.update(TOUPDATE, { where: { id: req.id } });
    this.getOne(req, res, next);
  } catch (error) {
    console.log('book ERROR in updateOne:', error);
    return res.status(500).json(error);
  }
};

//DELETE-ONE. REMOVED IN PRODUCTIONS
exports.deleteOne = (req, res, next) => {
  book.destroy(
    { where: { id: req.params.id } } //QueryParams in req.params
  )
    .then(r => {
      console.log("book deleteOne: ", r);
      return res.status(200).json(r);
    })
    .catch(err => {
      console.log('DELETE ERROR:', err);
      return res.status(500).json('ERROR', err);
    });
};