// services/assistance/geolocation.js
const Maxmind = require('maxmind');

class GeoService {
    constructor() {
        this.db = Maxmind.openSync('GeoLite2-City.mmdb');
    }

    getCity(ip) {
        return this.db.get(ip).city;
    }
}