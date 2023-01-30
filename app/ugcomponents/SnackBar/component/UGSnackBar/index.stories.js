import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  boolean,
  select,
  number,
} from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { decorateAction } from '@storybook/addon-actions';
import { snackBarType } from 'utils/constant';
import UGSnackBar from './index';

const snackTypes = [
  snackBarType.INFO,
  snackBarType.CRITICAL,
  snackBarType.SUCCESS,
];

const stories = storiesOf('UGSnackBar', module);

stories.addDecorator(withKnobs);

const logAction = decorateAction([args => args.slice(0, 1)]);

stories.add(
  'basic usage ',
  withInfo({
    text: `The UGSnackBar component. Use the following import:

    import UGSnackBar from 'ugcomponents/SnackBar/component/UGSnackBar';
`,
    inline: false,
    propTables: [UGSnackBar],
  })(() => (
    <UGSnackBar
      text={text('text', 'Sample text.')}
      isRevealed={boolean('isRevealed', true)}
      type={select('type', snackTypes, snackBarType.INFO)}
      time={number('time', 30000)}
      onClose={logAction('onClose')}
      rootClassName={text('rootClassName', '')}
      textClassName={text('textClassName', '')}
    />
  )),
);
