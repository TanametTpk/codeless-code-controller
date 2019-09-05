const Trigger = require('./triggers')
const { FileTrigger , FolderTrigger } = Trigger
const Template = require('./engine/FileTemplate')
const Controller = require('./programming/ControllerGenerator')
const Classes = require('./programming/ClassGenerator')
const Socket = require('./programming/SocketGenerator')
const Route = require('./programming/RouteGenerator')

class Structure {

    constructor(name , port , secret = "mySecret" ){

        this.name = name
        this.port = port
        this.schemas = []
        this.secret = secret
        this.middlewares = []
        this.root = new FolderTrigger(name)

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

        // logged
        let logged = new FolderTrigger('logged')

        // delegate
        this.createApi(app)
        this.createSocket(socket)
        this.createConfig(config)
        this.createSetting(this.root)
        this.createServer(this.root)

        this.root.add(app)
        this.root.add(socket)
        this.root.add(config)
        this.root.add(logged)
        this.root.create(structure)
        return structure

    }

    createApi(folder){

        // classes
        let classes = new FolderTrigger('classes')

        // controller
        let controllers = new FolderTrigger('controllers')

        // models
        let models = new FolderTrigger('models')

        // routes
        let routesFolder = new FolderTrigger('routes')

        let requireTemplate = new Template(`${__dirname}/programming/prototypes/options/index/require.pt`)
        let exportTemplate = new Template(`${__dirname}/programming/prototypes/options/index/export.pt`)
        let indexTemplate = new Template(`${__dirname}/programming/prototypes/options/index/index.pt`)
        let routeTemplate = new Template(`${__dirname}/programming/prototypes/options/router/router.pt`)
        let template = new Template(`${__dirname}/programming/prototypes/index.pt`)

        let requires = ""
        let routes = ""
        let exportModel = ""

        this.schemas.map((s) => {

            let classGen = new Classes(s)
            let controllerGen = new Controller(s)
            let routeGen = new Route(s)

            models.add(
                new FileTrigger(`${s.name}.js` , s.generate())
            )

            classes.add(
                new FileTrigger(`${s.name}.js` , classGen.generate())
            )

            controllers.add(
                new FileTrigger(`${s.name}.js` , controllerGen.generate())
            )

            routesFolder.add(
                new FileTrigger(`${s.name}.js` , routeGen.generate())
            )

            requires += requireTemplate.generate({
                object: s.name
            })

            routes += routeTemplate.generate({
                database: s.name
            })

            exportModel += `\t${s.name},\n`

        })

        // libs
        let libs = new FolderTrigger('libs')
        let encodeTemplate = new Template(`${__dirname}/programming/prototypes/model/libs/Encoder.pt`)
        libs.add(
            new FileTrigger('Encoder.js' , encodeTemplate.generate({}))
        )

        // index
        let index = new FileTrigger('index.js' , template.generate({
            requires,
            routes
        }))

        let indexModel = new FileTrigger('index.js' , indexTemplate.generate({
            import:requires,
            export:exportTemplate.generate({objects:exportModel})
        }))

        models.add(libs)
        folder.add(models)
        models.add(indexModel)
        folder.add(classes)
        folder.add(controllers)
        folder.add(routesFolder)
        routesFolder.add(index)

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
                object: s.name
            })

            exportController += `\t${s.name},\n`

        })

        // add to folder
        controller.add(new FileTrigger("room.js" , room.generate({})))
        controller.add(new FileTrigger('index.js' , controllerIndex.generate({ requireController , exportController }) ))
        folder.add(controller)
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

            let name = path.split("/")[1].split(".pt")[0]
            let template = new Template(`${__dirname}/programming/prototypes/config/${path}`)
            env.add(
                new FileTrigger(`${name}.js` , template.generate({}))
            )

        })


        // middlewares
        let middlewares = new FolderTrigger("middlewares")
        let requireTemplate = new Template(`${__dirname}/programming/prototypes/options/index/require.pt`)
        let exportTemplate = new Template(`${__dirname}/programming/prototypes/options/index/export.pt`)
        let indexTemplate = new Template(`${__dirname}/programming/prototypes/options/index/index.pt`)
        let requires = ""
        let exportModel = ""
        middlewaresPath.map((path) => {

            let name = path.split("/")[1].split(".pt")[0]
            let template = new Template(`${__dirname}/programming/prototypes/config/${path}`)
            middlewares.add(
                new FileTrigger(`${name}.js` , template.generate({}))
            )

            requires += requireTemplate.generate({
                object: name
            })

            exportModel += `\t${name},\n`

        })

        let indexMiddleware = new FileTrigger('index.js' , indexTemplate.generate({
            import:requires,
            export:exportTemplate.generate({objects:exportModel})
        }))

        // express
        let template = new Template(`${__dirname}/programming/prototypes/config/express.pt`) 
        let express = new FileTrigger("express.js" , template.generate({}))

        // mongoose
        template = new Template(`${__dirname}/programming/prototypes/config/mongoose.pt`) 
        let mongoose = new FileTrigger("mongoose.js" , template.generate({}))

        middlewares.add(indexMiddleware)
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
            new FileTrigger('package.json' , packageTemplate.generate({appName:this.name}))
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