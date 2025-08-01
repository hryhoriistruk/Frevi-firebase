// shared/vault.js
const vault = require('node-vault')();

class SecretManager {
    static async getDatabaseCredentials() {
        const { data } = await vault.read('database/creds/microservice-role');
        return {
            user: data.username,
            password: data.password
        };
    }
}