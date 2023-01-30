import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'ugcomponents/Form';
import { makeStyles } from 'components/material-ui';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import { EditableTextForm } from '../../../Editables';
import { Number as NumberInput, Select as SelectField } from '../../../Inputs';
import inputs from './inputs';
import { usePlanContext } from '../../context/planStateContext';
import { UPGRADE } from '../../../../appConstants';

const styles = {
  root: {
    width: 181,
    margin: '0 8px',
  },
  seatInput: {
    width: 181,
    border: '1px solid #E0E8ED',
  },
  paddingSmall: {
    padding: '4px 0',
  },
};
const useStyles = makeStyles(styles);
function SubscriptionSeats(props) {
  const {
    inputValidation,
    type,
    previewUpcomingInvoice,
    myForwardedRef,
    currentPlanId,
    customerId,
    currentPaymentSource,
  } = props;
  const [planState, dispatch] = usePlanContext();
  useEffect(() => {
    dispatch.setAdditionalSeat(1);
  }, []);
  const stripe = useStripe();
  const elements = useElements();
  myForwardedRef.current = {
    collectPreviewInfo,
    collectPaymentInfo,
  };

  function collectPreviewInfo() {
    return { type, planId: currentPlanId, customerId };
  }

  async function collectPaymentInfo() {
    let stripeData = null;
    if (currentPaymentSource == null) {
      const cardElement = elements.getElement(CardElement);
      stripeData = await stripe.createToken(cardElement);
      if (stripeData.error) {
        dispatch.setStripeError(stripeData.error.message);
      } else {
        dispatch.setStripeError('');
      }
    }
    return {
      type,
      planId: currentPlanId,
      customerId,
      stripeData,
    };
  }

  const classes = useStyles();
  const onSubmit = previewUpcomingInvoice;
  let inputComponent;
  if (planState.subscriptionProcess === UPGRADE) {
    inputComponent = (
      <EditableTextForm
        value={planState.additionalSeat}
        editableClass={classes.seatInput}
        TextComponent={NumberInput}
        {...inputs.AddSeat}
        hideClearButton
        onSubmit={onSubmit}
        TextProps={{ ...inputValidation }}
      />
    );
  } else {
    inputComponent = (
      <Form onValidSubmit={onSubmit}>
        <SelectField
          value={planState.additionalSeat}
          name="Seats"
          options={inputValidation.options}
          onChange={onSubmit}
        />
      </Form>
    );
  }
  return (
    <GridContainer direction="column" spacing={0} className={classes.root}>
      <GridItem>{inputComponent}</GridItem>
    </GridContainer>
  );
}

SubscriptionSeats.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  handleTotalAmount: PropTypes.func,
  seat: PropTypes.number,
  type: PropTypes.string,
  previewUpcomingInvoice: PropTypes.func,
  inputValidation: PropTypes.object,
  myForwardedRef: PropTypes.object,
  currentPlanId: PropTypes.string,
  customerId: PropTypes.string,
  currentPaymentSource: PropTypes.string,
};

SubscriptionSeats.defaultProps = {};

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <SubscriptionSeats {...props} myForwardedRef={ref} />
));
