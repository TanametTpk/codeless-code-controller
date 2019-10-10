const router = require( "express" ).Router();
const generator = require( "./routes/generator" );
const attribute = require( "./routes/attribute" );
const databaseMeta = require( "./routes/databaseMeta" );


router.use("/attribute", attribute);
router.use("/databaseMeta", databaseMeta);
router.use("/generator", generator);

module.exports = router;
