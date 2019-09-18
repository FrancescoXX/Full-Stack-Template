// exports.getAll = (req, res, next) => {
//   book.findAll()
//     .then(books => {
//       console.log("books getAll: ", books);
//       return res.status(200).json(books);
//     })
//     .catch(err => {
//       console.log('book ERROR in getAll ' + "BOOK", err);
//       return res.status(200).json(err);
//     });
// };

// sequelize.sync()
// 	.then(() => {
// 		app.listen(process.env.INTERNAL_PORT, process.env.HOST); //DEF in docker.compose.yml
// 		console.log(process.env); //Log ENVIRONMENT VARIABLES in docker.compose.yml and .env
// 		console.log(`Running on ${process.env.HOST}:${process.env.INTERNAL_PORT}\nREADY...`);
// 	})
// 	.catch(err => { console.log(err); });