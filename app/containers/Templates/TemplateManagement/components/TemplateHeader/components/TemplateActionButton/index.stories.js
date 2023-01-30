import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theme/coolTheme';
import Icon from 'ugcomponents/Icon';
import TemplateActionButtonWithHOC, { TemplateActionButton } from './index';

const stories = storiesOf('TemplateActionButton component', module);

stories.addDecorator(withKnobs);

stories.add(
  'basic usage ',
  withInfo({
    text:
      'Basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [TemplateActionButton],
    propTablesExclude: [TemplateActionButtonWithHOC],
  })(() => (
    <MuiThemeProvider theme={theme}>
      <TemplateActionButtonWithHOC>
        <Icon icon="pencil5" />
      </TemplateActionButtonWithHOC>
    </MuiThemeProvider>
  )),
);
