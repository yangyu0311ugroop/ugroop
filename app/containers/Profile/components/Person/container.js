import PersonalSettings from 'containers/PersonalSettings';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withResaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import SubscriptionSetup from 'containers/Personal/components/SubscriptionSetup';
import SubscriptionResubscribe from 'containers/Personal/components/SubscriptionSetup/resubscribe';
import SubscriptionUpgrade from 'containers/Personal/components/SubscriptionUpgrade';
import SubscriptionDowngrade from 'containers/Personal/components/SubscriptionDowngrade';
import ChangeDurationUpgrade from 'containers/Personal/components/SubscriptionChangeDuration/upgrade';
import ChangeDurationDowngrade from 'containers/Personal/components/SubscriptionChangeDuration/downgrade';
import PaymentInvoiceHistory from 'containers/Personal/components/PaymentInvoiceHistory';
import { CONTAINER_CONFIG } from './config';
import { URL_HELPERS } from '../../../../appConstants';

export class PersonContainer extends React.PureComponent {
  getUserId = () =>
    LOGIC_HELPERS.ifElse(
      this.props.match.params.id,
      this.props.match.params.id,
      this.props.userId,
    );

  render = () => {
    const { match, location, resaga } = this.props;
    if (match.path === URL_HELPERS.subscriptionSetup()) {
      return (
        <SubscriptionSetup
          pathName={location.state ? location.state.pathname : null}
        />
      );
    }
    if (match.path === URL_HELPERS.subscriptionResubscribe()) {
      return (
        <SubscriptionResubscribe
          pathName={location.state ? location.state.pathname : null}
        />
      );
    }
    if (match.path === URL_HELPERS.subscriptionUpgrade()) {
      return <SubscriptionUpgrade userId={this.getUserId()} resaga={resaga} />;
    }
    if (match.path === URL_HELPERS.subscriptionDowngrade()) {
      return (
        <SubscriptionDowngrade userId={this.getUserId()} resaga={resaga} />
      );
    }
    if (match.path === URL_HELPERS.subscriptionDurationChangeDowngrade()) {
      return (
        <ChangeDurationDowngrade userId={this.getUserId()} resaga={resaga} />
      );
    }
    if (match.path === URL_HELPERS.subscriptionDurationChangeUpgrade()) {
      return (
        <ChangeDurationUpgrade userId={this.getUserId()} resaga={resaga} />
      );
    }
    if (match.path === URL_HELPERS.personalViewPaymentHistory()) {
      return <PaymentInvoiceHistory userId={this.getUserId()} />;
    }

    return <PersonalSettings {...this.props} userId={this.getUserId()} />;
  };
}

PersonContainer.propTypes = {
  // hoc props
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props

  // resaga props
  userId: COGNITO_STORE_SELECTOR.userId.type,
  resaga: PropTypes.object,
};

PersonContainer.defaultProps = {
  userId: COGNITO_STORE_SELECTOR.userId.defaultValue,
};

export default compose(withResaga(CONTAINER_CONFIG))(PersonContainer);
