const Trigger = require('./triggers')
const { FileTrigger , FolderTrigger } = Trigger
const Template = require('./engine/FileTemplate')
const Database = require('./programming/DatabaseGenerator')
const Controller = require('./programming/ControllerGenerator')
const Classes = require('./programming/ClassGenerator')

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

        })

        // index
        let index = new FileTrigger('index.js' , "content")

    }

    createSocket(folder){

        // controller

        // index

    }

    createConfig(folder){

        // env

        // middlewares

        // express

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
            new FileTrigger('package.json' , dockeTemplate.generate({}))
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