const chai = require('chai')
const { expect } = chai

const Trigger = require('../../app/libs/triggers/Trigger')

describe('Trigger', () => {

    let trigger

    beforeEach(()=>{

        trigger = new Trigger("name" , 0 , "f1" , "file")

    })

    describe('create object', () => {

        it('should have id', () => {
            
            expect(trigger.getId().length > 0).to.equal(true)

        });

    });

    describe('create method', () => {

        it('should return attribute', () => {
            
            expect(trigger.create().name).to.equal("name")

        });

        it('should change id to _id', () => {
            
            expect(trigger.create()._id).to.equal(trigger.getId())

        });

    });

})