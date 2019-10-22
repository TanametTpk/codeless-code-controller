const api = require('../classes')
const DatabaseMeta = require('../classes/databaseMeta')
const Attribute = require('../classes/attribute')

const executeGenerate = async (projectID , requirement, token) => {

    let {schemas , port , secret} = requirement

    // call api (send authrization for auth to app server)
    let projectInfo = await api.application.getProjectInfomation(projectID, token)
    projectInfo = projectInfo.data
    let appname = projectInfo.name

    // build
    let url = await api.generator.nodeBuild(projectID , projectInfo , appname , schemas , port , secret )
    url = url.data

    return url

}

exports.generate = async (req , res) => {

	try{

        // get variable
        let { projectID , requirement} = req.body

        //build
        let url = await executeGenerate(projectID , requirement, req.headers[ "authorization" ])
        
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
        let { projectID } = req.body

        // find database
        let schemas = await DatabaseMeta.findManyAndPopulate({project: projectID})

        // find attribute
        schemas = await Promise.all(schemas.map( async (schema) => {

            // find attribute
            let attributes = await Attribute.findManyAndPopulate({databaseMeta:schema._id}, "ref subObjects")
            schema["attributes"] = attributes.map((attribute) => {
                if (attribute.type === "id") attribute.ref = attribute.ref.name
                return attribute
            })

            return schema

        }))

        let requirement = {
            schemas,
            port:80,
            secret:projectID
        }

        //build
        let url = await executeGenerate(projectID , requirement, req.headers[ "authorization" ])
        
        // response
		res.success(url);

	} catch (error){
        console.log(error);
        
		res.preconditionFailed({error});
	}

};

// exports.generate = async (req , res) => {

// 	try{

//         // get variable
//         let { projectID , templateID , fieldValue } = req.body

//         // call api
//         let projectProm = api.application.getProjectInfomation(projectID)
//         let templateProm = api.template.getTemplate(templateID , fieldValue)

//         // wait for response
//         let [projectInfo, templateInfo] = await Promise.all([ projectProm, templateProm ]);
//         projectInfo = projectInfo.data
//         templateInfo = templateInfo.data

//         // build
//         let url = await api.generator.build(projectID , fieldValue , projectInfo , templateInfo.triggerFieldMap , templateInfo.trigger )
//         url = url.data
        
//         // response
// 		res.success(url);

// 	} catch (error){
//         console.log(error);
        
// 		res.preconditionFailed({error});
// 	}

// };