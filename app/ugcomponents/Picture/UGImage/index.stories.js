import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  select,
  text,
  boolean,
  object,
  number,
} from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { decorateAction } from '@storybook/addon-actions';
import UGImage from './index';

const stories = storiesOf('UGImage', module);

stories.addDecorator(withKnobs);

const sizeOpts = ['custom', 'extrasmall', 'small', 'medium', 'large'];

const logAction = decorateAction([args => args.slice(0, 1)]);

stories.add(
  'Basic Usage',
  withInfo({
    text: 'This is the basic usage of the component',
    inline: false,
    propTables: [UGImage],
  })(() => (
    <UGImage
      imageUrl={text(
        'imageUrl',
        'https://ugr00p.github.io/assets/images/sample_activitypic.jpg',
      )}
      size={select('size', sizeOpts, 'custom')}
      round={boolean('round', false)}
      cropMetaInfo={object('cropMetaInfo (JSON)', {})}
      resizeWidth={number('resizeWidth')}
      resizeHeight={number('resizeHeight')}
      rotate={number('rotate', 0)}
      alt={text('alt', 'Sample image')}
      padFacadeURL={boolean('padFacadeURL')}
      className={text('className')}
      imgClassName={text('imgClassName')}
      onLoad={logAction('onLoad')}
      onError={logAction('onError')}
    />
  )),
);
