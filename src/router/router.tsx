import React from 'react';
import UniversalRouter from 'universal-router';
import App from '../App';
import MainPage from '../pages/MainPage';

const routes =
    {
      path: '/',
      async action({ next }: any) {
        const children = await next();
        return (
          <App>
            { children }
          </App>
        );
      },
      children: [
        {
          path: '',
          async action() {
            return (
              <MainPage />
            );
          },
        },
      ],
    };

export const basename = '';

const router = new UniversalRouter(routes, {
  baseUrl: basename
});

export default router;