class Attribute {

    constructor(name){
        this.name = name
        this.type = "String"
        this.defaultValue = ""
        this.isDefault = false
        this.array = false
        this.isRequire = false
        this.isLowercase = false
        this.isTrim = false
        this.max = 0
        this.min = 0
        this.isMax = false
        this.isMin = false
        this.isUnique = false
        this.isEncrypt = false
        this.isGet = true
        this.isUpdate = true
        this.isAuth = false
        this.isId = false
    }

}

module.exports = Attribute