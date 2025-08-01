const consul = require('consul')();

class ServiceDiscovery {
    static async registerService(service) {
        await consul.agent.service.register({
            name: service.name,
            address: service.ip,
            port: service.port,
            check: {
                http: `http://${service.ip}:${service.port}/health`,
                interval: '10s'
            }
        });
    }

    static async discoverService(name) {
        const services = await consul.agent.services();
        return Object.values(services).find(s => s.Service === name);
    }
}

module.exports = ServiceDiscovery;