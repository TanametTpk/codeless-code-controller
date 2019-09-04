
const chai = require('chai')
const { expect } = chai
const fs = require('fs')

const ControllerGenerator = require('../../app/libs/programming/ControllerGenerator')
const DatabaseGenerator = require('../../app/libs/programming/DatabaseGenerator')
const Attribute = require('../../app/libs/programming/Attribute')

describe('ControllerGenerator', () => {

    let generator
    let db

    beforeEach(()=>{

        db = new DatabaseGenerator("application")
        generator = new ControllerGenerator(db)

    })

    describe('create object', () => {

        it('should have name', () => {
            
            expect(generator.name).to.equal("application")

        });

    });

    describe('generate', () => {

        it('should be right format', () => {
            
            db.addAttribute(new Attribute('name'))
            db.addAttribute(new Attribute('created_at'))
            db.addAttribute(new Attribute('created_by'))

            let content = fs.readFileSync(__dirname + '/../data/controller.txt' , 'utf8')

            expect(generator.generate()).to.equal(content)

        });

        it('should have validate method', () => {
            
            db = new DatabaseGenerator("user")
            generator = new ControllerGenerator(db)

            let email = new Attribute('email')
            let name = new Attribute('name')
            let password = new Attribute('password')

            email.id().auth()
            name.auth()
            password.encrypt().disableGet()

            db.addAttribute(name)
            db.addAttribute(email)
            db.addAttribute(password)

            let content = fs.readFileSync(__dirname + '/../data/controllerAuth.txt' , 'utf8')

            expect(generator.generate()).to.equal(content)

        });

    });

})