const centroy = require( "../../centroy" )
const middlewares = centroy.configs.middlewares
const routesConfig = centroy.configs.routes

const services = centroy.services
const express = require( "express" );

const createMainController = (routeConfig, routeName) => {
    
    let rootRouter = routeConfig["route.config"]

    delete routeConfig["route.config"]

    const routes = Object.values(routeConfig).sort((a,b) => {

        let priorityA = a.priority || Number.MAX_SAFE_INTEGER
        let priorityB = b.priority || Number.MAX_SAFE_INTEGER

        return priorityA > priorityB ? 1 : -1

    })

    const createController = (method) => {
       
        return async (req , res , next) => {

            try {
        
                res.success(await method(req));
        
            } catch (err){
                next(err)
            }
        
        };
        

    }

    const createParentRouter = (route, child) => {

        const router = express.Router();

        route.middlewares.map((mid) => {
            if (middlewares[mid]) router.use(route.path, middlewares[mid])
        })
        router.use(route.path, child)

        return router

    }

    const createRouter = (routes) => {

        const router = express.Router();

        routes.map((route) => {

            const model = services[route.controller]
            if (!model) return

            const action = createController(model[route.action])

            if (route.middlewares && route.middlewares.length > 0){
                route.middlewares.map((mid) => router[route.method](route.path, middlewares[mid]))
            }
            
            router[route.method](route.path, action)
        
        })
        
        return router

    }

    const createDefaultRootRouter = (name , child) => {
        return express.Router().use(`/${name}` , child)
    }

    let modelRouter = createRouter(routes)

    if (rootRouter) {
        rootRouter = createParentRouter(rootRouter, modelRouter)
    }else{
        rootRouter = createDefaultRootRouter(routeName, modelRouter)
    }

    return rootRouter

}

const mainRouter = express.Router()

const routesKey = Object.keys(routesConfig)
routesKey.map((controllerName) => {
    mainRouter.use(createMainController(routesConfig[controllerName], controllerName))
   
})

module.exports = mainRouter;
