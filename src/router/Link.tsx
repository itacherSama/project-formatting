// eslint-disable-next-line import/no-cycle
import React from 'react';
import { basename } from './router';
import history from './history';
import { IMyLink } from '../interfaces/items';

function noOp() {}

const createOnClickAnchor = (callback: any) => {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    history.navigate(e.currentTarget.getAttribute('href'));
    callback(e);
  };
};

export default ({ href, onClick = noOp, children, ...rest }: IMyLink): React.ReactElement => (
  <a href={basename + href} onClick={createOnClickAnchor(onClick)} {...rest}>
    {children}
  </a>
);
