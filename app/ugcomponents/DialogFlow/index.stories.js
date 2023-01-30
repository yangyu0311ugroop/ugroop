import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import DialogFlowWithContainer, { DialogFlowContainer } from './index';

const stories = storiesOf('DialogFlow', module);

stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [DialogFlowContainer],
    propTablesExclude: [DialogFlowWithContainer],
  })(() => {
    const isFullWidth = boolean('isFullWidth', true);
    const isOpen = boolean('isOpen', true);
    const actionBtnSize = text('actionBtnSize', 'small');
    const isManuallyControlled = boolean('isManuallyControlled', false);
    const isDiscardBtnHidden = boolean('isDiscardBtnHidden', true);
    const isXBtnHidden = boolean('isXBtnHidden', false);
    const inputToBeValidated = object('inputToBeValidated', { input: '' });
    const isBeingDiscarded = boolean('isBeingDiscarded', false);

    return (
      <DialogFlowContainer
        isManuallyControlled={isManuallyControlled}
        isOpen={isOpen}
        isFullWidth={isFullWidth}
        actionBtnSize={actionBtnSize}
        isXBtnHidden={isXBtnHidden}
        isDiscardBtnHidden={isDiscardBtnHidden}
        inputToBeValidated={inputToBeValidated}
        isBeingDiscarded={isBeingDiscarded}
        onClose={() => {}}
        onSave={() => {}}
      >
        {text('children', 'Hello World!')}
      </DialogFlowContainer>
    );
  }),
);
