import React from 'react';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import P from 'viewComponents/Typography';
import { TourFrom, URL_HELPERS } from 'appConstants';
import PropTypes from 'prop-types';
import { STRING_HELPERS } from '../../utils/stringAdditions';
import Link from '../../components/Link';
import useUserNodesInTours from '../../hooks/useUserNodesInTours';
import useTourFrom from '../../hooks/useTourFrom';
import { useGlobalContext } from '../../containers/App/globalStateContext';
import { makeStyles } from '../../components/material-ui';
const styles = {
  buttonTextAlign: {
    textAlign: 'right',
  },
};
const useStyles = makeStyles(styles);
export function BuymoreTourSeats(props) {
  const classes = useStyles();
  const { templateId } = props;
  const [globalContext] = useGlobalContext();
  const { from, orgId } = useTourFrom({ templateId });
  const recalculateRemainingSeats = () => {
    if (orgId) {
      const num =
        globalContext.BillingContext.org.tourSeats -
        globalContext.BillingContext.org.connectedPax;
      return Math.round(num);
    }
    const num =
      globalContext.BillingContext.person.tourSeats -
      globalContext.BillingContext.person.connectedPeople;
    if (num < 1) {
      if (num === 0.5) {
        return 1;
      }
      return 0;
    }
    return Math.round(num);
  };

  const remainingSeats = recalculateRemainingSeats();
  const { isLoginUserPartOfTours, tourOwner } = useUserNodesInTours({
    templateId,
  });

  const renderBuyMore = () => {
    let link;
    if (orgId) {
      link = URL_HELPERS.orgSubscriptionUpgrade(orgId);
    } else {
      link = URL_HELPERS.personalSettingBilling();
    }
    const num =
      globalContext.BillingContext.person.tourSeats -
      globalContext.BillingContext.person.connectedPeople;
    if (remainingSeats <= 0 || num === 0.5) {
      return (
        <GridItem className={classes.buttonTextAlign}>
          <Link to={link}>Buy more</Link>
        </GridItem>
      );
    }
    return null;
  };
  if (!isLoginUserPartOfTours || (from === TourFrom.PERSONAL && !tourOwner)) {
    return <GridItem data-testid="no-access-buy-more" />;
  }
  return (
    <GridItem>
      <GridContainer direction="column" wrap="nowrap" spacing={0}>
        <GridItem data-testid="tourRemainingSeats">
          <P noMargin subtitle>
            {remainingSeats} tour{' '}
            {STRING_HELPERS.pluralise('seat', remainingSeats, true)} left
          </P>
        </GridItem>
        {renderBuyMore()}
      </GridContainer>
    </GridItem>
  );
}

BuymoreTourSeats.propTypes = {
  templateId: PropTypes.number,
};

export default React.memo(BuymoreTourSeats);
