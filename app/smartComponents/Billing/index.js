import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React from 'react';
import Hr from 'components/Hr';
import CurrentBillingTotal from 'smartComponents/Customer/components/CurrentBillingTotal';
import NextDue from 'smartComponents/Customer/components/NextDue';
import PaymentInformation from 'smartComponents/Customer/components/PaymentInformation';
import { PAGE_HELMETS } from 'appConstants';
import { Helmet } from 'react-helmet';
import { isNumber } from 'utils/numberAdditions';
import { useSelector } from 'react-redux';
import styles from './styles';
import CurrentSubscriptionList from '../Customer/components/CurrentSubscriptionLists';
import { makeStyles } from '../../components/material-ui';
import { ORG_DATASTORE_RESELECTORS } from '../../datastore/orgStore/selectorsViaConnect';
const useStyles = makeStyles(styles);
function Billing(props) {
  const classes = useStyles();
  const { userId, orgId } = props;
  const orgSeats = useSelector(store =>
    ORG_DATASTORE_RESELECTORS.getOrganisationSeats(store, {
      id: orgId,
    }),
  );
  const billingType = !isNumber(orgId) ? 'Personal' : 'Organisation';
  return (
    <GridContainer className={classes.root} direction="column">
      <Helmet
        title={`${billingType} ${PAGE_HELMETS.BILLING} | Settings `}
        meta={[{ name: 'description', content: 'Description of Billing' }]}
      />
      <GridItem>
        <GridContainer direction="column" card elevation={2}>
          <GridItem>
            <JText gray xl bold>
              Billing Overview
            </JText>
          </GridItem>
          <GridItem>
            <Hr half />
          </GridItem>
          <GridItem>
            <GridContainer alignItems="center">
              <GridItem xs={12} md={6}>
                <CurrentBillingTotal
                  orgId={orgId}
                  userId={userId}
                  orgSeats={orgSeats}
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <NextDue orgId={orgId} userId={userId} />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <GridContainer direction="column" card elevation={2}>
          <GridItem>
            <JText gray xl bold>
              Subscriptions
            </JText>
          </GridItem>
          <GridItem>
            <Hr half />
          </GridItem>
          <GridItem>
            <CurrentSubscriptionList
              userId={userId}
              orgId={orgId}
              orgSeats={orgSeats}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <GridContainer direction="column" card elevation={2}>
          <GridItem>
            <JText gray xl bold>
              Payment Information
            </JText>
          </GridItem>
          <GridItem>
            <Hr half />
          </GridItem>
          <GridItem>
            <PaymentInformation orgId={orgId} userId={userId} />
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}

Billing.propTypes = {
  // parent props
  orgId: PropTypes.number,
  userId: PropTypes.number,
};

Billing.defaultProps = {};

export default React.memo(Billing);
