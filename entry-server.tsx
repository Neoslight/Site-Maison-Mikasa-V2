import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export function render(url: string): string {
  try {
    return renderToString(
      <React.StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </React.StrictMode>
    );
  } catch (err) {
    // SSR may fail for pages with browser-only third-party code (e.g. @calcom/embed-react).
    // The route will fall back to empty shell — the SPA hydrates on the client.
    console.warn(`[prerender] SSR render skipped for ${url}:`, (err as Error).message);
    return '';
  }
}
