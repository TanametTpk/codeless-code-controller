const chai = require('chai')
const { expect } = chai

const DatabaseReader = require('../../app/libs/DatabaseReader')

describe('DatabaseReader', () => {

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

        let databases

        beforeEach(()=>{
            databases = DatabaseReader.read({schemas:data})
        })

        it('should have all database', () => {
            
            expect(databases.length).to.equal(2)

        });

        it('should have get right database name', () => {
            
            expect(databases[0].name).to.equal("user")
            expect(databases[1].name).to.equal("text")

        });

        it('should have get all attributes', () => {
            
            expect(databases[0].attributes.length).to.equal(3)
            expect(databases[1].attributes.length).to.equal(2)

        });


    });

})