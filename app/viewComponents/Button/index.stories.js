import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CoolTheme from 'theme/coolTheme';
import {
  withKnobs,
  text,
  boolean,
  object,
  select,
} from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import sb from 'utils/helpers/storybook';
import ButtonWithHOC, { Button } from './index';

const stories = sb.viewComponentsStoriesOf('Button');
stories.addDecorator(withKnobs);

stories.add(
  'Basic Usage',
  withInfo({
    text:
      'This is the basic usage of the component' +
      'Note: just remove withStyles function and that is how you will use the component',
    inline: false,
    propTables: [Button],
    propTablesExclude: [ButtonWithHOC],
  })(() => {
    // const children = text('button', 'Button');
    const variant = select(
      'type',
      ['standard', 'outline', 'inline', 'borderless'],
      'standard',
    );
    const color = select(
      'color',
      ['base', 'primary', 'alert', 'gray', 'black', 'pending'],
      'base',
    );
    const size = select('size', ['base', 'small', 'large'], 'base');
    const weight = select(
      'weight',
      ['light', 'normal', 'bold', 'strong'],
      'normal',
    );
    const dense = boolean('dense', false);
    const disabled = boolean('disabled', false);
    const iconButton = boolean('iconButton', false);
    const icon = text('icon', undefined);
    const loading = boolean('loading', false);
    const tooltipProps = object('tooltipProps', {
      title: '',
      placement: '',
    });

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
          <ButtonWithHOC
            variant={variant}
            color={color}
            size={size}
            weight={weight}
            disabled={disabled}
            iconButton={iconButton}
            icon={icon}
            loading={loading}
            dense={dense}
            {...tooltipProps}
          >
            Button
          </ButtonWithHOC>
        </div>
      </MuiThemeProvider>
    );
  }),
);

stories.add(
  'All Button Variances',
  withInfo({
    text:
      'This story shows the different variances of the Button component.' +
      'Note that this will not show the name of the props and the different possible values of each' +
      'prop, which can be seen in the other story which is the Basic Usage. This will only' +
      'show the different variations of the Buttons',
    inline: false,
    propTables: [Button],
    propTablesExclude: [ButtonWithHOC],
  })(() => {
    const tooltipProps = {
      title: 'tooltip title',
      placement: 'top',
    };
    return (
      <MuiThemeProvider theme={CoolTheme}>
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#fffff',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <h4>Large Sized Buttons</h4>
            <ButtonWithHOC size="large" tooltipProps={tooltipProps}>
              Large Button
            </ButtonWithHOC>
            <ButtonWithHOC size="large" color="primary">
              Large Button
            </ButtonWithHOC>
            <ButtonWithHOC size="large" color="alert">
              Large Button
            </ButtonWithHOC>
            <ButtonWithHOC size="large" color="gray">
              Large Button
            </ButtonWithHOC>
            <ButtonWithHOC size="large" color="black">
              Large Button
            </ButtonWithHOC>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <h4>
              Base Sized Buttons in
              <br /> Standard Variant
            </h4>
            <ButtonWithHOC tooltipProps={tooltipProps}>
              Standard Button
            </ButtonWithHOC>
            <ButtonWithHOC color="primary">Primary Button</ButtonWithHOC>
            <ButtonWithHOC color="alert">Alert Button</ButtonWithHOC>
            <ButtonWithHOC color="gray">Gray Button</ButtonWithHOC>
            <ButtonWithHOC color="black">Gray Button</ButtonWithHOC>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <h4>Small Sized Buttons</h4>
            <ButtonWithHOC size="small" tooltipProps={tooltipProps}>
              Small Button
            </ButtonWithHOC>
            <ButtonWithHOC size="small" color="primary">
              Small Button
            </ButtonWithHOC>
            <ButtonWithHOC size="small" color="alert">
              Small Button
            </ButtonWithHOC>
            <ButtonWithHOC size="small" color="gray">
              Small Button
            </ButtonWithHOC>
            <ButtonWithHOC size="small" color="black">
              Small Button
            </ButtonWithHOC>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <h4>
              Base Sized Buttons in
              <br /> Outline Variant
            </h4>
            <ButtonWithHOC variant="outline" tooltipProps={tooltipProps}>
              Outline Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="outline" color="primary">
              Outline Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="outline" color="alert">
              Outline Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="outline" color="gray">
              Outline Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="outline" color="black">
              Outline Button
            </ButtonWithHOC>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <h4>Disabled Buttons</h4>
            <ButtonWithHOC disabled>Standard Button</ButtonWithHOC>
            <ButtonWithHOC disabled color="primary">
              Primary Button
            </ButtonWithHOC>
            <ButtonWithHOC disabled color="alert">
              Alert Button
            </ButtonWithHOC>
            <ButtonWithHOC disabled color="gray">
              Gray Button
            </ButtonWithHOC>
            <ButtonWithHOC disabled color="black">
              Black Button
            </ButtonWithHOC>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <h4>Icon Buttons</h4>
            <ButtonWithHOC
              iconButton
              icon="folder"
              size="large"
              tooltipProps={tooltipProps}
            />
            <ButtonWithHOC iconButton icon="folder" color="primary" />
            <ButtonWithHOC iconButton icon="folder" color="alert" />
            <ButtonWithHOC iconButton icon="folder" color="gray" size="small" />
            <ButtonWithHOC
              iconButton
              icon="folder"
              color="black"
              size="small"
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <h4>Inline Buttons</h4>
            <ButtonWithHOC variant="inline" tooltipProps={tooltipProps}>
              Inline Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="inline" color="primary">
              Inline Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="inline" color="alert">
              Inline Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="inline" color="gray">
              Inline Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="inline" color="black">
              Inline Button
            </ButtonWithHOC>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
          }}> {/*eslint-disable-line*/}
            <h4>Borderless Buttons</h4>
            <ButtonWithHOC variant="borderless" tooltipProps={tooltipProps}>
              Borderless Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="borderless" color="primary">
              Borderless Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="borderless" color="alert">
              Borderless Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="borderless" color="gray">
              Borderless Button
            </ButtonWithHOC>
            <ButtonWithHOC variant="borderless" color="black">
              Borderless Button
            </ButtonWithHOC>
            <ButtonWithHOC
              variant="borderless"
              iconButton
              icon="folder"
              tooltipProps={tooltipProps}
            />
            <ButtonWithHOC
              variant="borderless"
              color="primary"
              iconButton
              icon="folder"
            />
            <ButtonWithHOC
              variant="borderless"
              color="alert"
              iconButton
              icon="folder"
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }),
);
