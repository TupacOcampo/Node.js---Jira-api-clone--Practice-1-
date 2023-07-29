const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function createJWT(user){
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    return accessToken;
}

module.exports = createJWT;