let schemas = [
    {
        name:"user",
        attributes:[
            {
                name:"name",
                require:true,
                databaseMeta:"507f1f77bcf86cd799439011"
            },
            {
                name:"email",
                id:true,
                auth:true,
                require:true,
                databaseMeta:"507f1f77bcf86cd799439011"
            },
            {
                name:"password",
                encrypt:true,
                disableGet:true,
                require:true,
                databaseMeta:"507f1f77bcf86cd799439011"
            }
        ]
    },
    {
        name:"text",
        attributes:[
            {
                name:"value",
                require:true,
                databaseMeta:"507f1f77bcf86cd799439011"
            },
            {
                name:"created_at",
                default:"Date.now",
                databaseMeta:"507f1f77bcf86cd799439011"
            }
        ]
    }
]

let port = 80

let secret = "test"

let boxID = "507f1f77bcf86cd799439011"

module.exports = {
    boxID , requirement: { schemas , port , secret }
}