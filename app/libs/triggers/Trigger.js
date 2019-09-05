const uuidv4 = require('uuid/v4')

class Trigger {

    constructor(name , level , subfolder , type){
        this.id = uuidv4()
        this.name = name
        this.level = 0
        this.subfolder = undefined
        this.type = type
    }

    setLevel (level){
        this.level = level
    }

    getLevel(){
        return this.level
    }

    setSubfolder(folder){

        this.subfolder = folder

    }

    getId(){
        return this.id
    }

    create(){
        return {
            _id: this.id,
            name: this.name,
            level: this.level,
            type: this.type,
            subfolder: this.subfolder
        }
    }

}

module.exports = Trigger