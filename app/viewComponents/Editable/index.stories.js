import React from 'react';
import { withKnobs, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import sb, { withTheme, withInfo } from 'utils/helpers/storybook';
import P, { H2, Title } from 'viewComponents/Typography';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Editable, { Editable as EditableComponent } from '.';

Editable.displayName = 'Editable';

const DEFAULT_CHILDREN_TEXT = 'Some text';
const READ_ONLY_CHILDREN_TEXT = 'Some read-only text';

const render = (p = {}, opts = {}) => {
  const {
    children = DEFAULT_CHILDREN_TEXT,
    readOnly = EditableComponent.defaultProps.readOnly,
    iconProps = EditableComponent.defaultProps.iconProps,
    ...rest
  } = p;
  return (
    <Editable
      {...sb.props(
        [
          sb.makeProp('readOnly', readOnly, boolean),
          sb.makeProp('iconProps', iconProps, object),
        ],
        opts,
      )}
      onClick={action('onClick')}
      {...sb.prop('rest', rest, object, opts)}
    >
      {children}
    </Editable>
  );
};

const usage = {
  info: {
    propTables: [EditableComponent],
    propTablesExclude: [Editable],
  },
  render: () => render({}, { knob: true }),
};

const demos = {
  info: {
    propTablesExclude: [GridContainer, GridItem, P, H2, Title, Editable],
  },
  render: () => (
    <GridContainer direction="column">
      <GridItem>
        <Title>Default</Title>
      </GridItem>
      <GridItem>
        <GridContainer>
          <GridItem>{render()}</GridItem>
          <GridItem>
            {render({ children: READ_ONLY_CHILDREN_TEXT, readOnly: true })}
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <Title>{'Using <P />'}</Title>
      </GridItem>
      <GridItem>
        <GridContainer>
          <GridItem>
            {render({ children: <P noMargin>{DEFAULT_CHILDREN_TEXT}</P> })}
          </GridItem>
          <GridItem>
            {render({
              children: <P noMargin>{READ_ONLY_CHILDREN_TEXT}</P>,
              readOnly: true,
            })}
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <Title>{'Using <H2 />'}</Title>
      </GridItem>
      <GridItem>
        <GridContainer>
          <GridItem>
            {render({ children: <H2 noMargin>{DEFAULT_CHILDREN_TEXT}</H2> })}
          </GridItem>
          <GridItem>
            {render({
              children: <H2 noMargin>{READ_ONLY_CHILDREN_TEXT}</H2>,
              readOnly: true,
            })}
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  ),
};

sb.viewComponentsStoriesOf('Editables/Editable')
  .addDecorator(withTheme)
  .addDecorator(withKnobs)
  .add('Usage', withInfo(usage.info)(usage.render))
  .add('Demos', withInfo(demos.info)(demos.render));

export default {
  usage,
  demos,
};
