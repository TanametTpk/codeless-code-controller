const Database = require('./programming/DatabaseGenerator')
const Attribute = require('./programming/Attribute')

const attributeHaveRightFormat = (attribute) => {

    if( !attribute.name ) return false
    return true

}

const getType = (objAtt , rawAtt , level) => {

    if (!level) level = 0
    if (level > 5){
        objAtt.setTypeString()
    }

    let type = rawAtt.type

    switch (type) {
        case "string":
            objAtt.setTypeString()
            break;
        case "id":
            let ref = rawAtt.ref
            if (ref) objAtt.setTypeId(ref)
            break;
        case "date":
            objAtt.setTypeDate()
            break;
        case "number":
            objAtt.setTypeNumber()
            break;
        case "buffer":
            objAtt.setTypeBuffer()
            break;
        case "mixed":
            objAtt.setTypeMixed()
            break;
        case "boolean":
            objAtt.setTypeBoolean()
            break;
        case "decimal128":
            objAtt.setTypeDecimal128()
            break;
        case "object":

            let subAttributes = []
            rawAtt.subObjects.map((subAttribute) => {
                if (subAttribute.name){
                    let subAtt = new Attribute(subAttribute.name)
                    getType(subAtt, subAttribute , level + 1)
                    subAttributes.push(subAtt)
                }
            })
            if (subAttributes.length > 0) objAtt.setTypeObject(subAttributes)
            break;

        default:
            break;
    }

    if (rawAtt.array) objAtt.setTypeToArray()

}

const getAttribute = (attribute) => {

    if (!attributeHaveRightFormat(attribute)) return

    let att = new Attribute(attribute.name.replace(/ /g, "_").toLowerCase())
    getType(att , attribute)

    if (attribute._default) att.default(attribute._default)
    if (attribute.require) att.require()
    if (attribute.lowercase) att.lowercase()
    if (attribute.trim) att.trim()
    if (attribute.max) att.setMax(attribute.max)
    if (attribute.min) att.setMin(attribute.min)
    if (attribute.unique) att.unique()
    if (attribute.encrypt) att.encrypt()
    if (attribute.disableUpdate) att.disableUpdate()
    if (attribute.disableGet) att.disableGet()
    if (attribute.auth) att.auth()
    if (attribute.id) att.id()

    return att

}

const databaseHaveCorrectFormat = (database) => {

    if( !database.name || !database.attributes ) return false
    return true

}

const read = (data) => {

    let schemas = []

    data.schemas.map((schema) => {

        if (databaseHaveCorrectFormat(schema)){

            let db = new Database(schema.name.replace(/ /g, "_").toLowerCase())
            schema.attributes.map((attribute) => {

                let att = getAttribute(attribute)
                if (att){
                    db.addAttribute(att)
                }

            })

            schemas.push(db)

        }

    })

    return schemas


}

module.exports = {
    read
}