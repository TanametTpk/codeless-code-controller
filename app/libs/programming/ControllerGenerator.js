const Template = require('../engine/FileTemplate')

class ControllerGenerator {

    constructor(database){
        this.database = database
        this.name = database.name
        this.keys = {}
        this.path = __dirname
    }

    generate(){

        this.setupClass()
        this.setupValidate()

        let template = new Template(`${this.path}/prototypes/controller/controller.pt`)
        return template.generate(this.keys)
    }

    setupClass(){

        this.keys = { ...this.keys , class:this.database.name }

    }

    setupValidate(){

        let encryptAtt = this.database.attributes.filter((att) => {
            return att.isEncrypt
        })

        let idAtt = this.database.attributes.filter((att) => {
            return att.isId
        })

        if (encryptAtt.length < 1 || idAtt.length < 1) return

        let template = new Template(`${this.path}/prototypes/controller/validate.pt`)
        let validate = template.generate({
            id_var: idAtt[0].name,
            encrypt_var: encryptAtt[0].name,
            encrypt_var_capital: this.capitalize(encryptAtt[0].name),
            database:this.database.name
        })

        this.keys = { ...this.keys , validate }

    }

    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}

module.exports = ControllerGenerator