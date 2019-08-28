const axios = require('axios')
const config = require('../../config/env/network.config')

const getTemplate = (templateID , fieldValue) => {

	let fieldIDs = fieldValue.map((fv) => fv.field)

	return axios.post( config.template_host + "/code" , {templateID , fieldIDs} )

}

module.exports = {
	getTemplate,

};
