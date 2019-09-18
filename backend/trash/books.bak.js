const Book = require("../models/book.js");

//Postgres configuration
const { Client } = require('pg');
const client = new Client();
client.connect();

const MODEL = "BOOK";

// client.query('CREATE TABLE assa3(role_id serial PRIMARY KEY, role_name VARCHAR (255) UNIQUE NOT NULL)', (err, res) => {
//   console.log('query...',res);
//   // console.log(res.rows[0].message);
//   client.end();
// });

/*
* db : docker-compose -> services -> app -> environment -> PGDATABASE (template1)
* TABLE : already created
*/
const MODEL_TABLE = "books";

//GET-ALL
exports.getAll = (req, res, next) => {
  ServiceGetAllBooks(req, res);
};

//GET-ONE
exports.getOne = (req, res, next) => {
  //Queryparams
  let modelId = req.params.id; 

  ServiceGetOneBook(modelId, req, res);
};

//CREATE-ONE
exports.createOne = (req, res, next) => {
  //Typecheck for body request
  typeCheck(req, res);

  const newBook = new Book.Book(req.body.age, req.body.name);
  ServiceInsertBook(newBook, req, res); //Insert User in the database
};

// TODO!!!
//UPDATE-ONE. 
exports.updateOne = (req, res, next) => {
  return res.status(200).json("updateOne to be done!");
  // //QueryParams
  // let userId = req.params.id;

  // //Typecheck for body request
  // typeCheck(req, res);

  // //Find user by name
  // let userToUpdate = getOneBook(req.body.name);

  // if (userToUpdate === false) { //No User to update
  //   console.log((ERROR.PUT).error);
  //   return res.status(404).json(ERROR.PUT);
  // } else {
  //   //Permission check
  //   if (userToUpdate.name !== userId) {
  //     console.log((ERROR.UNAUTHORIZED).error);
  //     return res.status(401).json(ERROR.UNAUTHORIZED);
  //   }

  //   //Create new model object
  //   let userBodyRequest = new User.User(req.body.age, req.body.name);

  //   //UPDATE
  //   userToUpdate.age = userBodyRequest.age;

  //   console.log("USER updated: ".warn, userToUpdate);
  //   return res.status(200).json(getAllBooks());
  // }
};

//DELETE-ONE
exports.deleteOne = (req, res, next) => {
  //QueryParams
  let userId = req.params.id;

  ServiceDeleteBook(userId, req, res); 
};

// SERVICES

//Service Get All BOOKS used no more for now
ServiceGetAllBooks = function (req, res) {
  const Q = 'SELECT * FROM MODEL_TABLE'
    .replace("MODEL_TABLE", MODEL_TABLE);
  client.query(Q, (queryErr, queryRes) => {
    if (queryErr) {
      return res.status(400).json(queryErr);
    } else {
      return res.status(200).json(queryRes.rows);
    }
  });
};

//Service get one user, returns the user if exists, false otherwise
ServiceGetOneBook = function (index, req, res) {
  const Q = 'SELECT * FROM MODEL_TABLE WHERE bookid=BOOKID'
    .replace("MODEL_TABLE", MODEL_TABLE)
    .replace("BOOKID", index);
  client.query(Q, (queryErr, queryRes) => {
    if (queryErr) {
      console.log("error in GET ONE: ", queryRes);
      return res.status(400).json(queryErr);
    } else { //QueryRes
      let result = queryRes.rows[0];
      return res.status(200).json(result);
    }
  });
};

//Service Delete user
ServiceDeleteBook = function (index, req, res) {
  const Q = 'DELETE FROM MODEL_TABLE WHERE bookid=BOOKID'
    .replace("MODEL_TABLE", MODEL_TABLE)
    .replace("BOOKID", index);
  client.query(Q, (queryErr, queryRes) => {
    if (queryErr) {
      console.log("error in DELETE: ", queryErr);
      return res.status(400).json(queryErr);
    } else { //QueryRes
      console.log("deleted from index: ", index);
      ServiceGetAllBooks(req, res);
    }
  });
};

//Service Insert user
ServiceInsertBook = function (newBook, req, res) {
  const Q = "INSERT INTO MODEL_TABLE VALUES (BOOKAGE, 'BOOKNAME', 40)"
    .replace("MODEL_TABLE", MODEL_TABLE)
    .replace("BOOKAGE", newBook.age)
    .replace("BOOKNAME", newBook.name);
  client.query(Q, (queryErr, queryRes) => {
    if (queryErr) {
      console.log("error in INSERT: ", queryErr);
      return res.status(400).json(queryErr);
    } else {
      console.log("NEW BOOK: ", newBook);
      ServiceGetAllBooks(req,res);
    }
  });
};

//Type Error Check
typeCheck = function (req, res) {
  var test = req.body; //body to be type checked
  if (typeof (test.name) != 'string') {
    return res.status(400).json("TYPE ERROR! name must be a string");
  }
  if (typeof (test.age) != 'number') {
    return res.status(400).json("TYPE ERROR! age must be a number");
  }
};