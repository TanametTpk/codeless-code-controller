const api = require('../classes')

exports.generate = async (req , res) => {

	try{

        // get variable
        let { projectID , templateID , fieldValue } = req.body

        // call api
        let projectProm = api.application.getProjectInfomation(projectID)
        let templateProm = api.template.getTemplate(templateID , fieldValue)

        // wait for response
        let [projectInfo, templateInfo] = await Promise.all([ projectProm, templateProm ]);

        // build
        let url = await api.generator.build(templateInfo.triggerFieldMap , fieldValue , templateInfo.trigger , projectInfo.name)
        
        // response
		res.success({url});

	} catch (error){

		res.preconditionFailed({error});
	}

};