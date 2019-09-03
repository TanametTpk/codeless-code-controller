const KeyGen = require('./KeyGenerator')

class KeyMaker{

    constructor(trigger_field_map , triggers , field_value){

        let {
            mapping_tfm,
            mapping_trigger,
            filename
        } = this.createMapping(trigger_field_map , triggers , field_value)

        this.fieldValue = field_value

        this.mapping_tfm = mapping_tfm
        this.mapping_trigger = mapping_trigger
        this.filename = filename

        this.structure = []
        this.keys = []

    }

    generate(){

        // create key and file
        this.fieldValue.map((fv) => {
            
            // get trigger
            let triggers = this.getTrigger(fv)

            // execute trigger
            triggers.map((t) => this.execute(t , fv))

        })

        // return as tuple
        
        const keygen = new KeyGen(this.structure , this.keys)
        
        return keygen.generate()

    }

    createKey(trigger , fieldValue){

        let keyTemplate = trigger.keyTemplate
        let fv = fieldValue.value
        let { name , file , value } = keyTemplate
        
        switch (fieldValue.type) {
            case "textfield":

                return { 
                    name ,
                    value: keyTemplate.type === "var" ? fv : value ,
                    file ,
                    set: fieldValue.set
                }
        
            default:
                return { name , value , file , set: fieldValue.set }
        }

    }

    createFile(trigger , fieldValue){

        let file = {...trigger.file}

        if (file.isDynamicName){

            let tagName = file.tagName
            
            // let name = this.filename[tagName].pop().value[0]
            let name = fieldValue.value

            let reg = new RegExp(`\\\${${tagName}}` , "g")
            file.name = file.name.replace(reg , name)
            file["set"] = fieldValue.set
            

        }

        return file

    }

    execute(trigger , fieldValue){
        
        if ( trigger.type === "file" ){
            
            this.structure.push(this.createFile(trigger , fieldValue))
        }
        else{
            this.keys.push(this.createKey(trigger , fieldValue))
        }

    }

    getTrigger(fieldValue){

        let triggers = []
        let mapping_tfm = this.mapping_tfm
        let mapping_trigger = this.mapping_trigger

        // check field in map
        if (! mapping_tfm[fieldValue.field]) return triggers

        // get trigger_filed_map(array = many choices)
        let choices = mapping_tfm[fieldValue.field]

        choices.map(c => triggers.push(mapping_trigger[c.trigger]))
        return triggers

    }

    createMapping(trigger_field_map , triggers , field_value){

        let mapping_tfm = this.mapTFM(trigger_field_map)
        let mapping_trigger = this.mapTrigger(triggers)
        let filename = this.mapFilename(field_value)

        return {
            mapping_tfm,
            mapping_trigger,
            filename
        }

    }

    mapTFM(trigger_field_map){

        let mapping_tfm = {}

        trigger_field_map.map((tfm) => {

            let id = tfm.field

            if (mapping_tfm[id]) mapping_tfm[id].push(tfm)
            else mapping_tfm[id] = [tfm]

        })

        return mapping_tfm

    }

    mapTrigger(triggers){

        let mapping_trigger = {}

        triggers.map((t) => {
            
            if (t.file){
                t.file.prototypeFile = t.prototypeFile
            }

            mapping_trigger[t._id] = t
        })

        return mapping_trigger

    }

    mapFilename(field_value){

        let filename = {}

        field_value.filter((fv) => fv.asFilename).map((item) => {

            filename[item.tagName] = filename[item.tagName] ? [ ...filename[item.tagName] , item ] : [item]

        })

        return filename

    }

}

module.exports = KeyMaker