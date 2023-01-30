import React from 'react';
import { withKnobs, boolean, object } from '@storybook/addon-knobs';
import sb, { withTheme, withInfo } from 'utils/helpers/storybook';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Select, { Select as SelectComponent } from '.';

Select.displayName = 'Select';

// TODO: Decide whether options should be array or object
const toOption = (value, children) => ({ value, children });

const defaultOptions = [toOption('1', 'One'), toOption('2', 'Two')];
const controlledOptions = [
  toOption('1', 'Controlled 1'),
  toOption('2', 'Controlled 2'),
];
const controlledValue = controlledOptions[0].value;
const errorOptions = [toOption('1', 'Error 1'), toOption('2', 'Error 2')];
const disabledOptions = [toOption('1', 'Disabled')];
const nonNativeOptions = [
  toOption('1', 'Non-native 1'),
  toOption('2', 'Non-native 2'),
];
const nonNativeValue = nonNativeOptions[0].value;

const render = (p = {}, opts = {}) => {
  const {
    options = defaultOptions,
    native = Select.defaultProps.native,
    ...rest
  } = p;
  return (
    <Select
      {...sb.props(
        [
          sb.makeProp('options', options, object),
          sb.makeProp('native', native, boolean),
        ],
        opts,
      )}
      onChange={sb.inputAction('onChange')}
      {...sb.prop('rest', rest, object, opts)}
    />
  );
};

const renderValue = value => {
  const { children } = nonNativeOptions.find(o => o.value === value);
  return <b>{children}</b>;
};

const usage = {
  info: {
    text:
      'Any other properties will be spread to the root element ([Select](https://material-ui.com/api/select)).',
    propTables: [SelectComponent],
    propTablesExclude: [Select],
  },
  render: () => render({}, { knob: true }),
};

const demos = {
  info: {
    propTablesExclude: [GridContainer, GridItem, Select],
  },
  render: () => (
    <GridContainer>
      <GridItem>{render()}</GridItem>
      <GridItem>
        {render({ options: controlledOptions, value: controlledValue })}
      </GridItem>
      <GridItem>{render({ options: errorOptions, error: true })}</GridItem>
      <GridItem>
        {render({ options: disabledOptions, disabled: true })}
      </GridItem>
      <GridItem>
        {render({
          options: nonNativeOptions,
          value: nonNativeValue,
          native: false,
          renderValue,
        })}
      </GridItem>
    </GridContainer>
  ),
};

sb.viewComponentsStoriesOf('Inputs/Select')
  .addDecorator(withTheme)
  .addDecorator(withKnobs)
  .add('Usage', withInfo(usage.info)(usage.render))
  .add('Demos', withInfo(demos.info)(demos.render));

export default {
  usage,
  demos,
};
