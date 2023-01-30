import { SUB_TITLE } from 'appConstants';
import PropTypes from 'prop-types';

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Name from 'smartComponents/Organisation/parts/Name';
import { CONFIG } from './config';

// import styles from './styles';

export class OrganisationName extends PureComponent {
  render = () => {
    const {
      featuredTour,
      organisationId,
      organisationIds,
      ...props
    } = this.props;

    if (featuredTour) {
      return <Name {...props} id={organisationId} name="Featured" />;
    }

    if (organisationId < 1)
      return <Name {...props} id={organisationId} name="Personal" />;

    if (organisationIds.indexOf(organisationId) === -1) {
      return <Name {...props} id={organisationId} name="Shared" />;
    }

    return <Name {...props} id={organisationId} />;
  };
}

OrganisationName.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,
  // parent props
  variant: PropTypes.string,

  // resaga props
  organisationId: PropTypes.number,
  organisationIds: PropTypes.array,
  featuredTour: PropTypes.bool,

  // customisable props
};

OrganisationName.defaultProps = {
  variant: SUB_TITLE,
  organisationIds: [],
};

export default compose(resaga(CONFIG))(OrganisationName);
// withStyles(styles, { name: 'OrganisationName' }),
// resaga(CONFIG)
