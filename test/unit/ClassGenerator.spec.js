
const chai = require('chai')
const { expect } = chai
const fs = require('fs')

const ClassGenerator = require('../../app/libs/programming/ClassGenerator')
const DatabaseGenerator = require('../../app/libs/programming/DatabaseGenerator')
const Attribute = require('../../app/libs/programming/Attribute')

describe('ClassGenerator', () => {

    let generator
    let db

    beforeEach(()=>{

        db = new DatabaseGenerator("application")
        generator = new ClassGenerator(db)

    })

    describe('create object', () => {

        it('should have name from database with capitalize', () => {
            
            expect(generator.name).to.equal("Application")

        });

    });

    describe('generate', () => {

        it('should be right format', () => {
            
            db.addAttribute(new Attribute('name'))
            db.addAttribute(new Attribute('created_at'))
            db.addAttribute(new Attribute('created_by'))

            let content = fs.readFileSync(__dirname + '/../data/class.txt' , 'utf8')

            expect(generator.generate()).to.equal(content)

        });

        it('should have validate method', () => {
            
            db = new DatabaseGenerator("user")
            generator = new ClassGenerator(db)

            let email = new Attribute('email')
            let name = new Attribute('name')
            let password = new Attribute('password')
            let pt = new Attribute('provider_type')
            let pi = new Attribute('provider_id')

            email.id().auth()
            name.auth()
            password.encrypt().disableGet()
            pt.disableUpdate()
            pi.disableUpdate()
            pi.disableGet()


            db.addAttribute(name)
            db.addAttribute(email)
            db.addAttribute(password)
            db.addAttribute(pt)
            db.addAttribute(new Attribute('provider_token'))
            db.addAttribute(pi)

            let content = fs.readFileSync(__dirname + '/../data/classAuth.txt' , 'utf8')

            expect(generator.generate()).to.equal(content)

        });

    });

})