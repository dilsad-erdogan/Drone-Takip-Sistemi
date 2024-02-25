/* const { Entity, Schema } = require('redis-om');
const client =  require('../config/client');

const locationSchema = new Schema('location', {
    verified: { type: 'boolean' },
    location: { type: 'point' },
    locationUpdated: { type: 'date' }
});

const locationRepository = client.fetchRepository(locationSchema);
locationRepository.createIndex();
module.exports = locationRepository;
 */