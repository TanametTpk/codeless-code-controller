const DBFactory = require('./DBFactory')
const { Model, Op, Sequelize } = require('sequelize');

class DBConnector {

    constructor(){
        this.database = undefined
        this.models = {}
        this.associations = {}
        this.Model = Model
        this.DataTypes = Sequelize
        this.Op = Op
    }

    setDatabase(config){
        this.database = DBFactory.connectDatabase(config)
    }

    test_connection(){

        this.database.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    }

    buildAssociation(){

        let models = Object.keys(this.associations)
        models.map((modelName) => {
            
            this.associations[modelName].map((associate) => {

                let {model, association, option} = associate
                this.model(modelName)[association](this.model(model), option)

            })

        })

    }

    sync(){
        this.buildAssociation()
        this.database.sync()
    }

    addModel(model, associations){

        this.models = {
            ...this.models,
            [model.name]: model
        }

        
        if (associations) this.associations = {
            ...this.associations,
            [model.name]:associations
        }

    }

    model(name){
        return this.database.models[name]
    }

}

module.exports = new DBConnector()