const Template = require('./Template')
const fs = require('fs')

class FileTemplate extends Template {

    constructor(path){
        
        let prototype = fs.readFileSync(path , 'utf8')
        super(prototype)

    }

}

module.exports = FileTemplate