module.exports = {
    path: "/:objectId",
    method: "put",
    middlewares: ["getterObjectId"],
    controller: "customer",
    action: "update"
}