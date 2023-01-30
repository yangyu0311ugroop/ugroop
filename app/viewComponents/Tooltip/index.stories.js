import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CoolTheme from 'theme/coolTheme';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import sb from 'utils/helpers/storybook';
import Button from 'viewComponents/Button';
import TooltipWithHOC, { Tooltip } from './index';

const stories = sb.viewComponentsStoriesOf('Tooltip');
stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [Tooltip],
    propTablesExclude: [TooltipWithHOC],
  })(() => {
    const tooltipProps = object('tooltipProps', {
      title: '',
      placement: '',
    });
    const title = text('title', 'Title');
    const placement = text('placement', 'top');
    return (
      <MuiThemeProvider theme={CoolTheme}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <TooltipWithHOC
            tooltipProps={tooltipProps}
            title={title}
            placement={placement}
          >
            <Button>Sample Button</Button>
          </TooltipWithHOC>
        </div>
      </MuiThemeProvider>
    );
  }),
);
