const glob = require('glob')
const Trigger = require('./triggers')
const { FileTrigger , FolderTrigger } = Trigger
const Template = require('./engine/FileTemplate')
const Service = require("./programming/v2/Service")
const Route = require("./programming/v2/Route")
const Lib = require("./programming/v2/Lib")
const Editable = require("./programming/v2/Editable")

class CloneStructure {

    constructor(name , port , secret = "mySecret" , version="v2" ){

        this.name = name
        this.port = port
        this.schemas = []
        this.secret = secret
        this.middlewares = []
        this.root = new FolderTrigger(name)
        this.path = __dirname + "/templates/" + version
        this.folderMapping = {}
        this.version = version

    }

    addSchema(schema){
        this.schemas.push(schema)
    }

    setMiddlewares(middlewares){
        this.middlewares = middlewares
    }

    generate(){

        this.generateTemplate()

        let models = new FolderTrigger("models")
        let services = new FolderTrigger("services")

        let libs = this.folderMapping["libs"]
        let config = this.folderMapping["config"]

        let editable = new FolderTrigger("editable")
        let routes = new FolderTrigger("routes")

        config.add(editable)
        config.add(routes)

        this.schemas.map((s) => {

            let serviceTemplate = new Service(s)
            let routeTemplate = new Route(s)
            let libTemplate = new Lib(s)
            let editableTemplate = new Editable(s)

            models.add(
                new FileTrigger(`${s.name}.js` , s.generate(this.version))
            )

            services.add(
                new FileTrigger(`${s.name}.js` , serviceTemplate.generate())
            )

            libs.add(
                new FileTrigger(`${s.name}.js` , libTemplate.generate(this.version))
            )

            editable.add(
                new FileTrigger(`${s.name}.js` , editableTemplate.generate(this.version))
            )

            routes.add(
                new FileTrigger(`${s.name}.js` , routeTemplate.generate())
            )

        })

        this.root.add(models)
        this.root.add(services)

        let structure = []
        this.root.create(structure)
        return structure

    }

    generateTemplate(){
        let folders = this.getFolder(this.path)
        this.createFolder(folders)
        this.createFile(this.path)
    }

    getFolder(path){
        let rawPath = glob.sync( path + "/**/*" )
        let mapPath = {}
        
        rawPath.map((rp) => {

            let splited = rp.replace(path, "").split("/")
            let splitedFolder = splited.slice(1, splited.length - 1)
            let folder = splitedFolder.join("/")
            
            if (folder) mapPath[folder] = true
            return folder
        
        })

        return Object.keys(mapPath)

    }

    createFolder(folders){

        folders.map((f) => {

            let slicedFolder = f.split("/")
            let folderTarget = slicedFolder[slicedFolder.length - 1]
            let createdFile = new FolderTrigger(folderTarget)
            if (slicedFolder.length < 2){
                
                this.root.add(createdFile)

            }else{
        
                let parentName = f.replace( "/" + folderTarget , "")
                let parent = this.folderMapping[parentName]
                
                parent.add(createdFile)
        
            }

            this.folderMapping[f] = createdFile
        
        })

    }

    createFile(path){

        glob.sync(path + "/**/*", {nodir: true}).map((rp) => {
    
            let splited = rp.replace(path, "").split("/")
            let slicedFolder = splited.slice(1, splited.length - 1)
            let fileName = splited[splited.length - 1]
            let folder = slicedFolder.join("/")
            let file = new Template(rp)

            if (folder){

                let parent = this.folderMapping[folder]
                parent.add(
                    new FileTrigger(fileName, file.generate({appName: this.name}))
                )

            }else{
                this.root.add(
                    new FileTrigger(fileName, file.generate({appName: this.name}))
                )
            }
        
        })

    }

}

module.exports = CloneStructure