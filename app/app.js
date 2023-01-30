/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';
import { initializeAmplifyAPI } from 'lib/amplify';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
// Import root app
import App from 'containers/App';
import resaga from 'resaga';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'react-block-ui/style.css';
import 'react-phone-number-input/style.css';
import '@ugr00p/react-big-calendar/lib/css/react-big-calendar.css';
import '@ugr00p/stream-chat-react/dist/css/index.css';
import Firebase, { FirebaseContext } from 'lib/firebase';
import { getDataStoreState } from 'utils/reduxStoreHelper';
import {
  GLOBAL_STORE,
  LOGIN_STATUS,
  UGROOP_COGNITO_DATASTORE,
  REFRESH_TOKEN_ERROR,
} from 'appConstants';
import { persistStore } from 'redux-persist-immutable';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions
import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';
// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
import { config } from './persistlayer/config';
import {
  removeItemFromLocalForageAsync,
  localSave,
  removeItemFromLocalStorage,
  configureLocalForage,
} from './persistlayer';
import {
  USERLOGIN,
  USERLOGOUT,
  REFRESH_TOKEN_EXPIRY,
} from './containers/App/constants';

import '../linearicons/style.css';
import '../ugroopicons/style.css';

initializeAmplifyAPI();

const logout = () => ({
  type: USERLOGOUT,
});

const forceLogOutWarning = () => ({
  type: REFRESH_TOKEN_EXPIRY,
  value: 'Your session with uGroop has been terminated. Please login again.',
});

resaga.setErrorHandler(error => {
  if (error.statusCode === 400 && error.error === REFRESH_TOKEN_ERROR) {
    return [logout, forceLogOutWarning];
  }
  return false;
});

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const ibmObserver = new FontFaceObserver('IBM Plex Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
ibmObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const linearIconsObserver = new FontFaceObserver('LinearIcons', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
linearIconsObserver.load().then(
  () => {
    document.body.classList.add('fontLoaded');
  },
  () => {
    document.body.classList.remove('fontLoaded');
  },
);

/*
 Get the Global user action state.
 */
const userActionSelect = state => {
  const global = getDataStoreState(state, GLOBAL_STORE);
  return global.userAction;
};

/*
 Get the Stormpath account so it can persist to localStorage.
 */

const observeLoginState = (localstore, select) => {
  let currentState;
  const handleChange = () => {
    const nextState = select(localstore.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      if (nextState === USERLOGIN) {
        localSave(LOGIN_STATUS, USERLOGIN);
      } else if (nextState === USERLOGOUT) {
        // flush the redux data here
        removeItemFromLocalStorage(LOGIN_STATUS);
        removeItemFromLocalForageAsync(UGROOP_COGNITO_DATASTORE);
      }
    }
  };
  const unsubscribe = localstore.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

observeLoginState(store, userActionSelect);

// configure the localForage
configureLocalForage();

// Set up the router, wrapping all Routes in the App component
// const rootRoute = <Route component={App}>{createRoutes(store)}</Route>;

const MOUNT_NODE = document.getElementById('app');
const fireBaseInstance = new Firebase();
const renderApp = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <FirebaseContext.Provider value={fireBaseInstance}>
            <App history={history} />
          </FirebaseContext.Provider>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

let persisted = false;

// delay render until store is persisted, to prevent flickering screen
const render = messages => {
  if (!persisted) {
    persistStore(store, config, () => {
      persisted = true;
      renderApp(messages);
    });
  } else {
    renderApp(messages);
  }
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    ) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  const OfflinePluginRuntime = require('offline-plugin/runtime'); // eslint-disable-line global-require
  OfflinePluginRuntime.install({
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    onUpdated: () => {
      window.swUpdate = Date.now();
    },
  });
}
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // whyDidYouRender(React, {
  //   include: [
  //     /^RenderDay/gm,
  //     /[e|E]vents/gm,
  //     /^UG[e|E]vents./gm,
  //     /^Day./gm,
  //     /^VerticalEventsOnDay./gm,
  //     /^StreamChat./gm,
  //   ],
  // });
  whyDidYouRender(React, {
    include: [/^StreamChat./gm],
  });
}
