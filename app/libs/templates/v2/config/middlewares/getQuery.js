// for import files

module.exports = function( req, res, next ) {

    let {query} = req

    Object.keys(query).map((field) => {

        let value = query[field]

        if (value.includes("$reg")){

            let keyVal = value.split("=")
            if (keyVal.length === 2 && keyVal[0] === "$reg"){

                let valQuery = keyVal[1]
                let reg = new RegExp(valQuery)
                query[field] = reg

            }

        }

        if (value.includes("$in")){

            let keyVal = value.split("=")
            if (keyVal.length === 2 && keyVal[0] === "$in"){

                let valQuery = keyVal[1]
                query[field] = valQuery.split(",")

            }

        }
        

        // number
        if (value.includes("$bt")){

            let keyVal = value.split("=")
            if (keyVal.length === 2 && keyVal[0] === "$bt"){

                let valQuery = keyVal[1]
                let qtAndlt = valQuery.split(",")

                let result = {}
                if (qtAndlt[0]) result["$gt"] = qtAndlt[0]
                if (qtAndlt[1]) result["$lt"] = qtAndlt[1] 

                query[field] = result

                if (Object.keys(result).length < 1) delete query[field]

            }

        }

        // date
        if (value.includes("$date")){

            let keyVal = value.split("=")
            if (keyVal.length === 2 && keyVal[0] === "$date"){

                let valQuery = keyVal[1]
                let qtAndlt = valQuery.split(",")

                let result = {}
                if (qtAndlt[0]) result["$gt"] = new Date(qtAndlt[0])
                if (qtAndlt[1]) result["$lt"] = new Date(qtAndlt[1]) 

                query[field] = result

                if (Object.keys(result).length < 1) delete query[field]

            }

        }

        if (value.includes("$datem")){

            let keyVal = value.split("=")
            if (keyVal.length === 2 && keyVal[0] === "$datem"){

                let valQuery = keyVal[1]
                let qtAndlt = valQuery.split(",")

                let result = {}
                if (qtAndlt[0]) result["$gt"] = new Date(parseInt(qtAndlt[0]))
                if (qtAndlt[1]) result["$lt"] = new Date(parseInt(qtAndlt[1]))

                query[field] = result

                if (Object.keys(result).length < 1) delete query[field]

            }

        }

        if (value.includes("$datee")){

            let keyVal = value.split("=")
            if (keyVal.length === 2 && keyVal[0] === "$datee"){

                let valQuery = keyVal[1]
                query[field] = new Date(valQuery)

            }

        }

    })

    return next();

};
