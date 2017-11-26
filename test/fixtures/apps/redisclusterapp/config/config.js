'use strict';

exports.redis = {
  client: {
    cluster: true,
    nodes: [{
      host: '127.0.0.1',
      port: 30001,
      password: '',
      db: '0',
    }, {
      host: '127.0.0.1',
      port: 30002,
      password: '',
      db: '0',
    }]
  },
  agent: true
};

exports.keys = 'keys';
