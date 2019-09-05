const Template = require('../engine/FileTemplate')

class SocketGenerator {

    constructor(schema){
        this.schema = schema
        this.keys = {}
    }

    generate(){

        this.setupController()

        let template = new Template(`${__dirname}/prototypes/socket/controllers/template.pt`)
        return template.generate(this.keys)

    }

    setupController(){

        this.keys = {
            ...this.keys,
            capitalClassName: this.capitalize(this.schema.name),
            className:this.schema.name,
        }

    }

    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}

module.exports = SocketGenerator