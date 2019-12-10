module.exports = {
    path: "/",
    method: "get",
    middlewares: ["getQuery", "getterPopulate"],
    controller: "customer",
    action: "get"
}