const middlewares = require( "../../config/middlewares" );
const databaseMeta = require( "../controllers/databaseMeta" );
const express = require( "express" );
const router = express.Router();

router.get("/", middlewares.getterPopulate , databaseMeta.get);

router.get("/pages/:page", middlewares.getterPagination, middlewares.getterPopulate, databaseMeta.getPagination);

router.get("/:objectId", middlewares.getterObjectId, middlewares.getterPopulate, databaseMeta.getSpecific);

router.post("/", databaseMeta.create);

router.post("/:objectId", middlewares.getterObjectId, databaseMeta.update);

router.post("/:objectId/del", middlewares.getterObjectId, databaseMeta.delete);





module.exports = router;
