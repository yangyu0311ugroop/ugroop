import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS } from 'appConstants';

export class AssignedChecklists extends PureComponent {
  state = {};

  render = () => (
    <GridContainer>
      <Helmet
        title={PAGE_HELMETS.ASSIGNED_CHECKLISTS}
        meta={[{ name: 'description', content: 'Description of My Tours' }]}
      />
      <GridItem>Assigned by me/Assigned from others</GridItem>
    </GridContainer>
  );
}

AssignedChecklists.propTypes = {
  // hoc props
  // parent props
  // resaga props
};

AssignedChecklists.defaultProps = {};

export default AssignedChecklists;
