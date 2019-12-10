const Template = require('../../engine/FileTemplate')

class Routes {

    constructor(database){
        this.database = database
        this.name = database.name
        this.keys = {}
        this.path = __dirname
    }

    generate(){

        this.setupClass()

        let template = new Template(`${this.path}/files/route.pt`)
        return template.generate(this.keys)
    }

    setupClass(){

        this.keys = { ...this.keys , controller:this.database.name }

    }

}

module.exports = Routes