const jwt = require('jsonwebtoken');
const Error = require('../models/error');
const SECRET = "somesupersecret"

/**
 * Read the Token in Bearer xxx, in the Authorization header
 * Verify token, and decodes it
 * Add some values in req.tokenvalues objects, which can be used for next requesr
 */

module.exports = (req, res, next) => {

    //Extract token from 'Authorization' header in incoming request
    const token = req.get('Authorization').split(' ')[1]; //Bearer xxx

    //Try to decode the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, SECRET); //decodes and verifies the token extracted form the header
        // console.log("Token decoded...", decodedToken);
    } catch (error) {
        return res.status(500).json(new Error(500, decodedToken + ' not valid token ', 'FROM /util/is-auth'));
    }
    if (!decodedToken) return res.status(401).json("TOKEN UNDEFINED!");

    //Valid Token
    console.log('Token decoded!: ', decodedToken);

    //add tokenvalues to request

    //filter password
    req.tokenvalues = {};
    req.tokenvalues.id = decodedToken.id
    req.tokenvalues.username = decodedToken.username
    next(); //Forward request
};