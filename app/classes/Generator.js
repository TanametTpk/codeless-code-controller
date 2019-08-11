const axios = require('axios')
const config = require('../../config/env/network.config')

const build = (triggerFieldMap , fieldValue , trigger , app_name) => {

	return axios.post( config.generator_host + "/api/v1/builder/build" , {triggerFieldMap , fieldValue , trigger , app_name} )

}

module.exports = {
	build,

};
