import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import { Radio, FormControlLabel, makeStyles } from 'components/material-ui';
import { H5 } from 'viewComponents/Typography';
import GridItem from 'components/GridItem';
import _ from 'lodash';
import {
  FREE_ORG_SEATS_THRESHOLD,
  ORG_SEAT_LABEL,
  SUBSCRIPTION_ENTERPRISE,
  SUBSCRIPTION_INDIVIDUAL,
} from '../../../../../appConstants';
import {
  isEmptyString,
  pluralizeText,
} from '../../../../../utils/stringAdditions';
import { SubscriptionCalculationUtility } from '../../../../../utils/subscriptionCalculation';
import { usePlanContext } from '../../../context/planStateContext';
import { isNumber } from '../../../../../utils/numberAdditions';
import { useSelectorPlanData } from '../../../hooks/useSelectorPlanData';
import JText from '../../../../../components/JText';

const styles = {
  root: {
    width: '100%',
    margin: '4px 0',
    padding: '4px 0',
    borderRadius: 4,
    border: '1px solid #9e9e9e',
    '& > span:first-child': {
      marginTop: 12,
      color: '#7097EB',
      alignSelf: 'flex-start',
    },
    '& > span:last-child': {
      width: '100%',
    },
  },
  grow: {
    flex: 1,
  },
  checked: {
    border: '1px solid #7097eb',
    boxShadow: '0 0 16px -8px #7097eb',
  },
  title: {
    marginTop: 0,
  },
  item: {
    padding: '8px 36px',
    paddingLeft: 1,
  },
  priceStyle: {
    textAlign: 'right',
  },
};
const useStyles = makeStyles(styles);
function Item(props) {
  const { id, handleChange, selectedId, type, orgSeats, quantity } = props;
  const classes = useStyles();
  const location = useLocation();

  const {
    PlanAmount: amount,
    PlanTierAmount: firstTierAmount,
    PlanInterval: interval,
    PlanName: planName,
    PlanSecondTierAmount: secondTierAmount,
    PlanCurrency: currency,
    PlanFirstPurchase: planFirstPurchase,
    PlanDetails: planDetails,
    PlanBundleName: planBundleName,
  } = useSelectorPlanData({
    planId: id,
  });

  // useVigilante('Plan Item', {
  //   planName,
  //   currency,
  //   amount,
  //   interval,
  //   firstTierAmount,
  //   planBundleName,
  // });

  const [, dispatch] = usePlanContext();
  useEffect(() => {
    if (id === selectedId) {
      dispatch.setSelectPlanId(selectedId);
      dispatch.setLineAmount(getLineTotal());
      dispatch.setSelectPlanBundleName(planBundleName);
    }
  }, [id, selectedId]);

  const getLineTotal = () => {
    const firstAmount = amount || firstTierAmount || 0;
    if (isEmptyString(planFirstPurchase)) {
      return firstAmount / 100;
    }
    let secondAmount = 0;
    if (quantity >= parseInt(planFirstPurchase, 0)) {
      if (isNumber(secondTierAmount)) {
        secondAmount =
          secondTierAmount * (quantity - parseInt(planFirstPurchase, 0));
      }
    }
    return (firstAmount + secondAmount) / 100;
  };

  const renderPlanSummary = () => {
    const c = SubscriptionCalculationUtility.currencyLabelConversion(currency);

    if (type === SUBSCRIPTION_ENTERPRISE) {
      if (secondTierAmount && !isEmptyString(planFirstPurchase)) {
        return (
          <JText nowrap={false}>
            {`Plan begins with ${planFirstPurchase} ${pluralizeText(
              ORG_SEAT_LABEL,
              parseInt(planFirstPurchase, 10),
            )}`}{' '}
            {`with ${c.toUpperCase()} $${secondTierAmount /
              100} additional ${ORG_SEAT_LABEL} if you need more`}
          </JText>
        );
      }
      if (!isEmptyString(planFirstPurchase) && planFirstPurchase === '1') {
        return <JText nowrap={false}>{` with ${2} users`}</JText>;
      }
    }
    if (type === SUBSCRIPTION_INDIVIDUAL) {
      return <JText nowrap={false}>{planDetails}</JText>;
    }

    return '';
  };

  const renderLabel = () => {
    const c = SubscriptionCalculationUtility.currencyLabelConversion(currency);
    const value = amount || firstTierAmount || 0;

    return (
      <>
        <GridContainer spacing={0} className={classes.item}>
          <GridItem xs={10}>
            <GridContainer direction="column">
              <GridItem>
                <JText bolder xl>
                  {planName}
                </JText>
              </GridItem>
              <GridItem>{renderPlanSummary()}</GridItem>
            </GridContainer>
          </GridItem>
          {value ? (
            <GridItem xs={2}>
              <GridContainer spacing={0} direction="column">
                <GridItem className={classes.priceStyle}>
                  <JText bold xl>
                    {c.toUpperCase()} ${value / 100}
                  </JText>
                </GridItem>
                <GridItem className={classes.priceStyle}>
                  <H5 dense textAlign="right">
                    / {interval}
                  </H5>
                </GridItem>
              </GridContainer>
            </GridItem>
          ) : (
            ''
          )}
        </GridContainer>
      </>
    );
  };

  const checked = selectedId === id;
  const totalAmount = getLineTotal();
  const pathName = location.pathname;
  if (
    type === SUBSCRIPTION_ENTERPRISE &&
    amount === 0 &&
    orgSeats - (FREE_ORG_SEATS_THRESHOLD + 1) > 0 &&
    _.endsWith(pathName, 'new')
  ) {
    return <div />;
  }
  return (
    <FormControlLabel
      value={id}
      label={renderLabel()}
      control={
        <Radio
          onChange={handleChange(
            totalAmount,
            id,
            planFirstPurchase,
            planBundleName,
          )}
          checked={checked}
        />
      }
      className={classnames(classes.root)}
      data-testid="planRadio"
    />
  );
}

Item.propTypes = {
  orgSeats: PropTypes.number,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  selectedId: PropTypes.string,
  type: PropTypes.string,
  quantity: PropTypes.number,
};

Item.defaultProps = {
  orgSeats: 0,
};

export default Item;
