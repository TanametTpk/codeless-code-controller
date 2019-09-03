
const chai = require('chai')
const { expect } = chai

const Template = require('../../app/libs/engine/Template')

describe('Template', () => {

    describe('create object', () => {

        it('should have prototype', () => {
            
            let template = new Template("prototype")
            expect(template.getPrototype()).to.equal("prototype")

        });

    });

    describe('generate prototype', () => {

        it('with single key', () => {
            
            let template = new Template("{|k1|}")
            let keys = { k1:"hello world" }
            expect(template.generate(keys)).to.equal("hello world")

        });

        it('with two key', () => {
            
            let template = new Template("{|k1|} {|k2|}")
            let keys = { k1:"test" , k2:"case" }
            expect(template.generate(keys)).to.equal("test case")

        });

        it('with many key', () => {
            
            let template = new Template("{|k1|} {|k2|} {|hello|} {|world|}")
            let keys = { 
                k1:"1",
                k2:"2",
                hello:"3",
                world:"4"
            }
            expect(template.generate(keys)).to.equal("1 2 3 4")

        });

        it('with no key in nonable key', () => {
            
            let template = new Template("{|k1?|}{|k2?|}{|k3?|}")
            expect(template.generate({})).to.equal("")

        });

        it('with no key in multiple nonable keys', () => {
            
            let template = new Template("{|k1?|}{|k2?|}{|k3?|}")
            expect(template.generate({})).to.equal("")

        });

        it('with key between nonable keys', () => {
            
            let template = new Template("{|k1?|}{|k2|}{|k3?|}")
            let keys = {
                k2:'here'
            }
            expect(template.generate(keys)).to.equal("here")

        });

        it('with two key between nonable keys', () => {
            
            let template = new Template("{|k1?|}{|k2|}{|k3?|}{|k4|}")
            let keys = {
                k2:'here',
                k4:'is'
            }
            expect(template.generate(keys)).to.equal("hereis")

        });

    });

})