
const chai = require('chai')
const { expect } = chai
const fs = require('fs')

const ClassGenerator = require('../../app/libs/programming/ClassGenerator')
const DatabaseGenerator = require('../../app/libs/programming/DatabaseGenerator')
const Attribute = require('../../app/libs/programming/Attribute')

describe('ClassGenerator', () => {

    let generator

    beforeEach(()=>{

        let db = new DatabaseGenerator("name")
        generator = new ClassGenerator(db)

    })

    describe('create object', () => {

        it('should have name from database with capitalize', () => {
            
            expect(generator.name).to.equal("Name")

        });

    });

})