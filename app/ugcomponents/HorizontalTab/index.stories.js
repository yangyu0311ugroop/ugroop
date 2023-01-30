import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import CoolTheme from 'theme/coolTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import UGHorizontalTabWithStyle, { UGHorizontalTab } from './index';

const stories = storiesOf('Horizontal Tab', module);

stories.addDecorator(withKnobs);

stories
  .add(
    'basic usage ',
    withInfo({
      text:
        '<HorizontalTab /> which is heavily used in admin page' +
        'Note: just remove withStyles function and that is how you will use the component',
      inline: false,
      propTables: [UGHorizontalTab],
      propTablesExclude: [UGHorizontalTabWithStyle],
    })(() => {
      const firstTab = object('First Tab Value', { label: 'First' });
      const secondTab = object('Second Tab Value', { label: 'Second' });
      const thirdTab = object('Third Tab Value', { label: 'Third' });
      const arrayOfItems = [firstTab, secondTab, thirdTab];
      return (
        <MuiThemeProvider theme={CoolTheme}>
          <UGHorizontalTabWithStyle tabItems={arrayOfItems}>
            <div>First Content</div>
            <div>Second Content</div>
            <div>Third Content</div>
          </UGHorizontalTabWithStyle>
        </MuiThemeProvider>
      );
    }),
  )
  .add(
    'with selected tab props',
    withInfo({
      text:
        '<HorizontalTab /> which is heavily used in admin page' +
        'Note: just remove withStyles function and that is how you will use the component',
      inline: false,
      propTables: [UGHorizontalTab],
      propTablesExclude: [UGHorizontalTabWithStyle],
    })(() => {
      const firstTab = object('First Tab Value', { label: 'Uno' });
      const secondTab = object('Second Tab Value', { label: 'Dos' });
      const thirdTab = object('Third Tab Value', { label: 'Tres' });
      const arrayOfItems = [firstTab, secondTab, thirdTab];
      return (
        <MuiThemeProvider theme={CoolTheme}>
          <UGHorizontalTabWithStyle selectedTab={2} tabItems={arrayOfItems}>
            <div>First Content</div>
            <div>Second Content</div>
            <div>Third Content</div>
          </UGHorizontalTabWithStyle>
        </MuiThemeProvider>
      );
    }),
  );
