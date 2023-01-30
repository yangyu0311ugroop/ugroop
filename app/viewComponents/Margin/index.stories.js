import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CoolTheme from 'theme/coolTheme';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import sb from 'utils/helpers/storybook';
import MarginWrapperWithHOC, { MarginWrapper } from './index';

const stories = sb.viewComponentsStoriesOf('Margin');
stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [MarginWrapper],
    propTablesExclude: [MarginWrapperWithHOC],
  })(() => {
    const options = ['', 'sm', 'md', 'lg', 'xl', 'xxl'];
    const marginTop = select('top', options);
    const marginLeft = select('left', options);
    const marginRight = select('right', options);
    const marginBottom = select('bottom', options);
    return (
      <MuiThemeProvider theme={CoolTheme}>
        <div style={{ border: '1px solid #000' }}>
          <MarginWrapperWithHOC
            top={marginTop}
            bottom={marginBottom}
            left={marginLeft}
            right={marginRight}
          >
            <span>Item</span>
          </MarginWrapperWithHOC>
        </div>
      </MuiThemeProvider>
    );
  }),
);
