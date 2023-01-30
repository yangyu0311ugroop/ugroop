import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import CheckboxWithHOC, { Checkbox } from './index';

const stories = storiesOf('Checkbox Wrapper', module);

stories.addDecorator(withKnobs);

stories.add(
  'basic usage ',
  withInfo({
    text:
      'Basic stuff you can do with checkbox' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [Checkbox],
    propTablesExclude: [CheckboxWithHOC],
  })(() => {
    const label = text('label', '');

    return (
      <CheckboxWithHOC label={label}>
        {text('children', 'Hello World!')}
      </CheckboxWithHOC>
    );
  }),
);
