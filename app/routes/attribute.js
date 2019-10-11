const middlewares = require( "../../config/middlewares" );
const attribute = require( "../controllers/attribute" );
const express = require( "express" );
const router = express.Router();

router.get("/", middlewares.getterPopulate , attribute.get);

router.get("/pages/:page", middlewares.getterPagination, middlewares.getterPopulate, attribute.getPagination);

router.get("/:objectId", middlewares.getterObjectId, middlewares.getterPopulate, attribute.getSpecific);

router.post("/", attribute.create);

router.put("/:objectId", middlewares.getterObjectId, attribute.update);

router.delete("/:objectId", middlewares.getterObjectId, attribute.delete);


module.exports = router;
