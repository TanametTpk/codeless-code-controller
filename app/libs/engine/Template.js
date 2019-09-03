
class Template {

    constructor(prototype){
        
        this.prototype = prototype

    }

    getPrototype(){
        return this.prototype
    }

    generate(keys){
        return this.place(this.prototype , keys)
    }

    place(data , keys){

        Object.keys(keys).map((k) => {

            let re = this.getRegFor(k)
            data = data.replace(re , keys[k])

        })

        let re = this.createReg('{\\|[^ {]*\\?\\|}')
        data = data.replace(re , "")
        
        return data

    }

    createReg(replace){
        return new RegExp(replace, "g")
    }

    getRegFor(key){

        let replace = `{\\|${key}\\??\\|}`
        return this.createReg(replace)

    }

}

module.exports = Template