class IdentifyError extends Error {
    constructor(args){
        super(args);
        this.name = "IdentifyError"
    }
}

module.exports = IdentifyError