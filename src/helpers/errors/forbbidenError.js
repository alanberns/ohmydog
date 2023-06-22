class forbbidenError extends Error {
    constructor() {
        super("No tenés permiso para acceder");

        this.name = "ForbbidenError";
        this.status = 403;
    }

    toJson(){
        return {
            name: this.name,
            status: this.status,
            message: this.message,
        }
    }
}

module.exports = forbbidenError;