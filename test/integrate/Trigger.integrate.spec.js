const chai = require('chai')
const { expect } = chai

const Trigger = require('../../app/libs/triggers')
const { FileTrigger , FolderTrigger } = Trigger

describe('Trigger', () => {

    describe('integrate with file and folder', () => {

        it('should create in file folder', () => {
            
            let container = []

            let folder = new FolderTrigger('root')
            let file = new FileTrigger('a' , "b")
            folder.add(file)
            folder.create(container)
            expect(container.length).to.equal(2)

        });

        it('should set level in file', () => {
            
            let container = []

            let folder = new FolderTrigger('root')
            let file = new FileTrigger('a' , "b")
            folder.add(file)
            folder.create(container)
            expect(container[1].level).to.equal(1)

        });

        it('should work with deep child correctly', () => {
            
            let container = []

            let t1 = new FolderTrigger("t1")
            let t2 = new FileTrigger("t2" , "test")
            let t3 = new FolderTrigger("t3")
            let t4 = new FolderTrigger("t4")
            let t5 = new FileTrigger("t5" , "con")
            t1.add(t2)
            t1.add(t3)
            t3.add(t4)
            t4.add(t5)

            t1.create(container)

            expect(container.length).to.equal(5)

        });

    });

})