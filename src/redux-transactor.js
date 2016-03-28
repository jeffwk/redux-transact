import log from 'loglevel';
import {Promise} from 'bluebird';
import _ from 'underscore.lifted';

const global = global || {};
const window = window || {};
const $ = $ || window.$ || global.$ || require('jquery');

const ajax = $.ajax;

const defaultErrorHandler = (e) => {
  log.error('Error received in transactor');
  log.error(e);
  throw e;
};

/**
 * Simple convention for executing an ajax request in a
 * reducer and creating a promise for the result.
 */
export default (route, resultHandler, errorHandler = defaultErrorHandler) =>
  (dispatch, getState) =>
    _.lift(_(route).isFunction())
    .map(() => route(getState()))
    .orElse(() => route)
    .map((fetchRoute) =>
      new Promise((resolve, reject) =>
        ajax(fetchRoute).then((resp) =>
          _.lift(resp.errors)
          .map((errs) => reject(errs))
          .orElse(() => resolve(resp))
          .unlift()
        )
      )
      // feed the server response into the appropriate handler, and dispatch.
      .then(
        _.compose(dispatch, resultHandler)
      )
      .catch(
        errorHandler
      )
    )
    .unlift();
