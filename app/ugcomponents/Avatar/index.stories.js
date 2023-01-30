import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import AvatarWithStyle, { Avatar } from './index';

const stories = storiesOf('Avatar component', module);

stories.addDecorator(withKnobs);

stories.add(
  'basic usage ',
  withInfo({
    text:
      'Basic usage of Avatar component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [Avatar],
    propTablesExclude: [AvatarWithStyle],
  })(() => {
    const avatarUrl = text('avatarUrl', 'https://placeimg.com/750/750/nature');
    return <AvatarWithStyle avatarUrl={avatarUrl} />;
  }),
);
