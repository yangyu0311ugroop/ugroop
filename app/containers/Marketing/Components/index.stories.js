import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  select,
  text,
  object,
  boolean,
  number,
} from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import theme from 'theme/warmTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';

// Components
import BGContentWrapperWithHOC, { BGContentWrapper } from './BGContentWrapper';
import HrWithStyle, { UGHr } from './Hr';
import JumbotronWithStyle, { Jumbotron } from './Jumbotron';
import LinkWithStyle, { UGMarketingLink } from './Link';
import DescriptionWithHOC, { Description } from './Description';
import HeaderWithHOC, { Header } from './Header';
import UnderlineWrapperWithHOC, { UnderlineWrapper } from './UnderlineWrapper';

const stories = storiesOf('Marketing Reusable Components', module);

stories.addDecorator(withKnobs);

stories.add(
  'BGContentWrapper (basic props)',
  withInfo({
    text:
      'Wraps a component with image that also have gradient' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [BGContentWrapper],
    propTablesExclude: [BGContentWrapperWithHOC],
  })(() => {
    const bgImageUrl = text('bgImageUrl', '');
    const location = {
      pathname: text('pathname', '/sample'),
    };

    return (
      <MuiThemeProvider theme={theme}>
        <BGContentWrapperWithHOC bgImageUrl={bgImageUrl} location={location}>
          {text('children', 'Hello World!')}
        </BGContentWrapperWithHOC>
      </MuiThemeProvider>
    );
  }),
);

stories.add(
  'Hr (basic props)',
  withInfo({
    text: 'Display HR',
    inline: false,
    propTables: [UGHr],
    propTablesExclude: [HrWithStyle],
  })(() => {
    const size = object('Size Value', {
      value: '100',
      unit: '%',
    });
    return (
      <MuiThemeProvider theme={theme}>
        <HrWithStyle size={size} />
      </MuiThemeProvider>
    );
  }),
);

stories.add(
  'Jumbotron (basic props)',
  withInfo({
    text: 'display big text being used heavily in the marketing page',
    inline: false,
    propTables: [Jumbotron],
    propTablesExclude: [JumbotronWithStyle],
  })(() => {
    const childrenText = text('children', 'Sample');
    return (
      <MuiThemeProvider theme={theme}>
        <JumbotronWithStyle>{childrenText}</JumbotronWithStyle>
      </MuiThemeProvider>
    );
  }),
);

stories.add(
  'Link (basic props)',
  withInfo({
    text:
      'display link based on the design for marketing page. it also includes style for a button like link',
    inline: false,
    propTables: [UGMarketingLink],
    propTablesExclude: [LinkWithStyle],
  })(() => {
    const childrenText = text('children', 'Home');
    const isButton = boolean('isButton', false);
    const outline = select('outline', ['none', 'orange'], 'none');
    return (
      <MuiThemeProvider theme={theme}>
        <LinkWithStyle outline={outline} isButton={isButton}>
          {childrenText}
        </LinkWithStyle>
      </MuiThemeProvider>
    );
  }),
);

stories.add(
  'Description (basic usage)',
  withInfo({
    text:
      '<Description /> component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [Description],
    propTablesExclude: [DescriptionWithHOC],
  })(() => {
    const isBold = boolean('isBold', true);
    const size = number('size', 11);

    return (
      <MuiThemeProvider theme={theme}>
        <DescriptionWithHOC size={size} isBold={isBold}>
          {text('children', 'Hello World!')}
        </DescriptionWithHOC>
      </MuiThemeProvider>
    );
  }),
);

stories.add(
  'Header (basic usage)',
  withInfo({
    text:
      '<Header /> component. ' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [Header],
    propTablesExclude: [HeaderWithHOC],
  })(() => {
    const supportedColors = ['orange', 'black'];
    const supportedAsProps = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const color = select('color', supportedColors, 'black');
    const as = select('as', supportedAsProps, 'h1');
    const isThin = boolean('isThin', false);

    return (
      <MuiThemeProvider theme={theme}>
        <HeaderWithHOC isThin={isThin} as={as} color={color}>
          {text('children', 'Hello World!')}
        </HeaderWithHOC>
      </MuiThemeProvider>
    );
  }),
);

stories.add(
  'UnderlineWrapper (basic usage)',
  withInfo({
    text: 'Create underline or an orange underline in the last word',
    inline: false,
    propTables: [UnderlineWrapper],
    propTablesExclude: [UnderlineWrapperWithHOC],
  })(() => (
    <MuiThemeProvider theme={theme}>
      <UnderlineWrapperWithHOC>
        Just a <span>sample</span>
      </UnderlineWrapperWithHOC>
    </MuiThemeProvider>
  )),
);
