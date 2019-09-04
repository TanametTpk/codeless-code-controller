
const chai = require('chai')
const { expect } = chai
const fs = require('fs')

const DatabaseGenerator = require('../../app/libs/programming/DatabaseGenerator')
const Attribute = require('../../app/libs/programming/Attribute')

describe('DatabaseGenerator', () => {

    let db

    beforeEach(()=>{

        db = new DatabaseGenerator("name")

    })

    describe('create object', () => {

        it('should have name', () => {
            
            expect(db.name).to.equal("name")

        });

    });

    describe('add attribute', () => {

        let att

        beforeEach(()=>{

            att = new Attribute("att")

        })

        it('should have name', () => {
            
            db.addAttribute(att)
            expect(db.attributes.length).to.equal(1)

        });

    });

    describe('generate', () => {

        let att

        beforeEach(()=>{

            att = new Attribute("att")

        })

        it('with normal attribute', () => {
            
            let content = fs.readFileSync(__dirname +  '/../data/model.txt' , 'utf8')

            db.addAttribute(att)
            expect(db.generate()).to.equal(content)

        });

        it('with encrypt attribute', () => {
            
            att.encrypt()
            let content = fs.readFileSync(__dirname + '/../data/modelEncrypt.txt' , 'utf8')

            db.addAttribute(att)
            
            expect(db.generate()).to.equal(content)

        });

        it('with unique attribute', () => {
            
            att.unique()
            let content = fs.readFileSync(__dirname + '/../data/modelUnique.txt' , 'utf8')

            db.addAttribute(att)
            expect(db.generate()).to.equal(content)

        });

        it('with multiple attributes', () => {
            
            let other_att = new Attribute('other_att')
            let content = fs.readFileSync(__dirname + '/../data/modelMulti.txt' , 'utf8')
            content = content.replace(/\s/g,'')

            db.addAttribute(att)
            db.addAttribute(other_att)
            expect(db.generate().replace(/\s/g,'')).to.equal(content)

        });

    });

})