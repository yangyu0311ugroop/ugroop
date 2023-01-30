import { BATCH_GET_ORG_MEMBERS, ORGANISATION_API } from 'apis/constants';
import { PAGE_HELMETS } from 'appConstants';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import withResaga from 'resaga';
import { withRouter } from 'react-router-dom';
import NodeExplorer from 'containers/Templates/Components/NodeExplorer';
import { Helmet } from 'react-helmet';
import { CONFIG, CONFIG_USER_ORGS } from './config';
import styles from './styles';
import withCustomerSubscriptionCheck from '../../../../ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';

export class Tours extends PureComponent {
  componentDidMount = () => {
    const { userOrgs, resaga } = this.props;
    if (userOrgs.length !== 0) {
      // to exclude the id that cannot be found in my tours.
      resaga.dispatchTo(ORGANISATION_API, BATCH_GET_ORG_MEMBERS, {
        payload: { ids: userOrgs },
      });
    }
  };

  render = () => {
    const { rootNodeId, location, history } = this.props;

    return (
      <React.Fragment>
        <Helmet
          title={PAGE_HELMETS.MY_TOURS}
          meta={[{ name: 'description', content: 'Personal Tours' }]}
        />
        <NodeExplorer
          rootNodeId={rootNodeId}
          currentRoute={location.pathname}
          location={location}
          history={history}
        />
      </React.Fragment>
    );
  };
}

Tours.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  location: PropTypes.object,
  history: PropTypes.object,

  // resaga props
  rootNodeId: PropTypes.number,
  userOrgs: PropTypes.array,
};

Tours.defaultProps = {
  location: {},
  history: {},
  rootNodeId: 0,
  userOrgs: [],
};

export default compose(
  withStyles(styles, { name: 'Tours' }),
  withResaga(CONFIG),
  withResaga(CONFIG_USER_ORGS),
  withRouter,
  withCustomerSubscriptionCheck,
)(Tours);
