'use strict';

const mm = require('egg-mock');
const request = require('supertest');

describe('test/redis.test.js', () => {

  describe('single client', () => {
    let app;
    before(function* () {
      app = mm.app({
        baseDir: 'apps/redisClientApp',
      });
      yield app.ready();
    });
    after(() => app.close());
    afterEach(mm.restore);

    it('should query', () => {
      return request(app.callback())
      .get('/')
      .expect(200)
      .expect('bar');
    });

  });

  describe('multi clients', () => {
    let app;
    before(function* () {
      app = mm.app({
        baseDir: 'apps/redisClientsApp',
      });
      yield app.ready();
    });
    after(() => app.close());
    afterEach(mm.restore);

    it('should query', () => {
      return request(app.callback())
      .get('/')
      .expect(200)
      .expect('bar');
    });

  });

  describe('cluster client', () => {
    let app;
    before(function* () {
      app = mm.app({
        baseDir: 'apps/redisClusterApp',
      });
      yield app.ready();
    });
    after(() => app.close());
    afterEach(mm.restore);

    it('should query', () => {
      return request(app.callback())
      .get('/')
      .expect(200)
      .expect('bar');
    });

  });

  describe('sentinel client', () => {
    let app;
    before(function* () {
      app = mm.app({
        baseDir: 'apps/redisSentinelApp',
      });
      yield app.ready();
    });
    after(() => app.close());
    afterEach(mm.restore);

    it('should query', () => {
      return request(app.callback())
      .get('/')
      .expect(200)
      .expect('bar');
    });

  });
});
