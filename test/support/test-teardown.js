const dcspawn = require('./docker-compose-spawn');

module.exports = async () => {
  console.log('Shutting down test services');
  const dcDown = dcspawn(['down']);

  await dcDown;

  return;
};
