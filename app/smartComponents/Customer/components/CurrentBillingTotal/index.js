import PropTypes from 'prop-types';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import Widget from 'smartComponents/Customer/components/Widget';
import styles from 'smartComponents/Customer/components/CurrentBillingTotal/styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { URL_HELPERS } from '../../../../appConstants';
import PriceDisplay from '../../../../ugcomponents/PriceDisplay';
import PopoverButton from '../SubscribedPlan/parts/button';
import { H2, Span } from '../../../../viewComponents/Typography';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import { isNumber } from '../../../../utils/numberAdditions';
import { historyPushWithState } from '../../../../utils/routeUtility';
import {
  isEmptyString,
  parseStringJson,
} from '../../../../utils/stringAdditions';
import { makeStyles } from '../../../../components/material-ui';
import { useSelectorCurrentSubscriptionData } from '../../../Plan/hooks/useSelectorCurrentSubscriptionData';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { INVOICE_RESELECTOR } from '../../../../datastore/invoiceImmerStore/selectors';
const useStyles = makeStyles(styles);
function CurrentBillingTotal(props) {
  const { orgId } = props;
  const data = useSelectorCurrentSubscriptionData(props);
  const currency = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId: data.customerId,
      attribute: 'currency',
    }),
  );
  const currentAmountDue = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId: data.customerId,
      attribute: 'amount_due',
    }),
  );

  const currentStartBalance = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId: data.customerId,
      attribute: 'starting_balance',
    }),
  );

  const currentEndBalance = useSelector(state =>
    makeSingleSelect(INVOICE_RESELECTOR.selectCurrentInvoiceAttribute)(state, {
      customerId: data.customerId,
      attribute: 'ending_balance',
    }),
  );
  const {
    currentSubscriptionPlans,
    nextPhasePlans,
    currentActiveScheduleId,
  } = data;
  const plans = parseStringJson(currentSubscriptionPlans);
  const nextPlans = parseStringJson(nextPhasePlans);
  const intervals = plans.map(o => o.interval);
  const nextIntervals = nextPlans.map(o => o.interval);
  const interval = intervals && intervals.length > 0 ? intervals[0] : null;
  const nextInterval =
    nextIntervals && nextIntervals.length > 0 ? nextIntervals[0] : null;
  const classes = useStyles();
  const history = useHistory();
  const changeDuration = () => {
    if (orgId) {
      if (interval === 'month') {
        historyPushWithState({
          history,
          path: URL_HELPERS.orgSubscriptionDurationChangeUpgrade(orgId),
          state: { userActions: true, orgId },
        });
      } else {
        historyPushWithState({
          history,
          path: URL_HELPERS.orgSubscriptionDurationChangeDowngrade(orgId),
          state: { userActions: true, orgId },
        });
      }
    } else if (interval === 'month') {
      historyPushWithState({
        history,
        path: URL_HELPERS.subscriptionDurationChangeUpgrade(),
        state: { userActions: true },
      });
    } else {
      historyPushWithState({
        history,
        path: URL_HELPERS.subscriptionDurationChangeDowngrade(),
        state: { userActions: true },
      });
    }
  };

  const changeDurationLabel = () => {
    if (!isEmptyString(nextInterval)) {
      if (nextInterval === 'month') {
        return 'Change to yearly billing and save upto 20%';
      }
      return 'Change to monthly billing';
    }
    if (interval === 'month') {
      return 'Change to yearly billing and save upto 20%';
    }
    return 'Change to monthly billing';
  };

  const renderRemainingCredits = credits => {
    if (credits < 0) {
      const view = (
        <GridItem
          className={classes.textAlignCenter}
          data-testid="remainingCredits"
        >
          <Span noMargin>(Remaining Credits ${Math.abs(credits) / 100})</Span>
        </GridItem>
      );

      return view;
    }
    return null;
  };

  const renderContent = () => (
    <>
      <GridContainer direction="column" spacing={0}>
        <GridItem data-testid="currentTotalPrice">
          <PriceDisplay
            interval={!isEmptyString(nextInterval) ? nextInterval : interval}
            currency={currency}
            amount={isNumber(currentAmountDue) ? currentAmountDue / 100 : 0}
            quantity={1}
            excludeTax
            Component={H2}
          />
        </GridItem>
        {renderRemainingCredits(
          isNumber(currentStartBalance)
            ? currentStartBalance
            : currentEndBalance,
        )}
      </GridContainer>
    </>
  );

  const renderAction = () => {
    const menuOption = `Downgrade pending`;
    return (
      <PopoverButton
        buttonLabel={changeDurationLabel()}
        options={[menuOption]}
        currentActiveScheduleId={currentActiveScheduleId}
        size="extraSmall"
        variant={VARIANTS.INLINE}
        disableIndex={0}
        buttonClick={changeDuration}
      />
    );
  };
  return (
    <Widget
      title="Billing Total"
      renderContent={renderContent}
      renderAction={renderAction}
    />
  );
}

CurrentBillingTotal.propTypes = {
  orgId: PropTypes.number,
};

CurrentBillingTotal.defaultProps = {};

export default React.memo(CurrentBillingTotal);
