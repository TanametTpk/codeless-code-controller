let schemas = [
    {
        name:"user",
        attributes:[
            {
                name:"name",
                require:true
            },
            {
                name:"email",
                id:true,
                auth:true,
                require:true
            },
            {
                name:"password",
                encrypt:true,
                disableGet:true,
                require:true
            }
        ]
    },
    {
        name:"text",
        attributes:[
            {
                name:"value",
                require:true
            },
            {
                name:"created_at",
                default:"Date.now"
            }
        ]
    }
]

let port = 80

let secret = "test"

let projectID = "507f1f77bcf86cd799439011"

module.exports = {
    projectID , requirement: { schemas , port , secret }
}