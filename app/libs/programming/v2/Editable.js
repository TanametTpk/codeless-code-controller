const Template = require('../../engine/FileTemplate')

class Services {

    constructor(database){
        this.database = database
        this.name = database.name
        this.keys = {}
        this.path = __dirname
    }

    generate(version=""){

        this.setupClass()

        let template = new Template(`${this.path}/files/editable${version}.pt`)
        return template.generate(this.keys)
    }

    setupClass(){

        this.keys = {
            ...this.keys ,
            
            getable:this.database.attributes.filter((att) => {
                return att.isGet
            }).map((att) => `"${att.name}"`).join(" , "),

            updatable:this.database.attributes.filter((att) => {
                return att.isUpdate 
            }).map((att) => `"${att.name}"`).join(" , "),

            jwtPayload: this.database.attributes.filter((att) => {
                return att.isAuth
            }).map((att) => `"${att.name}"`).join(" , ")
        }

    }

}

module.exports = Services