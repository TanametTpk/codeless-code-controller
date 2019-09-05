const Trigger = require('./Trigger')

class FileTrigger extends Trigger {

    constructor(name , content){
        super(name , 0 , undefined , "file")
        this.content = content
    }

    create(container){

        container.push({
            ...super.create(),
            content: this.content
        })

    }

}

module.exports = FileTrigger