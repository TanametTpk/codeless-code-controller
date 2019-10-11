const axios = require('axios')
const config = require('../../config/env/network.config')

const getProjectInfomation = (projectID) => {

	// return axios.get( config.application_host + `/project/${projectID}` )
	return {data:{_id:projectID , name:"hello_world"}}

}

module.exports = {
	getProjectInfomation,

};
