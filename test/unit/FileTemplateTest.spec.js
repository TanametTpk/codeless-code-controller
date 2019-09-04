
const chai = require('chai')
const { expect } = chai

const FileTemplate = require('../../app/libs/engine/FileTemplate')

describe('FileTemplate', () => {

    describe('create object', () => {

        let path = "./test/data/text.txt"

        it('should have prototype', () => {
            
            let template = new FileTemplate(path)
            expect(template.getPrototype()).to.equal("hello world")

        });

    });

})