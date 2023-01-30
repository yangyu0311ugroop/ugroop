import React from 'react';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { H2 } from 'viewComponents/Typography';
import { URL_HELPERS } from 'appConstants';
import Widget from 'smartComponents/Customer/components/Widget';
import PropTypes from 'prop-types';
import CurrentPeriodEndDate from 'smartComponents/Customer/parts/Subscription/CurrentPeriondEndDate';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CUSTOMER_RESELECTOR } from '../../../../datastore/customerDataImmerStore/selectors';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
export const NextDue = props => {
  const history = useHistory();
  const customerId = useSelector(state =>
    CUSTOMER_RESELECTOR.makeSelectCustomerId(state, {
      orgId: props.orgId,
      userId: props.userId,
    }),
  );

  const currentSubscriptionId = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionId)(state, {
      customerId,
    }),
  );
  const viewPaymentHistory = () => {
    const { orgId, userId } = props;
    let PathName = URL_HELPERS.personalViewPaymentHistory(userId);
    if (orgId) {
      PathName = URL_HELPERS.orgViewPaymentHistory(orgId);
    }

    history.push({
      pathname: PathName,
    });
  };
  const renderContent = () => (
    <H2 dense textAlign="center" data-testid="nextDueDate">
      <CurrentPeriodEndDate id={currentSubscriptionId} />
    </H2>
  );

  const renderAction = () => (
    <Button
      variant={VARIANTS.INLINE}
      size="small"
      dense
      onClick={viewPaymentHistory}
      buttonText
    >
      Past payments and receipts
    </Button>
  );

  return (
    <Widget
      title="Next Payment Due"
      renderContent={renderContent}
      renderAction={renderAction}
    />
  );
};

NextDue.propTypes = {
  orgId: PropTypes.number,
  userId: PropTypes.number,
};

NextDue.defaultProps = {};

export default React.memo(NextDue);
