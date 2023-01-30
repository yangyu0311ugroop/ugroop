import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { DoneOrgSubscriptionOwner } from 'routeProtectionV2';
import {
  EXPANDED,
  SUBSCRIPTION_ENTERPRISE,
  URL_HELPERS,
  FREE_ORG_SEATS_THRESHOLD,
} from 'appConstants';
import {
  CREATE_SUBSCRIPTION_FIRSTTIME,
  GET_CUSTOMER_SUBSCRIPTION,
  GET_ORG_MEMBERS,
  ORGANISATION_API,
  SUBSCRIPTION_API,
} from 'apis/constants';
import EnterpriseSeatPlan from 'smartComponents/Plan/NewEnterpriseSeatPlan';
import { SUBSCRIPTION_CONFIG } from './config';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';

export class OrgSubscriptionSetup extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
      payload: {
        id: this.props.id,
      },
    });
    this.props.resaga.dispatchTo(SUBSCRIPTION_API, GET_CUSTOMER_SUBSCRIPTION, {
      payload: {
        id: this.props.id,
        type: 'org',
      },
    });
  }

  onCreateSubscriptionSuccess = () => {
    const { location, history, id } = this.props;
    if (location.state && location.state.pathname) {
      history.push(location.state.pathname);
    } else {
      history.push(URL_HELPERS.myTours(id));
    }
  };

  onCreateSubscriptionFail = () => {};

  submitSubscription = async () => {
    const {
      userId,
      knownAs,
      firstName,
      lastName,
      email,
      id,
      orgName,
    } = this.props;
    const {
      planId,
      stripeData,
      freePlanId,
      planFirstPurchase,
      orgSeats,
      bundlePlanId,
    } = await this.ref.current.collectPaymentInfo();
    const selectPlan = stripeData ? planId : freePlanId;
    if (stripeData && stripeData.error) {
      // Do something about the error
      return;
    }
    let q = 1;
    const quantity = orgSeats - FREE_ORG_SEATS_THRESHOLD;
    if (quantity > parseInt(planFirstPurchase, 10)) {
      q = quantity;
    } else {
      q = parseInt(planFirstPurchase, 10);
    }
    const subscription = {
      userId,
      name: knownAs && knownAs !== '' ? knownAs : `${firstName} ${lastName}`,
      planIds: [selectPlan, bundlePlanId],
      source: stripeData ? stripeData.token.id : null,
      email,
      orgId: id,
      orgName,
      quantity: q > 1 ? q : 1, // never pass quantity zero.
    };
    this.props.resaga.dispatchTo(
      SUBSCRIPTION_API,
      CREATE_SUBSCRIPTION_FIRSTTIME,
      {
        payload: subscription,
        onSuccess: this.onCreateSubscriptionSuccess,
        onError: this.onCreateSubscriptionFail,
      },
    );
  };

  render() {
    const view = this.ref ? (
      <PlanProvider>
        <EnterpriseSeatPlan
          variant={EXPANDED}
          type={SUBSCRIPTION_ENTERPRISE}
          ref={this.ref}
          onSubmit={this.submitSubscription}
          userId={this.props.userId}
          orgId={this.props.id}
          isUpgrade
          showDurationSwitch
          loading={this.props.creatingSubscription}
        />
      </PlanProvider>
    ) : (
      <div />
    );
    return view;
  }
}

OrgSubscriptionSetup.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  userId: PropTypes.number,
  email: PropTypes.string,
  knownAs: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  resaga: PropTypes.object,
  id: PropTypes.number,
  orgName: PropTypes.string,
  creatingSubscription: PropTypes.bool,
};

OrgSubscriptionSetup.defaultProps = {};

export default compose(
  withRouter,
  resaga(SUBSCRIPTION_CONFIG),
  DoneOrgSubscriptionOwner,
)(OrgSubscriptionSetup);
