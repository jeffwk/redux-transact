import _ from 'underscore.lifted';

import transact from '../src/redux-transactor';

describe('transact', () => {
  it('should resolve correctly', () => {
    _(transact({url: 'x'})).isFunction()
  });
});
