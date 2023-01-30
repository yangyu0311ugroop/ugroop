import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Li from 'htmlComponents/Li';
import UlWithHOC, { UlTest as Ul } from './index';

const stories = storiesOf('Ul and Li without Knobs', module);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [Ul],
    propTablesExclude: [UlWithHOC],
  })(() => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <UlWithHOC>
        <Li>List item 1</Li>
        <Li>List item 2</Li>
        <Li>List item 3</Li>
      </UlWithHOC>
    </div>
  )),
);
