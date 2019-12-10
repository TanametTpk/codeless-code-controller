module.exports = {
    path: "/:objectId",
    method: "get",
    middlewares: ["getterObjectId", "getterPopulate"],
    controller: "customer",
    action: "getSpecific"
}