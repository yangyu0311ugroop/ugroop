import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import { Radio, FormControlLabel, makeStyles } from 'components/material-ui';
import { H5 } from 'viewComponents/Typography';
import GridItem from 'components/GridItem';
import _ from 'lodash';
import { pluralizeText } from '../../../../../utils/stringAdditions';
import { SubscriptionCalculationUtility } from '../../../../../utils/subscriptionCalculation';
import {
  ORG_SEAT_LABEL,
  SUBSCRIPTION_FREE_PLANS,
  SUBSCRIPTION_FREE_TOUR_PLANS,
} from '../../../../../appConstants';
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
    marginTop: 8,
  },
  item: {
    padding: '8px 16px',
    paddingLeft: 1,
  },
};
const useStyles = makeStyles(styles);
function Item(props) {
  const classes = useStyles();
  const { quantity, id } = props;

  const {
    PlanAmount: amount,
    PlanTierAmount: firstTierAmount,
    PlanInterval: interval,
    PlanName: planNickName,
    PlanMetaDescription: planName,
    PlanSecondTierAmount: secondTierAmount,
    PlanCurrency: currency,
    PlanFirstPurchase: planFirstPurchase,
    PlanType: planType,
  } = useSelectorPlanData({
    planId: id,
  });

  const renderLabel = () => {
    const c = SubscriptionCalculationUtility.currencyLabelConversion(currency);
    let priceComponent = null;
    let seats;
    let planSummary = null;
    if (planType === 'tourseat') {
      const tierIndex = SubscriptionCalculationUtility.convertQuantityIntoTierIndex(
        quantity,
      );
      const price = SubscriptionCalculationUtility.convertIndexToAmount(
        tierIndex,
        interval,
      );
      if (quantity > 100) {
        seats = ` unlimited tour seats`;
      } else if (quantity <= 1) {
        if (SUBSCRIPTION_FREE_TOUR_PLANS.includes(planNickName)) {
          seats = ` You don't have any tour seats under free plan.`;
        } else {
          seats = ` upto ${20} tour seats`;
        }
      } else {
        seats = ` upto ${quantity} tour seats`;
      }
      planSummary = <JText>{seats}</JText>;
      const p = Number(_.round(price, 2)).toFixed(2);
      priceComponent = (
        <GridItem>
          <GridContainer spacing={0} direction="column">
            <GridItem className={classes.priceStyle}>
              <JText bold xl>
                {c.toUpperCase()} ${p}
              </JText>
            </GridItem>
            <GridItem className={classes.priceStyle}>
              <H5 dense textAlign="right">
                / {interval}
              </H5>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    } else {
      if (SUBSCRIPTION_FREE_PLANS.includes(planNickName)) {
        planSummary = (
          <JText nowrap={false}>
            allow you to connect one person as view role per tour
          </JText>
        );
      } else {
        planSummary = (
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

      const value = amount || firstTierAmount || 0;
      const v = Number(_.round(value / 100)).toFixed(2);
      priceComponent = (
        <GridItem>
          <GridContainer spacing={0} direction="column">
            <GridItem className={classes.priceStyle}>
              <JText bold xl>
                {c.toUpperCase()} ${v}
              </JText>
            </GridItem>
            <GridItem className={classes.priceStyle}>
              <H5 dense textAlign="right">
                / {interval}
              </H5>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }
    return (
      <>
        <GridContainer spacing={0} className={classes.item}>
          <GridItem className={classes.grow}>
            <GridContainer direction="column">
              <GridItem>
                <JText bolder xl>
                  {planName}
                </JText>
              </GridItem>
              <GridItem>{planSummary}</GridItem>
            </GridContainer>
          </GridItem>
          {priceComponent}
        </GridContainer>
      </>
    );
  };

  const checked = true;
  return (
    <FormControlLabel
      label={renderLabel()}
      control={<Radio checked={checked} />}
      className={classnames(classes.root)}
    />
  );
}

Item.propTypes = {
  // resaga props
  id: PropTypes.string,
  quantity: PropTypes.number,
};

Item.defaultProps = {};

export default React.memo(Item);
