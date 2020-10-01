import { createClient, ClientOpts, RedisClient } from 'redis';

// See https://www.npmjs.com/package/redis for usage

// TODO: consider an async/await or Promises based API
export const client = (
  cfg: ClientOpts,
  ready: (err: Error, c: RedisClient) => void
) => {
  let once = (e: Error, client: RedisClient) => {
    once = (e: Error, client: RedisClient) => undefined;
    return ready(e, client);
  };
  const redisClient = createClient(cfg);
  redisClient.once('ready', () => once(null, redisClient));
  redisClient.once('error', (e) => once(e, null));
};
