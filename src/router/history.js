import { createBrowserHistory } from 'history';
import parse from 'url-parse';
import deepEqual from 'deep-equal';

const isNode = new Function('try {return this===global;}catch(e){return false;}'); //eslint-disable-line
// eslint-disable-next-line import/no-mutable-exports
let history;

if (!isNode()) {
  history = createBrowserHistory();
  history.navigate = (path, state) => {
    const parsedPath = parse(path);
    const { location } = history;
    if (
      parsedPath.pathname === location.pathname &&
      parsedPath.query === location.search &&
      parsedPath.hash === location.hash &&
      deepEqual(state, location.state)
    ) {
      return;
    }
    // eslint-disable-next-line no-undef
    const args = Array.from(arguments);
    args.splice(0, 2);
    return history.push(...[path, state, ...args]);
  };
} else {
  history = {};
  history.navigate = function () {};
}

export default history;
