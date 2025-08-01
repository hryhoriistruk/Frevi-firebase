const config = require('config');
const fs = require('fs');

class ConfigService {
    static get(key) {
        return config.get(key);
    }

    static watchConfigChanges() {
        fs.watchFile('config/default.json', () => {
            config.util.extendDeep(config, require('./config/default.json'));
        });
    }
}

// Default configuration
module.exports = {
    database: {
        url: ConfigService.get('database.url'),
        poolSize: ConfigService.get('database.poolSize')
    },
    // ... other configs
};