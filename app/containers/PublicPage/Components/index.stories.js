import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theme/coolTheme';
import { IntlProvider } from 'react-intl';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';

// Day Card
import DayCardWithHOC, { DayCard } from './DayCard/index';

const stories = storiesOf('Public Page Reusable Components', module);

stories.addDecorator(withKnobs);

stories.add(
  'Day Card',
  withInfo({
    text:
      'Day Card used primarily in public tour view' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [DayCard],
    propTablesExclude: [DayCardWithHOC],
  })(() => {
    const dateText = text('dateText', 'Tuesday - October 21, 2018');
    const placeText = text('placeText', 'Arrival Day: Edmonton or Jasper');
    const selected = boolean('selected', true);

    return (
      <IntlProvider>
        <MuiThemeProvider theme={theme}>
          <GridContainer>
            <GridItem xs={12} md={3}>
              <DayCardWithHOC
                dayCount={1}
                placeText={placeText}
                dateText={dateText}
                selected={selected}
                imgSrc="https://loremflickr.com/320/240/paris"
              />
            </GridItem>
          </GridContainer>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }),
);
