import React from 'react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import sb, { withTheme, withInfo } from 'utils/helpers/storybook';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import SelectField, { SelectField as SelectFieldComponent } from '.';

SelectField.displayName = 'SelectField';

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

const render = (p = {}, opts = {}) => {
  const {
    options = defaultOptions,
    disabled = false,
    error = false,
    helperText = 'Some helper text',
    label = 'Some label',
    SelectProps = SelectField.defaultProps.SelectProps,
    ...rest
  } = p;
  return (
    <SelectField
      {...sb.props(
        [
          sb.makeProp('options', options, object),
          sb.makeProp('SelectProps', SelectProps, object),
          sb.makeProp('disabled', disabled, boolean),
          sb.makeProp('error', error, boolean),
          sb.makeProp('helperText', helperText, text),
          sb.makeProp('label', label, text),
        ],
        opts,
      )}
      onChange={sb.inputAction('onChange')}
      {...sb.prop('rest', rest, object, opts)}
    />
  );
};

const usage = {
  info: {
    // TODO: Figure out how to make component comments work
    text:
      'Any other properties will be spread to the root element (viewComponents/Inputs/TextField).',
    propTables: [SelectFieldComponent],
    propTablesExclude: [SelectField],
  },
  render: () => render({}, { knob: true }),
};

const demos = {
  info: {
    propTablesExclude: [GridContainer, GridItem, SelectField],
  },
  render: () => (
    <GridContainer>
      <GridItem>{render()}</GridItem>
      <GridItem>
        {render({
          options: controlledOptions,
          value: controlledValue,
          label: 'Controlled',
        })}
      </GridItem>
      <GridItem>
        {render({ options: errorOptions, error: true, label: 'Error' })}
      </GridItem>
      <GridItem>
        {render({
          options: disabledOptions,
          disabled: true,
          label: 'Disabled',
        })}
      </GridItem>
    </GridContainer>
  ),
};

sb.viewComponentsStoriesOf('Inputs/SelectField')
  .addDecorator(withTheme)
  .addDecorator(withKnobs)
  .add('Usage', withInfo(usage.info)(usage.render))
  .add('Demos', withInfo(demos.info)(demos.render));

export default {
  usage,
  demos,
};
