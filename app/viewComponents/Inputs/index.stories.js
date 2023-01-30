import React from 'react';
import { withInfo } from '@storybook/addon-info';
import sb, { withTheme } from 'utils/helpers/storybook';
import { Title } from 'viewComponents/Typography';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

import Input from './Input/index.stories';
import Select from './Select/index.stories';
import TextField from './TextField/index.stories';
import SelectField from './SelectField/index.stories';

GridContainer.displayName = 'GridContainer';

const demos = {
  info: {
    propTablesExclude: [
      Title,
      GridContainer,
      GridItem,
      ...Input.usage.info.propTablesExclude,
      ...Select.usage.info.propTablesExclude,
      ...TextField.usage.info.propTablesExclude,
      ...SelectField.usage.info.propTablesExclude,
    ],
  },
  render: () => (
    <GridContainer direction="column">
      <GridItem>
        <Title>Input</Title>
      </GridItem>
      <GridItem>{Input.demos.render()}</GridItem>
      <GridItem>
        <Title>Select</Title>
      </GridItem>
      <GridItem>{Select.demos.render()}</GridItem>
      <GridItem>
        <Title>TextField</Title>
      </GridItem>
      <GridItem>{TextField.demos.render()}</GridItem>
      <GridItem>
        <Title>SelectField</Title>
      </GridItem>
      <GridItem>{SelectField.demos.render()}</GridItem>
    </GridContainer>
  ),
};

sb.viewComponentsStoriesOf('Inputs')
  .addDecorator(withTheme)
  .add('Demos', withInfo(demos.info)(demos.render));
