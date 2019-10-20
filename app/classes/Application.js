const axios = require('axios')
const config = require('../../config/env/network.config')

const getProjectInfomation = (projectID, token) => {

	return axios.get( config.application_host + `/project/${projectID}`, { headers: { Authorization: `${token}`}})

}

module.exports = {
	getProjectInfomation,

};
