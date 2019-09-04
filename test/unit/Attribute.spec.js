
const chai = require('chai')
const { expect } = chai

const Attribute = require('../../app/libs/programming/Attribute')

describe('Attribute', () => {

    describe('create object', () => {

        it('should have name', () => {
            
            let attribute = new Attribute("name")
            expect(attribute.name).to.equal("name")

        });

    });

    describe('set types property', () => {

        it('should be String', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeString()
            expect(attribute.type).to.equal("String")

        });

        it('default should be String', () => {
            
            let attribute = new Attribute("name")
            expect(attribute.type).to.equal("String")

        });

        it('should be ID', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeID()
            expect(attribute.name).to.equal("mongoose.Schema.Types.ObjectId")

        });

        it('should be Date', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeDate()
            expect(attribute.type).to.equal("Date")

        });

        it('should be Number', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeNumber()
            expect(attribute.type).to.equal("Number")

        });

        it('should be Buffer', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeBuffer()
            expect(attribute.type).to.equal("Buffer")

        });

        it('should be Mixed', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeMixed()
            expect(attribute.type).to.equal("mongoose.Schema.Types.Mixed")

        });

        it('should be Boolean', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeBoolean()
            expect(attribute.type).to.equal("Boolean")

        });

        it('should be Map', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeMap()
            expect(attribute.type).to.equal("Map")

        });

        it('should be Decimal128', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeDecimal128()
            expect(attribute.type).to.equal("String")

        });

        it('should be Object', () => {
            
            let attribute = new Attribute("name")
            let subAtt = new Attribute("sub")
            attribute.setTypeObject(subAtt)
            expect(attribute.type).to.equal("{ type: String }")

        });

        it('should be Array', () => {
            
            let attribute = new Attribute("name")
            attribute.setTypeToArray()
            expect(attribute.isArray).to.equal(true)

        });

    });

})