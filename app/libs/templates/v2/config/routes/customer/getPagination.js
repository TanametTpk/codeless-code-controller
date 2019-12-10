module.exports = {
    priority: 1,
    path: "/pages/:page",
    method: "get",
    middlewares: ["getterPagination", "getterPopulate"],
    controller: "customer",
    action: "getPagination"
}