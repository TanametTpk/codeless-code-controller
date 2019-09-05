const chai = require('chai')
const { expect } = chai

const DatabaseReader = require('../../app/libs/DatabaseReader')
const Structure = require('../../app/libs/Structure')

const findFile = (files , name) => {
    return files.filter((f) => f.name === name)
}

describe('Structure', () => {

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
        let structure

        beforeEach(()=>{
            databases = DatabaseReader.read({databases:data})
            structure = new Structure("appname" , 80 , "sec")
            
            databases.map((db) => {
                structure.addSchema(db)
            })
        })

        it('should set standard attribute', () => {
            
            expect(structure.name).to.equal("appname")
            expect(structure.port).to.equal(80)
            expect(structure.secret).to.equal("sec")

        });

        it('should generate have starter server file', () => {
            
            let files = structure.generate()
            
            let target_files = findFile(files , "Dockerfile")
            expect(target_files.length).to.equal(1)
            
            target_files = findFile(files , "server.js")
            expect(target_files.length).to.equal(1)

            target_files = findFile(files , "package.json")
            expect(target_files.length).to.equal(1)

        });

        it('should generate have config', () => {
            
            let files = structure.generate()

            let target_files = findFile(files , "config")
            expect(target_files.length).to.equal(1)

            target_files = findFile(files , "env")
            expect(target_files.length).to.equal(1)

            target_files = findFile(files , "middlewares")
            expect(target_files.length).to.equal(1)

        });

        it('should generate have app', () => {
            
            let files = structure.generate()

            let target_files = findFile(files , "app")
            expect(target_files.length).to.equal(1)

            target_files = findFile(files , "classes")
            expect(target_files.length).to.equal(1)

            target_files = findFile(files , "controllers")
            expect(target_files.length).to.equal(2)

            target_files = findFile(files , "routes")
            expect(target_files.length).to.equal(1)

            target_files = findFile(files , "models")
            expect(target_files.length).to.equal(1)


        });

        it('should generate have socket', () => {
            
            let files = structure.generate()

            let target_files = findFile(files , "socket")
            expect(target_files.length).to.equal(1)

            target_files = findFile(files , "room.js")
            expect(target_files.length).to.equal(1)


        });

        it('should generate have create file from database', () => {
            
            let files = structure.generate()

            let target_files = findFile(files , "user.js")
            expect(target_files.length).to.equal(5)

            target_files = findFile(files , "text.js")
            expect(target_files.length).to.equal(5)


        });


    });

})