const axios = require('axios')
const config = require('../../config/env/network.config')
const { KeyMaker } = require('../libs/engine')
const SchemaReader = require('../libs/DatabaseReader')
const Structure = require('../libs/Structure')

const build = (userID , structure , project) => {

	return axios.post( config.generator_host + "/builder/build" , {userID , structure , project} )

}

const keyMakerBuild = (userID , field_val , project , triggerFieldMap , trigger) => {

	let keyMaker = new KeyMaker( triggerFieldMap , trigger , field_val)
	let structure = keyMaker.generate()

	// userID , field_val , project , triggerFieldMap , trigger
	return build(userID , structure , project)

}

const nodeBuild = (userID , project , appname , schemas , port , secret) => {

	schemas = SchemaReader.read({schemas})
	let structure = new Structure(appname , port , secret )
	schemas.map((s) => {

		structure.addSchema(s)

	})

	return build(userID , structure.generate() , project)
	
}

module.exports = {
	nodeBuild,
	keyMakerBuild

};
