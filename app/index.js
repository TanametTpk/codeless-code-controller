const router = require( "express" ).Router();
const generator = require( "./routes/generator" );


router.use("/generator", generator);

module.exports = router;
