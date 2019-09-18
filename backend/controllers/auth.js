/**
 * App Authentication to get a temporary token 
 */

const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// [POST] ../auth/token
/** req.body
*	{
* 	"id":3,
* 	"username":"assa",
* 	"password":"zerg"
*	}
*/
const SUPERSECRET = "somesupersecret";

//Token Creation
exports.token = (req, res, next) => {

	console.log('Processing token request for: ', req.body);

	//User to verify
	const USER_TO_VERIFY = {
		username: req.body.username,
		password: req.body.password
	}

	//Mock...check if user is banned
	if (USER_TO_VERIFY.id === 2) {
		return res.status(500).json("BANNED");
	}

	//check user in db
	(async () => {
		try {
			const user = await User.findByPk(1);
			const USER_DATAVALUES = user.dataValues;

			if (USER_TO_VERIFY.username === USER_DATAVALUES.username && USER_TO_VERIFY.password === USER_DATAVALUES.password) {
				const TOKEN = jwt.sign(
					USER_TO_VERIFY,
					SUPERSECRET,
					{ expiresIn: '1h' }
				);

				return res.status(200).json({
					username: USER_TO_VERIFY.username,
					token: TOKEN
				}
				);
			} else {
				let error = 'error in token service!';
				return res.status(401).json(error);
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	})();
};