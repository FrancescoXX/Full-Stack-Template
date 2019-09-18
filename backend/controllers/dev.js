const config = require('../config.json');
const packJson = require('../package.json');
const sequelize = require('../util/database');

// [GET] ../dev/config
exports.getConfig = (req, res, next) => {
  return res.status(200).json({ config });
};

// [GET] ../dev/package
exports.getPackJson = (req, res, next) => {
  return res.status(200).json({ packJson });
};

// [GET] ../dev/version
exports.getVersion = (req, res, next) => {
  return res.status(200).json({ "Dad 2 Version: ": packJson.version });
};

// [GET] ../dev/test
exports.getTest = (req, res, next) => {
  return res.status(200).json({ "August test: ": "Test ok!" });
};


// [GET] ../dev/dba
//Not used anymore, replaced by seq endpoint
exports.dba = (req, res, next) => {
  const EXAMPLE_QUERY = 'SELECT * FROM Books WHERE BookId=REPLACEID'.replace("REPLACEID", 1001); //Example query
  client.query(EXAMPLE_QUERY, (queryErr, queryRes) => {
    console.log(queryRes);
    var jsonResponse = queryRes.rows[0]; //return first element of the array
    res.status(200).json(jsonResponse);
    client.end();
  });
};

// [GET] ../dev/seq
exports.seq = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log('Connection established');
    res.status(200).json('Connection established');
    next();
  } catch (error) {
    next(error);
  }
  // sequelize.authenticate()
  //   .then(() => {
  //     console.log('Connection established');
  //     return res.status(200).json('Connection established');
  //   })
  //   .catch(err => {
  //     console.error('Unable to the connect ', err);
  //     return res.status(500).json('error');
  //   });
};


