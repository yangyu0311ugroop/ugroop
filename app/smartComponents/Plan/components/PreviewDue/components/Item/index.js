import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { H4, H6 } from 'viewComponents/Typography';
import { makeStyles } from 'components/material-ui';
import MOMENT_HELPERS from '../../../../../../utils/helpers/moment';
import {
  isEmptyString,
  pluralizeText,
} from '../../../../../../utils/stringAdditions';
import PriceDisplay from '../../../../../../ugcomponents/PriceDisplay';

const styles = {
  grow: {
    flex: 1,
  },
  period: {
    marginTop: -16,
  },
};
const useStyles = makeStyles(styles);
function Item(props) {
  const classes = useStyles();
  const {
    periodStart,
    periodEnd,
    subtitle,
    type,
    amount,
    currency,
    description,
    excludeTax,
    Component,
    TitleComponent,
    showTax,
    headerSize,
    tax,
    couponPercentOff,
  } = props;
  const renderPeriod = () => {
    if (isEmptyString(periodEnd) || isEmptyString(periodStart)) return null;

    const start = MOMENT_HELPERS.createFromTimeStamp(periodStart);
    const end = MOMENT_HELPERS.createFromTimeStamp(periodEnd);
    const diff = end.diff(start, 'days');
    const dayText = pluralizeText('day', Number.parseInt(diff, 10), true);

    const displayText = `Prorated for ${diff} ${dayText}`;
    return (
      <GridItem className={classes.period}>
        <H6 dense>{displayText}</H6>
      </GridItem>
    );
  };

  const renderSubtitle = () => {
    if (isEmptyString(subtitle)) return null;
    return <TitleComponent dense>{subtitle}</TitleComponent>;
  };

  if (type === 'coupon') {
    return (
      <>
        <GridItem>
          <GridContainer>
            <GridItem className={classes.grow}>
              <GridContainer direction="column">
                <GridItem>
                  <TitleComponent dense>{description}</TitleComponent>
                </GridItem>
                <GridItem>{renderSubtitle()}</GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <H6 dense>{`${couponPercentOff}% off`}</H6>
            </GridItem>
          </GridContainer>
        </GridItem>
      </>
    );
  }

  if (!amount || type === 'subscription') {
    return null;
  }

  return (
    <>
      <GridItem>
        <GridContainer>
          <GridItem className={classes.grow}>
            <GridContainer direction="column">
              <GridItem>
                <TitleComponent dense>{description}</TitleComponent>
              </GridItem>
              <GridItem>{renderSubtitle()}</GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <PriceDisplay
              amount={amount}
              currency={currency}
              excludeTax={excludeTax}
              headerSize={headerSize}
              Component={Component}
              showTax={showTax}
              textAlign="right"
              tax={tax}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
      {renderPeriod()}
    </>
  );
}

Item.propTypes = {
  amount: PropTypes.number,
  periodStart: PropTypes.number,
  headerSize: PropTypes.number,
  periodEnd: PropTypes.number,
  currency: PropTypes.string,
  description: PropTypes.any,
  tax: PropTypes.number,
  excludeTax: PropTypes.bool,
  Component: PropTypes.any,
  TitleComponent: PropTypes.any,
  showTax: PropTypes.bool,
  type: PropTypes.string,
  subtitle: PropTypes.string,
  couponPercentOff: PropTypes.number,
};

Item.defaultProps = {
  headerSize: 4,
  TitleComponent: H4,
};

export default React.memo(Item);
