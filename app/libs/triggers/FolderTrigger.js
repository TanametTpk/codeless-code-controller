const Trigger = require('./Trigger')

class FolderTrigger extends Trigger {

    constructor(name){

        super(name , 0 , undefined , "folder")
        this.childs = []

    }

    setLevel (level){
        super.setLevel(level)
        this.childs.map((c) => c.setLevel(level + 1))

    }

    add(child){

        child.setLevel(this.getLevel() + 1)
        child.setSubfolder(this.getId())
        this.childs.push(child)
    }

    create(container){

        container.push(super.create())
        this.childs.map((c) => {
            c.create(container)
        })

    }

}

module.exports = FolderTrigger