const Template = require('../../engine/FileTemplate')

class Lib {

    constructor(database){
        this.database = database
        this.name = database.name
        this.keys = {}
        this.path = __dirname
    }

    generate(){

        this.setupClass()

        let template = new Template(`${this.path}/files/editable.pt`)
        return template.generate(this.keys)
    }

    setupClass(){

        this.keys = { ...this.keys , model:this.database.name }

    }

}

module.exports = Lib