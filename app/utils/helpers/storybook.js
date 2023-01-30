/**
 * Created by stephenkarpinskyj on 5/7/18.
 */

import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';
import { withInfo as sbWithInfo } from '@storybook/addon-info';
import CoolTheme from 'theme/coolTheme';

export const withTheme = storyFn => (
  <MuiThemeProvider theme={CoolTheme}>{storyFn()}</MuiThemeProvider>
);

export const withInfo = opts =>
  sbWithInfo({
    inline: false,
    maxPropsIntoLine: 2,
    // TODO: Find out why props aren't being excluded
    excludedPropTypes: ['classes', 'resaga'],
    ...opts,
  });

const htmlComponentsStoriesOf = name =>
  storiesOf(`htmlComponents/${name}`, module);

const viewComponentsStoriesOf = name =>
  storiesOf(`viewComponents/${name}`, module);

const smartComponentsStoriesOf = name =>
  storiesOf(`smartComponents/${name}`, module);

export const eventToValue = args => [args[0].target.value];

const inputAction = decorateAction([eventToValue]);

const makeProp = (name, value, knobFunc, opts, ...rest) => ({
  name,
  value,
  knobFunc,
  opts,
  ...rest,
});

const prop = (name, value, knobFunc, opts = {}, ...rest) => {
  const { knob = false } = opts;
  return knob ? knobFunc(name, value, ...rest) : value;
};

const props = (arr, defaultOpts = {}) =>
  arr.reduce(
    (obj, { name, value, knobFunc, opts, ...rest }) => ({
      ...obj,
      [name]: prop(
        name,
        value,
        knobFunc,
        { ...defaultOpts, ...opts },
        ...[rest],
      ),
    }),
    {},
  );

export default {
  htmlComponentsStoriesOf,
  viewComponentsStoriesOf,
  smartComponentsStoriesOf,
  inputAction,
  makeProp, // TODO: Find better name
  prop,
  props,
};
