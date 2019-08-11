// const middlewares = require( "../../config/middlewares" );
const generator = require( "../controllers/generator" );
const express = require( "express" );
const router = express.Router();

router.post("/", generator.generate);


module.exports = router;
