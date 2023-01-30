import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import P, { H4 } from 'viewComponents/Typography';
import { Elements } from '@stripe/react-stripe-js';
import PaymentMethodListItem from 'smartComponents/Customer/components/PaymentMethods/components/PaymentMethodListItem';
import Margin from 'viewComponents/Margin';
import { CARD_API_HELPERS } from 'apis/components/Cards/helpers';
import AddPaymentButton from '../AddPaymentButton';
import styles from './styles';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';
import { DEFAULT, CARD } from '../../../../appConstants';
import { StripeContext } from '../../../../lib/stripe';
import { makeStyles } from '../../../../components/material-ui';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { PlanProvider } from '../../../Plan/context/planProvider';

const useStyles = makeStyles(styles);

function PaymentMethods(props) {
  const stripe = useContext(StripeContext);
  const classes = useStyles();
  const { currentPaymentSource, orgId, userId, id } = props;
  useEffect(() => {
    if (!isEmptyString(id)) {
      fetchCards(id);
    }
  });

  const isEmpty = !!isEmptyString(currentPaymentSource);
  const fetchCards = cid => {
    CARD_API_HELPERS.getCustomerCards(
      {
        id: cid,
      },
      props,
    );
  };
  const renderAddButton = () => {
    if (isEmptyString(currentPaymentSource)) {
      return (
        id && (
          <GridItem>
            <Elements stripe={stripe}>
              <AddPaymentButton id={id} />
            </Elements>
          </GridItem>
        )
      );
    }
    return null;
  };

  const renderCards = () => {
    const cardId = currentPaymentSource;
    const cards = (
      <PaymentMethodListItem id={cardId} customerId={id} key={cardId} />
    );

    return (
      <GridItem>
        <GridContainer
          direction="column"
          className={classes.noCardInfo}
          spacing={0}
        >
          {cards}
          {renderAddButton()}
        </GridContainer>
      </GridItem>
    );
  };

  const renderBlankSlate = () => (
    <PlanProvider>
      <Margin top="lg">
        <GridItem>
          <H4 dense weight="bolder">
            No payment methods found
          </H4>
        </GridItem>
        <GridItem>
          <P subtitle dense>
            You do not have any payment methods added yet
          </P>
        </GridItem>
        {renderAddButton()}
      </Margin>
    </PlanProvider>
  );

  const renderCard = () => (
    <PaymentMethodListItem
      orgId={orgId}
      userId={userId}
      customerId={id}
      id={currentPaymentSource}
      readOnly
    />
  );

  const renderDefault = () => (
    <GridContainer
      direction="column"
      className={classes.noCardInfo}
      spacing={0}
    >
      {isEmpty && renderBlankSlate()}
      {!isEmpty && renderCards()}
    </GridContainer>
  );

  const { variant } = props;

  return LOGIC_HELPERS.switchCase(variant, {
    [CARD]: renderCard(),
    [DEFAULT]: renderDefault(),
  });
}

PaymentMethods.propTypes = {
  id: PropTypes.string, // customer Id
  orgId: PropTypes.any,
  userId: PropTypes.number,
  variant: PropTypes.string,
  currentPaymentSource: PropTypes.string,
};

PaymentMethods.defaultProps = {
  variant: DEFAULT,
};

export default compose(resaga())(React.memo(PaymentMethods));
