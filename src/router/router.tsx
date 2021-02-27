import React from 'react';
import UniversalRouter from 'universal-router';
import App from '../App';
import FirstPage from '../pages/FirstPage';
import ResizePage from '../pages/ResizePage';

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
              <ResizePage />
            );
          },
        },
        {
          path: '/f',
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
                  <FirstPage />
                );
              },
            },
          ]
        },
      ],
    };

export const basename = '';

const router = new UniversalRouter(routes, {
  baseUrl: basename
});

export default router;