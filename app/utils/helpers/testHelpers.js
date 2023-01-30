import toJSON from 'enzyme-to-json';
import React from 'react';
import { shallow } from 'enzyme/build/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';

import LanguageProvider from 'containers/LanguageProvider';
import CoolTheme from 'theme/coolTheme';
import history from 'utils/history';
import configureStore from 'configureStore';

import { translationMessages } from '../../i18n';

const renderWithRedux = (component, initialState = {}) => {
  const store = configureStore(initialState, history);
  return render(
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <MuiThemeProvider theme={CoolTheme}>{component}</MuiThemeProvider>
      </LanguageProvider>
    </Provider>,
    document.body,
  );
};

const expectMatchSnapshot = (func, params = []) => {
  const snapshot = shallow(
    <div>{LOGIC_HELPERS.ifFunction(func, params, func)}</div>,
  );

  expect(toJSON(snapshot)).toMatchSnapshot();
};

const expectNull = (func, params = []) => {
  expect(LOGIC_HELPERS.ifFunction(func, params, func)).toBe(null);
};

const expectCalledAndMatchSnapshot = (func, ...expected) => {
  if (expected.length) {
    return expect(func).toBeCalledWith(...expected);
  }

  expect(func).toBeCalled();
  return expect(func.mock.calls).toMatchSnapshot();
};

const expectCalled = (func, expected = []) => {
  if (expected.length) {
    return expect(func).toBeCalledWith(...expected);
  }

  return expect(func).toBeCalled();
};
const expectNotCalled = func => {
  expect(func).not.toBeCalled();
};
const expectDefined = (value, params) => {
  expect(LOGIC_HELPERS.ifFunction(value, [params], value)).toBeDefined();
};
const expectNotDefined = param => {
  expect(param).not.toBeDefined();
};

const toBe = (func, expected, params = []) => {
  expect(LOGIC_HELPERS.ifFunction(func, params, !expected)).toBe(expected);
};

export const TEST_HELPERS = {
  expectNull,
  expectMatchSnapshot,
  expectCalledAndMatchSnapshot,
  expectNotCalled,
  expectCalled,
  expectDefined,
  expectNotDefined,
  toBe,
  renderWithRedux,
};
