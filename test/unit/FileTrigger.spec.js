const chai = require('chai')
const { expect } = chai

const FileTrigger = require('../../app/libs/triggers/FileTrigger')

describe('Trigger', () => {

    let trigger

    beforeEach(()=>{

        trigger = new FileTrigger("name" , "content")

    })

    describe('create object', () => {

        it('should type file', () => {
            
            expect(trigger.type).to.equal("file")

        });

    });

    describe('create method', () => {

        it('should push itself in array', () => {
            
            let container = []
            trigger.create(container)
            expect(container.length).to.equal(1)

        });

        it('should have content', () => {
            
            let container = []
            trigger.create(container)
            expect(container[0].content).to.equal("content")

        });

    });

})