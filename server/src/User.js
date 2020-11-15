const bcrypt = require("bcryptjs");
const {v4: uuidv4} = require("uuid");

class User {
    id;
    name;
    _pass;

    constructor() {
        this.id = uuidv4();
    }

    async setPassword(pass) {
        await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) reject(err);
                bcrypt.hash(pass, salt, (err, hash) => {
                    if (err) reject(err);
                    resolve(hash);
                })
            })
        })
            .then(res => { this._pass = res })
            .catch(err => { throw err })
    }

    getPassword() {
        return this._pass
    }
}

module.exports = User