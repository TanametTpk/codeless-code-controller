class ClassGenerator {

    constructor(database){
        this.database = database
    }

    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}

module.exports = ClassGenerator