'use strict';

module.exports = app => {
  return class HomeController extends app.Controller {
    * index() {
      const { ctx, app } = this;
      // set
      yield app.redis.get('first').set('foo', 'bar');
      // get
      ctx.body = yield app.redis.get('first').get('foo');
    }
  };
};
