import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './presenters/includes/error-boundary';
import { AnalyticsContext } from './presenters/analytics';
import { CurrentUserProvider } from './presenters/current-user';
import { UserPrefsProvider } from './presenters/includes/user-prefs';
import { DevTogglesProvider } from './presenters/includes/dev-toggles';
import { Notifications } from './presenters/notifications';

import Router from './presenters/pages/router';

const App = () => (
  <ErrorBoundary fallback="Something went very wrong, try refreshing?">
    <BrowserRouter>
      <Notifications>
        <UserPrefsProvider>
          <DevTogglesProvider>
            <AnalyticsContext context={{ groupId: '0' }}>
              <CurrentUserProvider>
                {api => <Router api={api} />}
              </CurrentUserProvider>
            </AnalyticsContext>
          </DevTogglesProvider>
        </UserPrefsProvider>
      </Notifications>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
