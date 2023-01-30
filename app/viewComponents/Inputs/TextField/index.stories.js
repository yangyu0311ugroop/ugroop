import React from 'react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import sb, { withTheme, withInfo } from 'utils/helpers/storybook';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import TextField, { TextField as TextFieldComponent } from '.';

TextField.displayName = 'TextField';

const render = (p = {}, opts = {}) => {
  const {
    disabled = false,
    error = false,
    helperText = 'Some helper text',
    label = 'Some label',
    ...rest
  } = p;
  return (
    <TextField
      {...sb.props(
        [
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
      'Any other properties will be spread to the root element ([TextField](https://material-ui.com/api/text-field)).',
    propTables: [TextFieldComponent],
    propTablesExclude: [TextField],
  },
  render: () => render({}, { knob: true }),
};

const demos = {
  info: {
    propTablesExclude: [GridContainer, GridItem, TextField],
  },
  render: () => (
    <GridContainer>
      <GridItem>{render()}</GridItem>
      <GridItem>
        {render({ defaultValue: 'Some value', label: 'Default' })}
      </GridItem>
      <GridItem>
        {render({ value: 'Some value', label: 'Controlled' })}
      </GridItem>
      <GridItem>{render({ error: true, label: 'Error' })}</GridItem>
      <GridItem>{render({ disabled: true, label: 'Disabled' })}</GridItem>
    </GridContainer>
  ),
};

sb.viewComponentsStoriesOf('Inputs/TextField')
  .addDecorator(withTheme)
  .addDecorator(withKnobs)
  .add('Usage', withInfo(usage.info)(usage.render))
  .add('Demos', withInfo(demos.info)(demos.render));

export default {
  usage,
  demos,
};
