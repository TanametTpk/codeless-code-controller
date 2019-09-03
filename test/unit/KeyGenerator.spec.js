const chai = require('chai')
const { expect } = chai

const KeyGenerator = require('../../app/libs/engine/KeyGenerator')

describe('KeyGenerator', () => {

    describe('generate files', () => {

        it('create file with key', () => {
            
            let structure = [
                {
                    _id: "0be15af500a6da9723a119babab6ac",
                    name: "file",
                    prototypeFile: {
                        _id:"p1" ,
                        value:"hello {|user|}" ,
                        template:"temp"
                    },
                    type: "file",
                    level: 0
                }
            ]

            let keys = [
                {
                    _id:"id",
                    name:"user",
                    value:["world"],
                    file:'0be15af500a6da9723a119babab6ac'
                }
            ]

            let generator = new KeyGenerator(structure , keys)
            let files = generator.generate()

            expect(files[0].content).to.equal("hello world")

        });

        it('create multiple file and key', () => {
            
            let structure = [
                {
                    _id: "0be15af500a6da9723a119babab6ac",
                    name: "file1",
                    prototypeFile: {
                        _id:"p1" ,
                        value:"hello {|user|}" ,
                        template:"temp"
                    },
                    type: "file",
                    level: 0
                },
                {
                    _id: "0be15af500a6da9723a119babab6aa",
                    name: "file2",
                    prototypeFile: {
                        _id:"p1" ,
                        value:"test {|text|}" ,
                        template:"temp"
                    },
                    type: "file",
                    level: 0
                }
            ]

            let keys = [
                {
                    _id:"id",
                    name:"user",
                    value:["username"],
                    file:'0be15af500a6da9723a119babab6ac'
                },
                {
                    _id:"id",
                    name:"text",
                    value:["generator"],
                    file:'0be15af500a6da9723a119babab6aa'
                }
            ]

            let generator = new KeyGenerator(structure , keys)
            let files = generator.generate()

            expect(files[0].content).to.equal("hello username")
            expect(files[1].content).to.equal("test generator")

        });

        it('file and key should get right match with set', () => {
            
            let structure = [
                {
                    _id: "0be15af500a6da9723a119babab6ac",
                    name: "file1",
                    prototypeFile: {
                        _id:"p1" ,
                        value:"hello {|user|}" ,
                        template:"temp"
                    },
                    type: "file",
                    level: 0,
                    set:"1"
                },
                {
                    _id: "0be15af500a6da9723a119babab6ad",
                    name: "file2",
                    prototypeFile: {
                        _id:"p1" ,
                        value:"hello {|user|}" ,
                        template:"temp"
                    },
                    type: "file",
                    level: 0,
                    set:"2"
                },
            ]

            let keys = [
                {
                    _id:"id",
                    name:"user",
                    value:["user1"],
                    file:'0be15af500a6da9723a119babab6ac',
                    set:"1"
                },
                {
                    _id:"id",
                    name:"user",
                    value:["user2"],
                    file:'0be15af500a6da9723a119babab6ad',
                    set:"2"
                }
            ]

            let generator = new KeyGenerator(structure , keys)
            let files = generator.generate()

            expect(files[0].content).to.equal("hello user1")
            expect(files[1].content).to.equal("hello user2")

        });

    });

})