//  application configuration
const appConfig = {
    'port': process.env.PORT || 3000,
    'mongoConnectString': 'mongodb://mongo:27017/nodejs'
};

module.exports = appConfig;