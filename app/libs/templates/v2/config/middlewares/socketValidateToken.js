const jwt = require('jsonwebtoken');
const config = require('../env/jwt');

module.exports = function( socket , data ) {

    let token = data[ "authorization" ];
	if(token) token = token.split(' ')[1];

    if ( token ) {

        jwt.verify( token, config.jwt_secret, function( err, decoded ) {

            if ( err ) {
                new Error("Authentication error")
            }

            socket.user = decoded;

        } );
        
    }

    new Error("Authentication error")
};
