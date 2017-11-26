'use strict';

const assert = require('assert');
const Redis = require('ioredis');

module.exports = app => {
  app.addSingleton('redis', createClient);
};

let count = 0;

function createClient(config, app) {
  let client;

  if (config.cluster === true) {
    assert(config.nodes && config.nodes.length !== 0, '[egg-redis] cluster nodes configuration is required when use cluster redis');

    config.nodes.forEach(client => {
      assert(client.host && client.port && client.password !== undefined && client.db !== undefined,
        `[egg-redis] 'host: ${client.host}', 'port: ${client.port}', 'password: ${client.password}', 'db: ${client.db}' are required on config`);
    });
    app.coreLogger.info('[egg-redis] cluster connecting start');

    client = new Redis.Cluster(config.nodes, config);
    client.on('connect', function() {
      app.coreLogger.info('[egg-redis] cluster connect success');
    });
    client.on('error', function(error) {
      app.coreLogger.error(error);
    });
  } else if (config.sentinels) {
    const sentinels = config.sentinels;
    assert(sentinels.length !== 0 && config.name !== undefined && config.password !== undefined,
     '[egg-redis] sentinel nodes configuration, redis name and redis password are required when use sentinel redis');

    sentinels.forEach(sentinel => {
      assert(sentinel.host && sentinel.port,
        `[egg-redis] 'host: ${sentinel.host}', 'port: ${sentinel.port}' are required on config`);
    });
    app.coreLogger.info('[egg-redis] sentinel connecting start');

    client = new Redis(config);
    client.on('connect', function() {
      app.coreLogger.info('[egg-redis] sentinel connect success');
    });
    client.on('error', function(error) {
      app.coreLogger.error(error);
    });
  } else {
    assert(config.host && config.port && config.password !== undefined && config.db !== undefined,
      `[egg-redis] 'host: ${config.host}', 'port: ${config.port}', 'password: ${config.password}', 'db: ${config.db}' are required on config`);

    app.coreLogger.info('[egg-redis] connecting redis://:%s@%s:%s/%s',
      config.password, config.host, config.port, config.db);

    client = new Redis(config);
    client.on('connect', function() {
      app.coreLogger.info('[egg-redis] connect success on redis://:%s@%s:%s/%s',
        config.password, config.host, config.port, config.db);
    });
    client.on('error', function(error) {
      app.coreLogger.error(error);
    });
  }

  app.beforeStart(function* () {
    const result = yield client.info();
    const index = count++;
    app.coreLogger.info(`[egg-redis] instance[${index}] status OK, redis currentTime: ${result[0]}`);
  });

  return client;
}
