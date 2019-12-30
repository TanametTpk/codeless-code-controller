const Template = require('../../engine/FileTemplate')

class Lib {

    constructor(database){
        this.database = database
        this.name = database.name
        this.keys = {}
        this.path = __dirname
    }

    generate(version=""){

        this.setupClass()

        let template = new Template(`${this.path}/files/lib${version}.pt`)
        return template.generate(this.keys)
    }

    setupClass(){

        this.keys = { ...this.keys , model:this.database.name }

    }

}

module.exports = Lib