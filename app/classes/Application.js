const axios = require('axios')
const config = require('../../config/env/network.config')

const getBoxInfomation = (boxID, token) => {

	return axios.get( config.application_host + `/boxes/${boxID}`, { headers: { Authorization: `${token}`}})

}

module.exports = {
	getBoxInfomation,

};
