import React from 'react';
import CoolTheme from 'theme/coolTheme';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  boolean,
  object,
  number,
  select,
} from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { MuiThemeProvider } from '@material-ui/core/styles';
import UGDialogWithHOC, { UGDialog } from './index';

const stories = storiesOf('UGDialog', module);

stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [UGDialog],
    propTablesExclude: [UGDialogWithHOC],
  })(() => {
    const open = boolean('open', true);
    const button = number('button', 2);
    const type = text('type', 'template');
    const template = select(
      'template',
      ['add', 'confirm', 'delete', 'custom'],
      'delete',
    );
    const dialogTitle = text('dialogTitle', undefined);
    const headlineText = text('headlineText', undefined);
    const headlineIcon = text('headlineIcon', undefined);
    const confirmButton = text('confirmButton', undefined);
    const cancelButton = text('cancelButton', undefined);
    const headlineTitle = text('headlineTitle', 'Japan Template Tour');
    const disabled = boolean('disabled', false);
    const cancelFunc = () => {};
    const confirmFunc = () => {};
    const customChildren = object('customChildren', {
      dialog: '',
      title: '',
      content: '',
      action: '',
    });
    const customClassnames = object('customClassnames', {
      dialog: '',
      title: '',
      content: '',
      action: '',
      headline: '',
    });
    const muiDialogProps = object('muiDialogProps', {});

    return (
      <MuiThemeProvider theme={CoolTheme}>
        <IntlProvider>
          <UGDialogWithHOC
            open={open}
            type={type}
            button={button}
            dialogTitle={dialogTitle}
            headlineIcon={headlineIcon}
            headlineTitle={headlineTitle}
            headlineText={headlineText}
            template={template}
            disabled={disabled}
            confirmButton={confirmButton}
            cancelButton={cancelButton}
            cancelFunc={cancelFunc}
            confirmFunc={confirmFunc}
            customChildren={customChildren}
            customClassnames={customClassnames}
            muiDialogProps={muiDialogProps}
          />
        </IntlProvider>
      </MuiThemeProvider>
    );
  }),
);
