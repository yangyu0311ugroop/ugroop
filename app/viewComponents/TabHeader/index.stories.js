import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CoolTheme from 'theme/coolTheme';
import { withKnobs, array, object, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import sb from 'utils/helpers/storybook';
import TabHeaderWithHOC, { TabHeader } from './index';

const stories = sb.viewComponentsStoriesOf('TabHeader');
stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [TabHeader],
    propTablesExclude: [TabHeaderWithHOC],
  })(() => {
    const tab1 = object('First Tab', { label: 'First', id: 1 });
    const tab2 = object('Second Tab', { label: 'Second', id: 2 });
    const activeTab = number('activeTab', 0);
    const tabItems = array('tabItems', [tab1, tab2]);
    const handleTabChange = action('onTabChange');

    return (
      <MuiThemeProvider theme={CoolTheme}>
        <div style={{ width: 600 }}>
          <TabHeaderWithHOC
            tabItems={tabItems}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </MuiThemeProvider>
    );
  }),
);
