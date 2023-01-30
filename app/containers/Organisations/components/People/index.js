import { GET_ORG_MEMBERS, ORGANISATION_API } from 'apis/constants';
import Container from 'components/Container';
import { withStyles } from 'components/material-ui';
import Roles from 'containers/Profile/components/Organisation/components/Content/components/Roles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import styles from './styles';
import withCustomerSubscriptionCheck from '../../../../ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';
import withScheduleSubscriptionPlanCheck from '../../../../ugcomponents/CustomerSubscriptions/hoc/withScheduleSubscriptionCheck';

export class People extends PureComponent {
  componentDidMount() {
    const { id } = this.props;
    this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
      payload: { id, activated: '' },
    });
  }

  render = () => {
    const { classes, id, showHeader } = this.props;

    return (
      <Container>
        <Roles className={classes.root} id={id} showHeader={showHeader} />
      </Container>
    );
  };
}

People.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  id: PropTypes.number,
  resaga: PropTypes.object.isRequired,
  showHeader: PropTypes.bool,
};

People.defaultProps = {
  showHeader: false,
};

export default compose(
  withStyles(styles, { name: 'People' }),
  resaga(),
  withCustomerSubscriptionCheck,
  withScheduleSubscriptionPlanCheck,
)(People);
