const dcspawn = require('./docker-compose-spawn');

module.exports = async () => {
  console.log('Setup services for tests');
  const dcUp = dcspawn(['up', '-d']);

  await dcUp;

  console.log('Determining test service ports');
  const dcRabbitPort = dcspawn(['port', 'rabbitmq', '5672']);

  const dcRedisPort = dcspawn(['port', 'redis', '6379']);

  const dcPostgresPort = dcspawn(['port', 'postgres', '5432']);

  const { stdout: rabbitStr } = await dcRabbitPort;
  const rabbitPort = rabbitStr.replace('0.0.0.0:', '');
  process.env.AMQP_URL = `amqp://amqpuser:amqppass@localhost:${rabbitPort}/`;
  console.log('AMQP Port:', rabbitPort);

  const { stdout: redisStr } = await dcRedisPort;
  const redisPort = redisStr.replace('0.0.0.0:', '');
  process.env.REDIS_URL = `redis://localhost:${redisPort}`;
  console.log('Redis Port:', redisPort);

  const { stdout: postgresStr } = await dcPostgresPort;
  const postgresPort = postgresStr.replace('0.0.0.0:', '');
  process.env.DATABASE_URL = `postgres://postgres:postgres@localhost:${postgresPort}/postgres`;
  console.log('PostgreSQL Port:', postgresPort);

  return;
};
