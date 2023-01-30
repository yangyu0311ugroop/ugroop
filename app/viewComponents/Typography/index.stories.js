import React from 'react';
import CoolTheme from 'theme/coolTheme';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { H1, H2, H3, H4, H5, H6, P, TITLE } from 'utils/constants/fontTypes';
import TypographyWithHOC, { Typography } from './components/Typography';

const stories = storiesOf('UIKit-Typography', module);

const message = 'The quick brown fox jumps over the lazy dog.';

const info = type => ({
  text: `Basic Usage:\n
      import { ${type} } from 'viewComponents/Typography';\n
      . . .\n
      <${type}>{children}</${type}>;
     `,
  inline: false,
  propTables: [Typography],
  propTablesExclude: [TypographyWithHOC],
});

const renderTypography = type => () => {
  const dense = boolean('dense', true);
  const noMargin = boolean('noMargin', false);
  const error = boolean('error', false);
  const success = boolean('success', false);
  const textAlign = select(
    'textAlign',
    ['', 'left', 'right', 'center', 'justify'],
    '',
  );
  const letterSpace = boolean('letterSpace', false);
  const weight = select('weight', ['', 'light', 'bold', 'bolder', 'black'], '');
  const transform = select(
    'transform',
    ['', 'uppercase', 'capitalize', 'lowercase'],
    '',
  );
  const textProps = {
    type,
    weight,
    dense,
    noMargin,
    error,
    success,
    textAlign,
    letterSpace,
    transform,
  };
  return (
    <MuiThemeProvider theme={CoolTheme}>
      <div style={{ maxWidth: 250 }}>
        <TypographyWithHOC
          type={type}
          weight="bold"
          letterSpace
          success
          dense
          textAlign={textAlign}
        >
          BASIC USAGE IN SHOW INFO:
        </TypographyWithHOC>
        <TypographyWithHOC {...textProps}>{message}</TypographyWithHOC>
      </div>
    </MuiThemeProvider>
  );
};

stories.addDecorator(withKnobs);

stories.add(P, withInfo(info(P))(renderTypography(P)));
stories.add(H1, withInfo(info(H1))(renderTypography(H1)));
stories.add(H2, withInfo(info(H2))(renderTypography(H2)));
stories.add(H3, withInfo(info(H3))(renderTypography(H3)));
stories.add('Title', withInfo(info('Title'))(renderTypography(TITLE)));
stories.add(H4, withInfo(info(H4))(renderTypography(H4)));
stories.add(H5, withInfo(info(H5))(renderTypography(H5)));
stories.add(H6, withInfo(info(H6))(renderTypography(H6)));
