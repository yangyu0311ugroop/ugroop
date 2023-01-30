import React from 'react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import sb, { withTheme, withInfo } from 'utils/helpers/storybook';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Input, { Input as InputComponent } from '.';

Input.displayName = 'Input';

const render = (p = {}, opts = {}) => {
  const {
    defaultValue = Input.defaultProps.defaultValue,
    value = Input.defaultProps.value,
    placeholder = 'Some placeholder',
    disableUnderline = Input.defaultProps.disableUnderline,
    ...rest
  } = p;
  return (
    <Input
      {...sb.props(
        [
          sb.makeProp('defaultValue', defaultValue, text),
          sb.makeProp('value', value, text),
          sb.makeProp('placeholder', placeholder, text),
          sb.makeProp('disableUnderline', disableUnderline, boolean),
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
    text:
      'Any other properties will be spread to the root element ([Input](https://material-ui.com/api/input)).',
    propTables: [InputComponent],
    propTablesExclude: [Input],
  },
  render: () => render({}, { knob: true }),
};

const demos = {
  info: {
    propTablesExclude: [GridContainer, GridItem, Input],
  },
  render: () => (
    <GridContainer>
      <GridItem>{render()}</GridItem>
      <GridItem>{render({ defaultValue: 'Default value' })}</GridItem>
      <GridItem>{render({ value: 'Controlled value' })}</GridItem>
      <GridItem>
        {render({ error: true, defaultValue: 'Error value' })}
      </GridItem>
      <GridItem>
        {render({ disabled: true, defaultValue: 'Disabled value' })}
      </GridItem>
    </GridContainer>
  ),
};

sb.viewComponentsStoriesOf('Inputs/Input')
  .addDecorator(withTheme)
  .addDecorator(withKnobs)
  .add('Usage', withInfo(usage.info)(usage.render))
  .add('Demos', withInfo(demos.info)(demos.render));

export default {
  usage,
  demos,
};
