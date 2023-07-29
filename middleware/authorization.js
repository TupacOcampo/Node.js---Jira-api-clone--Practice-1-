const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validation = asyncHandler (async(req, res, next) => {
    if (!req.headers["authorization"]){
        res.status(404).send({message:"Empty headers"});
    }
    const token = req.headers["authorization"].split(" ")[1];

    if (!token){
        res.status(400);
        throw new Error("Access token required!");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
        if (err){
            res.status(404);
            throw new Error("Invalid access token!");
        }
        else{
            res.status(200)
            req.user = user;
            console.log(user);
            next();
        }
    })
});

module.exports = validation;
