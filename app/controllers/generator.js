const api = require('../classes')
const DatabaseMeta = require('../classes/databaseMeta')
const Attribute = require('../classes/attribute')

const executeGenerate = async (boxID , requirement, token , generatorVersion="nodeBuild" , version) => {

    let {schemas , port , secret} = requirement

    // call api (send authrization for auth to app server)
    let boxInfo = await api.application.getBoxInfomation(boxID, token)
    boxInfo = boxInfo.data
    let appname = boxInfo.name

    // build
    let url = await api.generator[generatorVersion](boxID , boxInfo , appname , schemas , port , secret , version )
    url = url.data

    return url

}

exports.generate = async (req , res) => {

	try{

        // get variable
        let { boxID , requirement} = req.body

        //build
        let url = await executeGenerate(boxID , requirement, req.headers[ "authorization" ])
        
        // response
		res.success(url);

	} catch (error){
        console.log(error);
        
		res.preconditionFailed({error});
	}

};

exports.generateFromDb = async (req , res) => {

	try{

        // get variable
        let { boxID } = req.body

        // find database
        let schemas = await DatabaseMeta.findManyAndPopulate({box: boxID})

        // find attribute
        schemas = await Promise.all(schemas.map( async (schema) => {

            // find attribute
            let attributes = await Attribute.findManyAndPopulate({databaseMeta:schema._id}, "ref subObjects")
            
            schema._doc["attributes"] = attributes.map((attribute) => {
                
                let att = {...attribute._doc}
                if (attribute.type === "id") att.ref = attribute.ref.name
                
                return att
            })

            return schema._doc

        }))
        
        let requirement = {
            schemas,
            port:80,
            secret:boxID
        }    

        //build
        let url = await executeGenerate(boxID , requirement, req.headers[ "authorization" ])
        
        // response
		res.success(url);

	} catch (error){
        console.log(error);
        
		res.preconditionFailed({error});
	}

};

exports.generateFromDbV2 = async (req , res) => {

	try{

        // get variable
        let { boxID, dbType } = req.body

        // find database
        let schemas = await DatabaseMeta.findManyAndPopulate({box: boxID})

        // find attribute
        schemas = await Promise.all(schemas.map( async (schema) => {

            // find attribute
            let attributes = await Attribute.findManyAndPopulate({databaseMeta:schema._id}, "ref subObjects")
            
            schema._doc["attributes"] = attributes.map((attribute) => {
                
                let att = {...attribute._doc}
                if (attribute.type === "id") att.ref = attribute.ref.name
                
                return att
            })

            return schema._doc

        }))
        
        let requirement = {
            schemas,
            port:80,
            secret:boxID
        }    

        //build
        let url = await executeGenerate(boxID , requirement, req.headers[ "authorization" ], "nodeBuildv2" , dbType)
        
        // response
		res.success(url);

	} catch (error){
        console.log(error);
        
		res.preconditionFailed({error});
	}

};
