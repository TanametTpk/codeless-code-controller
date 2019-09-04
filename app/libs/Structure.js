const Trigger = require('./triggers')
const { FileTrigger , FolderTrigger } = Trigger
const Template = require('./engine/FileTemplate')
const Database = require('./programming/DatabaseGenerator')
const Controller = require('./programming/ControllerGenerator')
const Classes = require('./programming/ClassGenerator')
const Socket = require('./programming/SocketGenerator')

class Structure {

    constructor(name , port , secret = "mySecret" ){

        this.name = name
        this.port = port
        this.schemas = []
        this.secret = secret
        this.middlewares = []
        this.root = new FolderTrigger(this.name)

    }

    addSchema(schema){
        this.schemas.push(schema)
    }

    setMiddlewares(middlewares){
        this.middlewares = middlewares
    }

    generate(){

        let structure = []

        // create model
        let app = new FolderTrigger('app')

        // create socket
        let socket = new FolderTrigger('socket')

        // create config
        let config = new FolderTrigger('config')

        // delegate
        this.createApi(app)
        this.createSocket(socket)
        this.createConfig(config)
        this.createSetting(this.root)
        this.createServer(this.root)

        this.root.create(structure)
        return structure

    }

    createApi(folder){

        // classes
        let classes = new FolderTrigger('classes')

        // controller
        let controllers = new FolderTrigger('controllers')

        // routes
        let routes = new FolderTrigger('routes')

        let requireTemplate = new Template(`${__dirname}/programming/prototypes/options/index/require.pt`)
        let routeTemplate = new Template(`${__dirname}/programming/prototypes/options/router/router`)
        let template = new Template(`${__dirname}/programming/prototypes/index.pt`)

        let requires = ""
        let routes = ""

        this.schemas.map((s) => {

            let classGen = new Classes(s)
            let controllerGen = new Controller(s)
            let routeGen = new Route(s)

            classes.add(
                new FileTrigger(`${s.name}.js` , classGen.generate())
            )

            controllers.add(
                new FileTrigger(`${s.name}.js` , controllerGen.generate())
            )

            routes.add(
                new FileTrigger(`${s.name}.js` , routeGen.generate())
            )

            requires += requireTemplate.generate({
                object: this.schema.name
            })

            routes += routeTemplate.generate({
                database: this.schema.name
            })

        })

        // index
        let index = new FileTrigger('index.js' , template.generate({
            requires,
            routes
        }))

        folder.add(classes)
        folder.add(controllers)
        folder.add(routes)
        routes.add(index)

    }

    createSocket(folder){

        // controller
        let controller = new FolderTrigger('controllers')

        let room = new Template(`${__dirname}/programming/prototypes/socket/controllers/room.pt`)
        let callControllerTemplate = new Template(`${__dirname}/programming/prototypes/socket/controllers/controller.pt`)
        let controllerIndex = new Template(`${__dirname}/programming/prototypes/socket/controllers/index.pt`)
        let socketIndex = new Template(`${__dirname}/programming/prototypes/socket/index.pt`)
        let requireTemplate = new Template(`${__dirname}/programming/prototypes/options/index/require.pt`)

        let callController = ""
        let requireController = ""
        let exportController = ""
        this.schemas.map((s) => {

            let socket = new Socket(s)
            controller.add(
                new FileTrigger(`${s.name}.js` , socket.generate())
            )

            callController += callControllerTemplate.generate({controller : s.name})

            requireController += requireTemplate.generate({
                object: this.schema.name
            })

            exportController += `\t${this.schema.name},\n`

        })

        // add to folder
        controller.add(new FileTrigger("room.js" , room.generate({})))
        controller.add(new FileTrigger('index.js' , controllerIndex.generate({ requireController , exportController }) ))
        folder.add(new FileTrigger("index.js" , socketIndex.generate({
            controller:callController
        })))

    }

    createConfig(folder){

        let envPath = [
            "env/jwt.config.pt",
            "env/database.env.pt"
        ]

        let middlewaresPath = [
            "middlewares/customResponses.pt",
            "middlewares/getterObjectId.pt",
            "middlewares/getterPagination.pt",
            "middlewares/getterPopulate.pt",
            "middlewares/logger.pt",
            "middlewares/validateToken.pt"
        ]

        // env
        let env = new FolderTrigger('env')
        envPath.map((path) => {

            let name = path.split("/")[1]
            let template = new Template(`${__dirname}/programming/prototypes/config/${path}`)
            env.add(
                new FileTrigger(name , template.generate({}))
            )

        })


        // middlewares
        let middlewares = new FolderTrigger("middlewares")
        middlewaresPath.map((path) => {

            let name = path.split("/")[1]
            let template = new Template(`${__dirname}/programming/prototypes/config/${path}`)
            middlewares.add(
                new FileTrigger(name , template.generate({}))
            )

        })

        // express
        let template = new Template(`${__dirname}/programming/prototypes/config/express.pt`) 
        let express = new FileTrigger("express.js" , template.generate({}))

        // mongoose
        template = new Template(`${__dirname}/programming/prototypes/config/mongoose.pt`) 
        let mongoose = new FileTrigger("mongoose.js" , template.generate({}))

        folder.add(env)
        folder.add(middlewares)
        folder.add(express)
        folder.add(mongoose)

    }

    createSetting(folder){

        // .gitignore

        // Dockerfile
        let dockeTemplate = this.readRootTemplate('Dockerfile.pt')
        folder.add(
            new FileTrigger('Dockerfile' , dockeTemplate.generate({
                port:this.port
            }))
        )

        // package.json
        let packageTemplate = this.readRootTemplate('package.pt')
        folder.add(
            new FileTrigger('package.json' , packageTemplate.generate({}))
        )

    }

    createServer(folder){

        // server
        let template = new Template(`${__dirname}/programming/prototypes/server.pt`)
        let server = new FileTrigger('server.js' , template.generate({
            port: this.port
        }))

        folder.add(server)

    }

    readRootTemplate(filename){
        return new Template(`${__dirname}/programming/prototypes/${filename}`)
    }

}

module.exports = Structure