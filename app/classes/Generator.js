const axios = require('axios')
const config = require('../../config/env/network.config')

const build = (userID , field_val , project , triggerFieldMap , trigger) => {

	// userID , field_val , project , triggerFieldMap , trigger
	return axios.post( config.generator_host + "/builder/build" , {userID , field_val , project , triggerFieldMap , trigger} )

}

module.exports = {
	build,

};
