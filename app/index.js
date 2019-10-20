const router = require( "express" ).Router();
const generator = require( "./routes/generator" );
const attribute = require( "./routes/attribute" );
const databaseMeta = require( "./routes/databaseMeta" );
const middlewares = require( "../config/middlewares" );

router.use(middlewares.validateToken)
router.use("/attribute", attribute);
router.use("/databaseMeta", databaseMeta);
router.use("/generator", generator);

module.exports = router;
