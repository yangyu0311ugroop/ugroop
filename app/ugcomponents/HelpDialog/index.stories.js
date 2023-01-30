import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { decorateAction } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { IntlProvider } from 'react-intl';
import { HelpDialog } from './index';

const stories = storiesOf('HelpDialog component', module);

const logAction = decorateAction([args => args.slice(0, 1)]);

stories.addDecorator(withKnobs);

stories.add(
  'basic usage ',
  withInfo({
    text: 'The HelpDialog component',
    inline: false,
    propTables: [HelpDialog],
  })(() => (
    <IntlProvider locale="en">
      <HelpDialog
        open={boolean('open', false)}
        onClose={logAction('onClose')}
        dialogTitle={text('dialogTitle', 'Help Title')}
        className={text('className', 'my-help-dialog')}
      >
        <p>Sample help statement one.</p>
        <p>Sample help statement two.</p>
        <p>Sample help statement three.</p>
      </HelpDialog>
    </IntlProvider>
  )),
);
