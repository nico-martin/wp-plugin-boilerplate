import React from 'react';
import ReactDOM from 'react-dom';

import { Route, useLocation } from './utils/location';
import { SettingsProvider } from './utils/settings';
import { __ } from './utils/i18n';
import { Page, TabNavigation } from './theme';
import PageAbout from './pages/PageAbout';
import PageSettings from './pages/PageSettings';

const app = document.querySelector('#PREFIX-app');

const App = () => {
  const location = useLocation();

  return (
    <Page title={__('plugin.name') + `: ${location}`}>
      <TabNavigation
        links={{
          '': 'About',
          settings: 'Settings',
        }}
      />
      <Route page="">
        <PageAbout />
      </Route>
      <Route page="settings">
        <PageSettings />
      </Route>
    </Page>
  );
};

if (app) {
  ReactDOM.render(
    <SettingsProvider>
      <App />
    </SettingsProvider>,
    app
  );
}
