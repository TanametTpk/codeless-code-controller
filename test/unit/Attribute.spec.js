
const chai = require('chai')
const { expect } = chai

const Attribute = require('../../app/libs/programming/Attribute')

describe('Attribute', () => {

    let attribute

    beforeEach(()=>{

        attribute = new Attribute("name")

    })

    describe('create object', () => {

        it('should have name', () => {
            
            expect(attribute.name).to.equal("name")

        });

    });

    describe('set types property', () => {

        it('should be String', () => {
            
            attribute.setTypeString()
            expect(attribute.type).to.equal("String")

        });

        it('default should be String', () => {
            
            expect(attribute.type).to.equal("String")

        });

        it('should be ID', () => {
            
            attribute.setTypeId("user")
            expect(attribute.type).to.equal("mongoose.Schema.Types.ObjectId , ref: 'user'")

        });

        it('should be Date', () => {
            
            attribute.setTypeDate()
            expect(attribute.type).to.equal("Date")

        });

        it('should be Number', () => {
            
            attribute.setTypeNumber()
            expect(attribute.type).to.equal("Number")

        });

        it('should be Buffer', () => {
            
            attribute.setTypeBuffer()
            expect(attribute.type).to.equal("Buffer")

        });

        it('should be Mixed', () => {
            
            attribute.setTypeMixed()
            expect(attribute.type).to.equal("mongoose.Schema.Types.Mixed")

        });

        it('should be Boolean', () => {
            
            attribute.setTypeBoolean()
            expect(attribute.type).to.equal("Boolean")

        });

        it('should be Map', () => {
            
            attribute.setTypeMap()
            expect(attribute.type).to.equal("Map")

        });

        it('should be Decimal128', () => {
            
            attribute.setTypeDecimal128()
            expect(attribute.type).to.equal("mongoose.Schema.Types.Decimal128")

        });

        it('should be Object', () => {
            
            let subAtt = new Attribute("sub")
            attribute.setTypeObject([subAtt])
            expect(attribute.type).to.equal("sub : { type: String },\n")

        });

        it('should be Object multiple attribute', () => {
            
            let subAtt1 = new Attribute("sub1")
            let subAtt2 = new Attribute("sub2")
            attribute.setTypeObject([subAtt1 , subAtt2])
            expect(attribute.type).to.equal("sub1 : { type: String },\nsub2 : { type: String },\n")

        });

        it('should be Array', () => {
            
            attribute.setTypeToArray()
            expect(attribute.isArray).to.equal(true)

        });

    });

    describe('set option property', () => {

        it('should be require', () => {
            
            attribute.require()
            expect(attribute.isRequire).to.equal(true)

        });

        it('should have default', () => {
            
            attribute.default("Date.now")
            expect(attribute.isDefault).to.equal(true)
            expect(attribute.defaultValue).to.equal("Date.now")

        });

        it('should be lowercase', () => {
            
            attribute.lowercase()
            expect(attribute.isLowercase).to.equal(true)

        });

        it('should be trim', () => {
            
            attribute.trim()
            expect(attribute.isTrim).to.equal(true)

        });

        it('should have max', () => {
            
            attribute.setMax(100)
            expect(attribute.isMax).to.equal(true)

        });

        it('should have min', () => {
            
            attribute.setMin(20)
            expect(attribute.isMin).to.equal(true)

        });

        it('should have unique', () => {
            
            attribute.unique()
            expect(attribute.isUnique).to.equal(true)

        });

        it('should have encrypt', () => {
            
            attribute.encrypt()
            expect(attribute.isEncrypt).to.equal(true)

        });

        it('should have auth', () => {
            
            attribute.auth()
            expect(attribute.isAuth).to.equal(true)

        });

        it('should have id', () => {
            
            attribute.id()
            expect(attribute.isId).to.equal(true)

        });

        it('should have disableGet', () => {
            
            attribute.disableGet()
            expect(attribute.isGet).to.equal(false)

        });

        it('should have disableUpdate', () => {
            
            attribute.disableUpdate()
            expect(attribute.isUpdate).to.equal(false)

        });

    })

    describe('generate', () => {

        it('should right format', () => {
            
            expect(attribute.generate()).to.equal("{ type: String }")

        });

        it('should can change type', () => {
            
            attribute.setTypeNumber()
            expect(attribute.generate()).to.equal("{ type: Number }")

        });

        it('should can 1 chain set property', () => {
            
            attribute.setTypeString().lowercase()
            expect(attribute.generate()).to.equal("{ type: String, lowercase : true }")

        });
        
        it('should can 2 chain set property', () => {
            
            attribute.setTypeString().lowercase().require()
            expect(attribute.generate()).to.equal("{ type: String, required : true, lowercase : true }")

        });

        it('should can set min in number', () => {
            
            attribute.setTypeNumber().setMin(-5)
            expect(attribute.generate()).to.equal("{ type: Number, min : -5 }")

        });

        it('should can set max in number', () => {
            
            attribute.setTypeNumber().setMax(25)
            expect(attribute.generate()).to.equal("{ type: Number, max : 25 }")

        });

        it('should can set min in decimal', () => {
            
            attribute.setTypeDecimal128().setMin(20.5)
            expect(attribute.generate()).to.equal("{ type: mongoose.Schema.Types.Decimal128, min : 20.5 }")

        });

        it('should can set max in decimal', () => {
            
            attribute.setTypeDecimal128().setMax(50.2)
            expect(attribute.generate()).to.equal("{ type: mongoose.Schema.Types.Decimal128, max : 50.2 }")

        });

        it('should can set min only number, decimal type', () => {
            
            attribute.setTypeString().setMin(20)
            expect(attribute.generate()).to.equal("{ type: String }")

        });

        it('should can set max only number, decimal type', () => {
            
            attribute.setTypeString().setMax(20)
            expect(attribute.generate()).to.equal("{ type: String }")

        });

        it('should can set lowercase only string type', () => {
            
            attribute.setTypeNumber().lowercase()
            expect(attribute.generate()).to.equal("{ type: Number }")

        });

        it('should can set trim only string type', () => {
            
            attribute.setTypeNumber().trim()
            expect(attribute.generate()).to.equal("{ type: Number }")

        });

        it('should can set array', () => {
            
            attribute.setTypeString().lowercase().setTypeToArray()
            expect(attribute.generate()).to.equal("[{ type: String, lowercase : true }]")

        });

        it('should can set object with right format', () => {
            
            let att1 = new Attribute("att1")
            let att2 = new Attribute("att2")
            attribute.setTypeObject([att1 , att2])
            expect(attribute.generate()).to.equal("{ \natt1 : { type: String },\natt2 : { type: String },\n }")

        });

        it('should can set object with other type', () => {
            
            let att1 = new Attribute("att1")
            att1.setTypeNumber()
            let att2 = new Attribute("att2")
            att2.lowercase()
            attribute.setTypeObject([att1 , att2])
            expect(attribute.generate()).to.equal("{ \natt1 : { type: Number },\natt2 : { type: String, lowercase : true },\n }")

        });

        it('should can set object with array', () => {
            
            let att1 = new Attribute("att1")
            att1.setTypeNumber()
            let att2 = new Attribute("att2")
            att2.lowercase().setTypeToArray()
            attribute.setTypeObject([att1 , att2])
            expect(attribute.generate()).to.equal("{ \natt1 : { type: Number },\natt2 : [{ type: String, lowercase : true }],\n }")

        });

    })

})