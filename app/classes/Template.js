const axios = require('axios')
const config = require('../../config/env/network.config')

const getTemplate = (templateId , fieldValue) => {

	let fieldIDs = fieldValue.map((fv) => fv.field)

	return axios.post( config.template_host + "/api/v1/code" , {templateId , fieldIDs} )

}

module.exports = {
	getTemplate,

};
