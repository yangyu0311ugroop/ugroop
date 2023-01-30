import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { THE_BIG_DOT } from 'appConstants';
import { TOUR_ROLES } from 'datastore/invitationStore/constants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { H5 } from 'viewComponents/Typography';
import { CreatedAt } from 'smartComponents/Node/parts';
import m from './messages';

export class OwnerContributor extends React.PureComponent {
  renderPart = (Component, variant, props = {}) => {
    const { id } = this.props;
    return <Component id={id} variant={variant} {...props} />;
  };

  render = () => (
    <GridContainer alignItems="baseline">
      <GridItem>
        <H5 dense weight="bold">
          {TOUR_ROLES.tour_owner}
        </H5>
      </GridItem>
      <GridItem>{THE_BIG_DOT}</GridItem>
      <GridItem>
        <M
          {...m.description}
          values={{
            at: this.renderPart(CreatedAt),
          }}
        />
      </GridItem>
    </GridContainer>
  );
}

OwnerContributor.propTypes = {
  // parent
  id: PropTypes.number,
};

OwnerContributor.defaultProps = {
  id: 0,
};

export default OwnerContributor;
