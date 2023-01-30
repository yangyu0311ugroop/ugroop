import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import AWithHOC, { A } from './index';

const stories = storiesOf('A', module);
stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [A],
    propTablesExclude: [AWithHOC],
  })(() => {
    const href = text('href', 'https://www.google.com');

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <AWithHOC href={href}>Anchor Tag</AWithHOC>
      </div>
    );
  }),
);
