
const chai = require('chai')
const { expect } = chai

const KeyMaker = require('../../app/libs/engine/KeyMaker')

const isArrayEqual = (arr1 , arr2) => {

    if ( arr1.length !== arr2.length ) return false

    arr1.map((item , index) => {

        if (item !== arr2[index]) return false

    })

    return true

}

describe('KeyMaker', () => {

    describe('create structure', () => {

        it('dynamic name should be change', () => {
            
            let trigger_field_map = [{
                _id:"tfm1",
                trigger:"t1",
                field:"f1",
                template:"temp"
            }]

            let triggers = [
                {
                    _id:'t1',
                    keyTemplate:{_id:'k1' , file:"file1" , name:"name" , type:"var" },
                    file:{ _id:"file1" , name:"\${class}" , level:0,type:"file",prototypeFile:"p1" , isDynamicName:true , tagName:'class' },
                    prototypeFile:{_id:"p1" , value:"" , template:"temp"},
                    type:'file'
                }
            ]

            let field_value = [{
                _id:"fv1",
                type:"textfield",
                value:["MyClass.js"],
                field:"f1",
                asFilename:true,
                tagName:"class"
            }]

            let keyMaker = new KeyMaker(trigger_field_map , triggers , field_value)
            let structure = keyMaker.generate()
            
            expect(structure[0].name).to.equal("MyClass.js")

        });

        it('dynamic name should be change only in format', () => {

            let trigger_field_map = [{
                _id:"tfm1",
                trigger:"t1",
                field:"f1",
                template:"temp"
            }]

            let triggers = [
                {
                    _id:'t1',
                    keyTemplate:{_id:'k1' , file:"file1" , name:"name" , type:"var" },
                    file:{ _id:"file1" , name:"this-\${mat}-class.js" , level:0,type:"file",prototypeFile:"p1" , isDynamicName:true , tagName:'mat' },
                    prototypeFile:{_id:"p1" , value:"" , template:"temp"},
                    type:'file'
                }
            ]

            let field_value = [{
                _id:"fv1",
                type:"textfield",
                value:["Myformat"],
                field:"f1",
                asFilename:true,
                tagName:"mat"
            }]
            
            let keyMaker = new KeyMaker(trigger_field_map , triggers , field_value)
            let structure = keyMaker.generate()
            expect(structure[0].name).to.equal("this-Myformat-class.js")

        });

        it('structure should have prototype', () => {
            
            let trigger_field_map = [{
                _id:"tfm1",
                trigger:"t1",
                field:"f1",
                template:"temp"
            }]

            let triggers = [
                {
                    _id:'t1',
                    keyTemplate:{_id:'k1' , file:"file1" , name:"name" , type:"var" },
                    file:{ _id:"file1" , name:"\${class}" , level:0,type:"file",prototypeFile:"p1" , isDynamicName:true , tagName:'class' },
                    prototypeFile:{_id:"p1" , value:"here" , template:"temp"},
                    type:'file'
                }
            ]

            let field_value = [{
                _id:"fv1",
                type:"textfield",
                value:["MyClass.js"],
                field:"f1",
                asFilename:true,
                tagName:"class"
            }]

            let keyMaker = new KeyMaker(trigger_field_map , triggers , field_value)
            let structure = keyMaker.generate()
            
            expect(structure[0].content).to.equal("here")

        });

        it('structure should be sorted by level', () => {

            let trigger_field_map = [
                {
                    _id:"tfm1",
                    trigger:"t1",
                    field:"f1",
                    template:"temp"
                },
                {
                    _id:"tfm2",
                    trigger:"t2",
                    field:"f1",
                    template:"temp"
                },
                {
                    _id:"tfm3",
                    trigger:"t3",
                    field:"f1",
                    template:"temp"
                }
            ]

            let triggers = [
                {
                    _id:'t1',
                    file:{ _id:"file1" , name:"this-\${mat}-class.js" , level:0,type:"file",prototypeFile:"p1" , isDynamicName:true , tagName:'mat' },
                    prototypeFile:{_id:"p1" , value:"" , template:"temp"},
                    type:'file'
                },
                {
                    _id:'t2',
                    file:{ _id:"file1" , name:"this-\${mat}-class.js" , level:1,type:"file",prototypeFile:"p1" , isDynamicName:true , tagName:'mat' },
                    prototypeFile:{_id:"p1" , value:"" , template:"temp"},
                    type:'file'
                },
                {
                    _id:'t3',
                    file:{ _id:"file1" , name:"this-\${mat}-class.js" , level:2,type:"file",prototypeFile:"p1" , isDynamicName:true , tagName:'mat' },
                    prototypeFile:{_id:"p1" , value:"" , template:"temp"},
                    type:'file'
                },
            ]

            let field_value = [{
                _id:"fv1",
                type:"textfield",
                value:["Myformat"],
                field:"f1",
                asFilename:true,
                tagName:"mat"
            }]
            
            let keyMaker = new KeyMaker(trigger_field_map , triggers , field_value)
            let structure = keyMaker.generate()

            let sorted_structure = structure.sort((a , b) => a.level - b.level)

            let isEqual = isArrayEqual(structure , sorted_structure)
            expect(isEqual).to.equal(true)

        });

        it('structure should have length equal to file trigger', () => {
            
            let trigger_field_map = [
                {
                    _id:"tfm1",
                    trigger:"t1",
                    field:"f1",
                    template:"temp"
                },
                {
                    _id:"tfm2",
                    trigger:"t2",
                    field:"f1",
                    template:"temp"
                },
                {
                    _id:"tfm3",
                    trigger:"t3",
                    field:"f1",
                    template:"temp"
                },
                {
                    _id:"tfm4",
                    trigger:"t4",
                    field:"f1",
                    template:"temp"
                }
            ]

            let triggers = [
                {
                    _id:'t1',
                    file:{ _id:"file1" , name:"this-\${mat}-class.js" , level:0,type:"file",prototypeFile:"p1" , isDynamicName:true , tagName:'mat' },
                    prototypeFile:{_id:"p1" , value:"" , template:"temp"},
                    type:'file'
                },
                {
                    _id:'t2',
                    file:{ _id:"file1" , name:"this-\${mat}-class.js" , level:1,type:"file",prototypeFile:"p1" , isDynamicName:true , tagName:'mat' },
                    prototypeFile:{_id:"p1" , value:"" , template:"temp"},
                    type:'file'
                },
                {
                    _id:'t3',
                    file:{ _id:"file1" , name:"this-\${mat}-class.js" , level:2,type:"file",prototypeFile:"p1" , isDynamicName:true , tagName:'mat' },
                    prototypeFile:{_id:"p1" , value:"" , template:"temp"},
                    type:'file'
                },
                {
                    _id:'t4',
                    keyTemplate:{_id:'k1' , file:"file1" , name:"name" , type:"var" },
                    type:'key'
                }
            ]

            let field_value = [{
                _id:"fv1",
                type:"textfield",
                value:["Myformat"],
                field:"f1",
                asFilename:true,
                tagName:"mat"
            }]

            let keyMaker = new KeyMaker(trigger_field_map , triggers , field_value)
            let structure = keyMaker.generate()
            expect(structure.length).to.equal(3)

        });

    });

})