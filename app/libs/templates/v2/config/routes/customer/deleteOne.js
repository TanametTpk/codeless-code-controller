module.exports = {
    path: "/:objectId",
    method: "delete",
    middlewares: ["getterObjectId"],
    controller: "customer",
    action: "delete"
}