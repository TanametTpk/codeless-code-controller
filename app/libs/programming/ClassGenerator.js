const Template = require('../engine/FileTemplate')

class ClassGenerator {

    constructor(database){
        this.database = database
        this.name = this.capitalize(database.name)
        this.path = __dirname
        this.keys = {databaseName: database.name , databaseNameCapital: this.name}
    }

    generate(){

        this.setupAttributes()
        this.setupHahableAttributes()
        this.setupUpdableAttributes()
        
        let template = new Template(`${this.path}/prototypes/class/class.pt`)

        return template.generate(this.keys)
    }

    setupAttributes(){

        this.keys = {
            ...this.keys,
            attributes: this.database.attributes.filter((att) => {
                return att.isGet
            }).map((att) => att.name)
        }

    }

    setupUpdableAttributes(){

        let canAttributes = this.database.attributes.filter((att) => {
            return att.isUpdate 
        })

        let updatable_attributes = canAttributes.map((att) => att.name)

        let encryptTemplate = new Template(`${this.path}/prototypes/class/validateFunction.pt`)
        let updateVarTemplate = new Template(`${this.path}/prototypes/class/updateVar.pt`)
        let updateSectionTemplate = new Template(`${this.path}/prototypes/class/updateSection.pt`)
        let update_code = ""

        canAttributes.map((att) => {

            let update_var = ""

            if (att.isEncrypt){

                update_var = encryptTemplate.generate({
                    att: att.name,
                    Att: this.capitalize(att.name),
                    databaseName: "current"
                })

            }else{

                update_var = updateVarTemplate.generate({
                    att: att.name
                })

            }

            update_code += updateSectionTemplate.generate({
                att: att.name,
                update_var
            })

        })


        this.keys = {
            ...this.keys,
            updatable_attributes,
            update_code,
        }

    }

    setupHahableAttributes(){

        let hashable = this.database.attributes.filter((att) => {
            return att.isEncrypt
        })

        if ( hashable.length < 1 ) return

        let hashVar = hashable[0].name

        let template = new Template(`${this.path}/prototypes/class/validateFunction.pt`)
        let hashable_attributes = template.generate({
            databaseName: this.database.name,
            Att: this.capitalize(hashVar),
            att: hashVar
        })

        // extension

        let auth_var = this.database.attributes.filter((att) => {
            return att.isAuth
        }).map((att) => att.name)

        template = new Template(`${this.path}/prototypes/options/class/validate.pt`)
        let extension = template.generate({
            databaseName: this.database.name,
            encrypt_var_capital: this.capitalize(hashVar),
            encrypt_var: hashVar,
            auth_var
        })

        this.keys = {
            ...this.keys,
            hashable_attributes,
            extension,
            export: [`validate${this.capitalize(hashVar)}`]
        }

    }

    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}

module.exports = ClassGenerator