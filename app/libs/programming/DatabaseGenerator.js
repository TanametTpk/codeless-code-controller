const FileTemplate = require('../engine/FileTemplate')

class DatabaseGenerator {

    constructor(name){

        this.name = name
        this.attributes = []
        this.schemaName = name + "Schema"
        this.path = __dirname
        this.indexs = []
        this.keys = { name }
         
    }

    generate(version=""){

        this.setupIndex()
        this.setupSchema(version)

        let template = new FileTemplate(`${this.path}/prototypes/model/schema${version}.pt`)
        return template.generate(this.keys)

    }

    setupIndex(){

        if (this.indexs.length < 1) return 

        let indexSet = this.getIndex(this.indexs)
        this.keys = { ...this.keys , indexSet }
    }

    setupSchema(version){

        if (!this.attributes) return

        let attributes = ""
        this.attributes.map((att) => {
            attributes += `${att.name} : ${att.generate(version)},\n\t`
        })

        this.keys = { ...this.keys , attributes }

    }

    addAttribute(attribute){

        if (attribute.isEncrypt){
            let encode = this.getEncrypt(attribute)
            this.keys = { ...this.keys , encode }
        }

        if (attribute.isUnique){
            this.indexs.push(attribute)
        }

        this.attributes.push(attribute)

    }

    getEncrypt(attribute){

        let template = new FileTemplate(`${this.path}/prototypes/model/encode.pt`)
        return template.generate({ 
            name:this.name,
            VarEncrypt: this.capitalize(attribute.name),
            varEncrypt: attribute.name
        })

    }

    getIndex(attributes){

        let attIndex = ""
        attributes.map((att) => {
            attIndex += `${att.name}: 1,`
        })

        let template = new FileTemplate(`${this.path}/prototypes/model/schemaIndex.pt`)
        return template.generate({
            name:this.name,
            attributes:attIndex
        })

    }

    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}

module.exports = DatabaseGenerator