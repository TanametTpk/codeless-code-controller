const Template = require('./Template')

class KeyGenerator {

    constructor(structure , keys){

        this.structure = structure
        this.keys = {}
        this.selected_dir = {}
        this.prototype_cache = {}

        // store key by file id
        keys.map((key) => {

            let {file , name , set} = key

            // if have file
            let mapping = this.getMultipleMapLevel(this.keys , [file , set , name])
            this.keys[file][set] = mapping ? { ...mapping , [name]: key.value } : { [name]: key.value }

        })

    }

    getMultipleMapLevel(mapping , dimentions){

        let current = mapping
        for (let index = 0; index < dimentions.length - 1; index++) {
            
            let nextMapLevel = dimentions[index]

            // is have map in next level
            if (!current[nextMapLevel]){
                current[nextMapLevel] = {}
            }
            
            current = current[nextMapLevel]

        }

        return current

    }

    savePrototype(prototype){

        if (! this.prototype_cache[prototype._id]){
            this.prototype_cache[prototype._id] = prototype
        }

    }

    addFile(structure , file){

        // is subfolder or root
        if (structure.level > 0 && this.selected_dir[structure.subfolder]){
            // add file to parent folder
            this.selected_dir[structure.subfolder].addNode(file)
        }
        else{
            this.root.addNode(file)
        }

    }

    generate(){

        let structure = this.structure.map((s) => {

            let file = {
                name: s.name,
                level: s.level,
                type: s.type,
            }

            // craete file
            if (s.type === "file"){

                // init state
                let prototype = s.prototypeFile
                let template = new Template(prototype.value)

                // cache prototype
                this.savePrototype(prototype)

                // don't have key , just ignore it
                let key = {}
                if (this.keys[s._id]){

                    // key = this.keys[s._id]
                    key = this.keys[s._id][s.set]

                }

                // generate file
                file = {
                    ...file,
                    content: template.generate(key)
                }

            }

            return file

        })

        // generate
        return structure

    }

}

module.exports = KeyGenerator