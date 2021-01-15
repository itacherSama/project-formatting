import React from 'react';
// eslint-disable-next-line import/no-cycle
import { basename } from './router';
import history from './history';

function noOp(){}

const createOnClickAnchor = (callback) => {
    return (e) => {
        e.preventDefault();
        history.navigate(e.currentTarget.getAttribute('href'));
        callback(e);
    };
};

export default ({ href, onClick = noOp, children, ...rest }) => (
  <a
    href={ basename + href }
    onClick={ createOnClickAnchor(onClick) }
    { ...rest }
  >
    { children }
  </a>
);