const api = require('../classes')

exports.generate = async (req , res) => {

	try{

        // get variable
        let { projectID , requirement} = req.body
        let { schemas , port , secret } = requirement

        // call api
        let projectInfo = await api.application.getProjectInfomation(projectID)
        projectInfo = projectInfo.data
        let appname = projectInfo.name

        // build
        let url = await api.generator.nodeBuild(projectID , projectInfo , appname , schemas , port , secret )
        url = url.data
        
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