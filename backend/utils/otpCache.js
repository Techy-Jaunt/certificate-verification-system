const NodeCache = require('node-cache');

// Cache instance with a TTL of 10 minutes (600 seconds)
const otpCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

module.exports = otpCache;