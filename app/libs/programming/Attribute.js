class Attribute {

    constructor(name){
        this.name = name
        this.type = "String"
        this.defaultValue = ""
        this.isDefault = false
        this.isArray = false
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
        this.isObject = false
    }

    setTypeString(){
        this.type = "String"
        return this
    }

    setTypeId(ref){
        this.type = `mongoose.Schema.Types.ObjectId , ref: '${ref}'`
        return this
    }

    setTypeDate(){
        this.type = "Date"
        return this
    }

    setTypeNumber(){
        this.type ="Number"
        return this
    }

    setTypeBuffer(){
        this.type = "Buffer"
        return this
    }

    setTypeMixed(){
        this.type = "mongoose.Schema.Types.Mixed"
        return this
    }

    setTypeBoolean(){
        this.type = "Boolean"
        return this
    }

    setTypeMap(){
        this.type = "Map"
        return this
    }

    setTypeDecimal128(){
        this.type = "mongoose.Schema.Types.Decimal128"
        return this
    }

    setTypeObject(objs){
        
        let obj = ""

        objs.map((o) => {
            obj += `${o.name} : ${o.generate()},\n`
        })

        this.type = obj
        this.isObject = true
        return this
    }

    setTypeToArray(){
        this.isArray = true
        return this
    }

    require(){
        this.isRequire = true
        return this
    }

    default(defaultValue){
        this.isDefault = true
        this.defaultValue = defaultValue
        return this
    }

    lowercase(){
        this.isLowercase = true
        return this
    }

    trim(){
        this.isTrim = true
        return this
    }

    setMax(value){
        this.max = value
        this.isMax = true
        return this
    }

    setMin(value){
        this.min = value
        this.isMin = true
        return this
    }

    unique(){
        this.isUnique = true
        return this
    }

    encrypt(){
        this.isEncrypt = true
        return this
    }

    auth(){
        this.isAuth = true
        return this
    }

    id(){
        this.isId = true
        return this
    }

    disableGet(){
        this.isGet = false
        return this
    }

    disableUpdate(){
        this.isUpdate = false
        return this
    }

    generate(){

        let code = this.type

        if (this.isRequire){
            code += ", required : true"
        }

        if (this.isDefault){
            code += `, default : ${this.defaultValue}` 
        }

        if (this.isLowercase && this.type === "String"){
            code += ", lowercase : true"
        }

        if (this.isTrim && this.type === "String"){
            code += ", trim : true"
        }

        if (this.isMax && (this.type === "Number" || this.type === "mongoose.Schema.Types.Decimal128")){
            code += `, max : ${this.max}`
        }

        if (this.isMin && (this.type === "Number" || this.type === "mongoose.Schema.Types.Decimal128")){
            code += `, min : ${this.min}`
        }

        if (this.isObject){
            code = `{ \n${code} }`
        }else{
            code = `{ type: ${code} }`
        }

        if (this.isArray){
            code = `[${code}]`
        }

        return code
    }

}

module.exports = Attribute