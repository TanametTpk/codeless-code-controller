const chai = require('chai')
const { expect } = chai

const FolderTrigger = require('../../app/libs/triggers/FolderTrigger')

describe('FolderTrigger', () => {

    let trigger

    beforeEach(()=>{

        trigger = new FolderTrigger("name")

    })

    describe('create object', () => {

        it('should type file', () => {
            
            expect(trigger.type).to.equal("folder")

        });

    });

    describe('create method', () => {

        it('should push itself in array', () => {
            
            let container = []
            trigger.create(container)
            expect(container.length).to.equal(1)

        });

        it('should push child in array', () => {
            
            let container = []

            let t1 = new FolderTrigger("t1")
            trigger.add(t1)

            trigger.create(container)

            expect(container.length).to.equal(2)

        });

        it('should push all child in child', () => {
            
            let container = []

            let t1 = new FolderTrigger("t1")
            let t2 = new FolderTrigger("t2")
            trigger.add(t1)
            t1.add(t2)
            trigger.create(container)

            expect(container.length).to.equal(3)

        });

        it('should set level of child', () => {
            
            let container = []

            let t1 = new FolderTrigger("t1")
            let t2 = new FolderTrigger("t2")
            trigger.add(t1)
            t1.add(t2)
            trigger.create(container)

            expect(container[1].level).to.equal(1)

        });

        it('should set level of child of child', () => {
            
            let container = []

            let t1 = new FolderTrigger("t1")
            let t2 = new FolderTrigger("t2")
            trigger.add(t1)
            t1.add(t2)
            trigger.create(container)

            expect(container[2].level).to.equal(2)

        });

    });

})