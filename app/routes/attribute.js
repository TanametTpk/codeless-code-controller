const middlewares = require( "../../config/middlewares" );
const attribute = require( "../controllers/attribute" );
const express = require( "express" );
const router = express.Router();

router.get("/", middlewares.getterPopulate , attribute.get);

router.get("/pages/:page", middlewares.getterPagination, middlewares.getterPopulate, attribute.getPagination);

router.get("/:objectId", middlewares.getterObjectId, middlewares.getterPopulate, attribute.getSpecific);

router.post("/", attribute.create);

router.post("/:objectId", middlewares.getterObjectId, attribute.update);

router.post("/:objectId/del", middlewares.getterObjectId, attribute.delete);





module.exports = router;
