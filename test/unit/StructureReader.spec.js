const chai = require('chai')
const { expect } = chai

const StructureReader = require('../../app/libs/StructureReader')

describe('StructureReader', () => {

    describe('create object', () => {

        let data = [
            {
                name:"user",
                attributes:[
                    {
                        name:"name",
                        require:true
                    },
                    {
                        name:"email",
                        id:true,
                        auth:true,
                        require:true
                    },
                    {
                        name:"password",
                        encrypt:true,
                        disableGet:true,
                        require:true
                    }
                ]
            },
            {
                name:"text",
                attributes:[
                    {
                        name:"value",
                        require:true
                    },
                    {
                        name:"created_at",
                        default:"Date.now"
                    }
                ]
            }
        ]

        it('should have all database', () => {
            
            let databases = StructureReader.read({databases:data})
            expect(databases.length).to.equal(2)

        });

        it('should have get right database name', () => {
            
            let databases = StructureReader.read({databases:data})
            expect(databases[0].name).to.equal("user")
            expect(databases[1].name).to.equal("text")

        });

        it('should have get all attributes', () => {
            
            let databases = StructureReader.read({databases:data})
            expect(databases[0].attributes.length).to.equal(3)
            expect(databases[1].attributes.length).to.equal(2)

        });


    });

})