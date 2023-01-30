import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import GroupButtonWithHOC, { GroupButton } from './index';

const stories = storiesOf('GroupButton', module);

stories.addDecorator(withKnobs);

stories.add(
  'basic usage ',
  withInfo({
    text:
      'Basic usage for Group Button component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [GroupButton],
    propTablesExclude: [GroupButtonWithHOC],
  })(() => {
    const first = object('first item in btnList props', {
      label: 'List',
      icon: 'list4',
      value: 'list',
    });
    const second = object('second item in btnList props', {
      label: 'Card',
      icon: 'grid',
      value: 'card',
    });
    const third = object('third item in btnList props', {
      label: 'Title',
      icon: 'menu-square',
      value: 'title',
    });
    const cClassname = text('containerClassname', 'sample');
    const bClassname = text('buttonClassname', 'btn-sample');
    const sampleBtnItemsShape = [first, second, third];
    const initSelected = text('initSelected', 'list');
    return (
      <GroupButtonWithHOC
        buttonClassname={bClassname}
        containerClassname={cClassname}
        onClick={action('item selected')}
        btnItems={sampleBtnItemsShape}
        initSelected={initSelected}
      />
    );
  }),
);
