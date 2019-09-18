class Error {
    constructor(status, message, type) {
        this.status = status;
        this.message = message;
        this.type = type;
    }

    getMessage() {
        return this.message;
    }
}

module.exports = Error;