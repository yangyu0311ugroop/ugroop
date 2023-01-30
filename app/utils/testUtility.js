import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import history from 'utils/history';
import { SWRConfig } from 'swr';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import configureStore from '../configureStore';
import CoolTheme from '../theme/coolTheme';
/* eslint-disable no-param-reassign default-case */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */

function renderWithRedux(
  ui,
  { initialState, store = configureStore(initialState, {}) } = {},
) {
  const obj = {
    ...render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Provider store={store}>
          <MuiThemeProvider theme={CoolTheme}>{ui}</MuiThemeProvider>
        </Provider>
      </SWRConfig>,
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
  obj.rerenderWithRedux = el => renderWithRedux(el, { store }, obj.rerender);
  return obj;
}

function renderWithReduxWithRouter(
  ui,
  { initialState, store = configureStore(initialState, {}) } = {},
) {
  const obj = {
    ...render(
      <Provider store={store}>
        <MuiThemeProvider theme={CoolTheme}>
          <ConnectedRouter history={history}>{ui}</ConnectedRouter>
        </MuiThemeProvider>
      </Provider>,
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
  obj.rerenderWithReduxWithRouter = el =>
    renderWithReduxWithRouter(el, { store }, obj.rerender);
  obj.history = history;
  return obj;
}

function withRedux(
  ui,
  { initialState, store = configureStore(initialState, {}) },
) {
  const view = (
    <Provider store={store}>
      <MuiThemeProvider theme={CoolTheme}>
        <ConnectedRouter history={history}>{ui}</ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  );
  return {
    view,
    store,
  };
}

function dispatchRequestSuccessAction(
  store,
  API,
  RequestFn,
  Response,
  options,
) {
  store.dispatch({
    type: `OK___${API}_${RequestFn}_successfully`,
    name: API,
    requestName: RequestFn,
    result: Response,
    options,
  });
}

function dispatchSetValue(store, keyName, path, value) {
  store.dispatch({
    type: `SET__${keyName}_${path}`,
    keyPath: [keyName, path],
    value,
    name: keyName,
  });
}

function resizeWindow(width, height) {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
}

// eslint-disable-next-line no-unused-vars
const reduxEnhancer = data => store => next => action => {
  if (action.type.startsWith('NOW')) {
    if (action.options.callback && action.options.callback.onSuccess) {
      data.dispatch(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.API[action.requestName] = action.options.callback.onSuccess;
        draft.API[`${action.requestName}OnError`] =
          action.options.callback.onError;
      });
    }
    if (action.options.configs.processResult) {
      data.dispatch(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.API[`${action.requestName}ProcessResult`] =
          action.options.configs.processResult;
        draft.API[`${action.requestName}Payload`] = action.payload;
      });
    }
  }
  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
};

const SizeWrapper = props => {
  const theme = createMuiTheme({
    props: { MuiWithWidth: { initialWidth: 'md' } },
  });

  // eslint-disable-next-line react/prop-types
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
};

export {
  renderWithRedux,
  renderWithReduxWithRouter,
  withRedux,
  dispatchRequestSuccessAction,
  dispatchSetValue,
  resizeWindow,
  reduxEnhancer,
  SizeWrapper,
};
