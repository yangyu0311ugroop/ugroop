import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theme/coolTheme';
import TemplateActionButtonListWithHOC, {
  TemplateActionButtonList,
} from './templateActionButtonList';

const stories = storiesOf('TemplateActionButtonList', module);

stories.addDecorator(withKnobs);

stories.add(
  'basic usage ',
  withInfo({
    text:
      'Basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [TemplateActionButtonList],
    propTablesExclude: [TemplateActionButtonListWithHOC],
  })(() => {
    const showOtherOptions = boolean('showMoreActions', false);
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <TemplateActionButtonListWithHOC
            showMoreActions={showOtherOptions}
            onClickMore={action('onclick-more')}
            onClickEdit={action('onclick-edit')}
            onClickClone={action('onclick-clone')}
          >
            {text('children', 'Hello World!')}
          </TemplateActionButtonListWithHOC>
        </div>
      </MuiThemeProvider>
    );
  }),
);
