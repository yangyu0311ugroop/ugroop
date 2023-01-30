import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CoolTheme from 'theme/coolTheme';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import sb from 'utils/helpers/storybook';
import TourIconWithHOC, { TourIcon } from './index';

const stories = sb.viewComponentsStoriesOf('TourIcon');
stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [TourIcon],
    propTablesExclude: [TourIconWithHOC],
  })(() => {
    const icon = select(
      'icon',
      ['bed', 'arrival', 'departure', 'in-flight'],
      'bed',
    );
    const size = select(
      'size',
      ['base', 'extraSmall', 'small', 'large', 'extraLarge'],
      'base',
    );
    const caret = boolean('caret', false);
    const solid = boolean('solid', false);
    const dense = boolean('dense', false);
    const dateTime = text('dateTime');

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
          <TourIconWithHOC
            icon={icon}
            size={size}
            caret={caret}
            solid={solid}
            dense={dense}
            dateTime={dateTime}
          />
        </div>
      </MuiThemeProvider>
    );
  }),
);
