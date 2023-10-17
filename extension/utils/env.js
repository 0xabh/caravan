const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.PORT", process.env.PORT);
console.log("process.env.DB_PVT_KEY", process.env.REACT_APP_DB_PVT_KEY);

// tiny wrapper with default env vars
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,
  DB_PVT_KEY: process.env.REACT_APP_DB_PVT_KEY || '2ebef29302a8f96ae74fd535e8f76bb970914d89760635bbbbfb60dc640afbca',
};