const {
  PORT = 3000,
  BD_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'secret',
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  PORT,
  BD_URL,
  JWT_SECRET,
  NODE_ENV,
};
