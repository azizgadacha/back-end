const bcrypt=require('bcrypt');
const User =require( '../model/user');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { isJwtExpired } =require( 'jwt-check-expiration')


exports.test2=async (req, res) => {


    res.send(isJwtExpired(req.body.token))

}