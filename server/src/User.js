const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

class User {
    id;
    _name;
    _pass;

    constructor() {
        // Define id on creation
        this.id = uuidv4();
    }

    async setPassword(pass) {
        // don't accept if password is longer than 128 characters
        if (pass.length > 128) throw new Error('Password must be less that 128 characters!')
        // create a new promise to wait for
        await new Promise((resolve, reject) => {
            // encrypt the password with salt
            bcrypt.genSalt(10, (err, salt) => {
                // if there was an error reject the promise|
                if (err) reject(err);
                bcrypt.hash(pass, salt, (err, hash) => {
                    // if there was an error reject the promise|
                    if (err) reject(err);
                    // resolve the promise with the hash
                    resolve(hash);
                })
            })
        })
            .then(res => { this._pass = res }) // set the pass to the resultant hash
            .catch(err => { throw err }) // if there was an error in the promise, throw it
    }

    getPassword() {
        return this._pass;
    }

    setUsername(name) {
        // check username length is valid
        if (name.length > 16) throw new Error('Username must be less than 16 characters!');
        this._name = name;
    }

    getUsername() {
        return this._name;
    }
}

module.exports = User