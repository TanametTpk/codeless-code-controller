const Template = require('../../engine/FileTemplate')

class Service {

    constructor(database){
        this.database = database
        this.name = database.name
        this.keys = {}
        this.path = __dirname
    }

    generate(){

        this.setupClass()

        let template = new Template(`${this.path}/files/service.pt`)
        return template.generate(this.keys)
    }

    setupClass(){

        this.keys = { ...this.keys , service:this.database.name }

    }

}

module.exports = Service