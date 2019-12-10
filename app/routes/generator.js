// const middlewares = require( "../../config/middlewares" );
const generator = require( "../controllers/generator" );
const express = require( "express" );
const router = express.Router();

router.post("/", generator.generate);
router.post("/inplace", generator.generateFromDbV2);

module.exports = router;
