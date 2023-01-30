import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import resaga from 'resaga';
import { DonePersonSubscriptionOwner } from 'routeProtectionV2';
import { Helmet } from 'react-helmet';
import { SUBSCRIPTION_CONFIG } from '../SubscriptionConfig/config';
import {
  CREATE_SUBSCRIPTION_FIRSTTIME,
  SUBSCRIPTION_API,
} from '../../../../apis/constants';
import {
  EXPANDED,
  SUBSCRIPTION_INDIVIDUAL,
  URL_HELPERS,
} from '../../../../appConstants';
import IndividualSeatPlan from '../../../../smartComponents/Plan/NewIndividualSeatPlan';
import { PlanProvider } from '../../../../smartComponents/Plan/context/planProvider';

export class SubscriptionSetup extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  onCreateSubscriptionSuccess = () => {
    const { pathName, history } = this.props;
    if (pathName) {
      history.push(pathName);
    } else {
      history.push(URL_HELPERS.myTours());
    }
  };

  onCreateSubscriptionFail = () => {};

  submitSubscription = async () => {
    const { userId, knownAs, firstName, lastName, email } = this.props;
    const {
      planId,
      stripeData,
      freePlanId,
    } = await this.ref.current.collectPaymentInfo();
    const selectPlan = stripeData ? planId : freePlanId;
    if (stripeData && stripeData.error) {
      // Do something about the error
      return;
    }
    const subscription = {
      userId,
      name: knownAs && knownAs !== '' ? knownAs : `${firstName} ${lastName}`,
      planIds: [selectPlan],
      source: stripeData ? stripeData.token.id : null,
      email,
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
        <Helmet
          title="Subscription"
          meta={[
            {
              name: 'description',
              content: 'Subscription',
            },
          ]}
        />
        <IndividualSeatPlan
          variant={EXPANDED}
          type={SUBSCRIPTION_INDIVIDUAL}
          ref={this.ref}
          onSubmit={this.submitSubscription}
          isUpgrade
          showDurationSwitch
          loading={this.props.creatingSubscription}
          subscriptionItemIndex={0}
        />
      </PlanProvider>
    ) : (
      <div />
    );
    return view;
  }
}

SubscriptionSetup.propTypes = {
  history: PropTypes.object,
  userId: PropTypes.number,
  email: PropTypes.string,
  knownAs: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  resaga: PropTypes.object,
  pathName: PropTypes.string,
  creatingSubscription: PropTypes.bool,
};

SubscriptionSetup.defaultProps = {};

export default compose(
  withRouter,
  resaga(SUBSCRIPTION_CONFIG),
  DonePersonSubscriptionOwner,
)(SubscriptionSetup);
