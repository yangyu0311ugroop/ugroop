import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { BrowserRouter } from 'react-router-dom';
import ErrorPagesWithHOC, { ErrorPages } from './index';

const stories = storiesOf('ErrorPages', module);

stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [ErrorPages],
    propTablesExclude: [ErrorPagesWithHOC],
  })(() => {
    const error = select('error', ['404', '403'], '404');
    const type = select(
      'type',
      ['page', 'tour', 'something', 'invalid', 'expired', 'accepted'],
      'page',
    );
    return (
      <BrowserRouter>
        <IntlProvider>
          <ErrorPagesWithHOC error={error} type={type} />
        </IntlProvider>
      </BrowserRouter>
    );
  }),
);
