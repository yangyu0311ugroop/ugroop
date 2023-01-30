import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { IntlProvider } from 'react-intl';
import { UploadProgressDialog } from './index';
import { AWAITING_UPLOAD, DONE_UPLOAD, UPLOADING } from './constants';

const stories = storiesOf('UploadProgressDialog component', module);

const dialogStates = [AWAITING_UPLOAD, UPLOADING, DONE_UPLOAD];

stories.addDecorator(withKnobs);

stories.add(
  'basic usage ',
  withInfo({
    text: 'The UploadProgressDialog component',
    inline: false,
    propTables: [UploadProgressDialog],
  })(() => (
    <IntlProvider locale="en">
      <UploadProgressDialog
        dialogState={select('dialogState', dialogStates, UPLOADING)}
        filename={text('filename', 'Attachment.pptx')}
        fileSize={number('fileSize', 239616)}
      />
    </IntlProvider>
  )),
);
