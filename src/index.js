const Flint = require('gun-flint');
const GunMongo = require('./gun-mongo');
module.exports = Flint.register(GunMongo);