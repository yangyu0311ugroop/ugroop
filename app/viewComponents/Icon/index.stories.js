import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CoolTheme from 'theme/coolTheme';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import sb from 'utils/helpers/storybook';
import IconWithHOC, { Icon } from './index';

const stories = sb.viewComponentsStoriesOf('Icon');
stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [Icon],
    propTablesExclude: [IconWithHOC],
  })(() => {
    const icon = text('icon name', 'folder');
    const variant = select(
      'variant',
      ['linearicon', 'ugIcon', 'ugFont'],
      'linearicon',
    );
    const size = select(
      'size',
      ['base', 'extraSmall', 'small', 'large', 'extraLarge'],
      'base',
    );
    const color = select(
      'color',
      ['dark', 'blue', 'lavender', 'success', 'gray'],
      'blue',
    );
    const bold = boolean('bold', false);
    const children = text('children');

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
          <IconWithHOC
            icon={icon}
            color={color}
            size={size}
            bold={bold}
            variant={variant}
          >
            {children}
          </IconWithHOC>
        </div>
      </MuiThemeProvider>
    );
  }),
);
