const Template = require('../engine/FileTemplate')

class RouteGenerator {

    constructor(schema){
        this.schema = schema
        this.keys = {}
    }

    generate(){

        this.setupController()
        this.setupValidate()

        let template = new Template(`${__dirname}/prototypes/router/router.pt`)
        return template.generate(this.keys)

    }

    setupController(){

        this.keys = {
            ...this.keys,
            controller: this.schema.name
        }

    }

    setupValidate(){

        let encryptVar = this.schema.attributes.filter((att) => att.isEncrypt)
        if (encryptVar.length < 1) return

        let template = new Template(`${__dirname}/prototypes/router/router.pt`)
        let validate =  template.generate({
            path:"/validate",
            controller: this.schema.name,
            method: "validate"
        })

        this.keys = {
            ...this.keys,
            validate
        }

    }

}

module.exports = RouteGenerator