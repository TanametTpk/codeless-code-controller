const axios = require('axios')
const config = require('../../config/env/network.config')
const { KeyMaker } = require('../libs/engine')

const build = (userID , field_val , project , triggerFieldMap , trigger) => {

	let keyMaker = new KeyMaker( triggerFieldMap , trigger , field_val)
	let structure = keyMaker.generate()

	// userID , field_val , project , triggerFieldMap , trigger
	return axios.post( config.generator_host + "/builder/build" , {userID , structure , project} )

}

module.exports = {
	build,

};
