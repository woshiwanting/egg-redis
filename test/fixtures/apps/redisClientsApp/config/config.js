'use strict';

exports.redis = {
  clients: {
    first: {                 // instanceName. See below
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: 'auth',
      db: 0,
    },
    second: {
      port: 6379,
      host: '127.0.0.1',
      password: 'auth',
      db: 1,
    },
  }
};

exports.keys = 'keys';
