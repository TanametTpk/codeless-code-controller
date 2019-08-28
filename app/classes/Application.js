const axios = require('axios')
const config = require('../../config/env/network.config')

const getProjectInfomation = (projectID) => {

	return axios.get( config.application_host + `/project/${projectID}` )

}

module.exports = {
	getProjectInfomation,

};
