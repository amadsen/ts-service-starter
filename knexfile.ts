// http://knexjs.org/#knexfile

async function fetchConfiguration() {
  // TODO: if DATABASE_URL is not set, start up docker-compose-test.yaml's
  // postgres service and use that.
  return {
    client: 'pg',
    connection: process.env.DATABASE_URL
  };
}

module.exports = async () => {
  const configuration = await fetchConfiguration();
  return {
    ...configuration,
    migrations: {
      extension: 'ts'
    }
  };
};
