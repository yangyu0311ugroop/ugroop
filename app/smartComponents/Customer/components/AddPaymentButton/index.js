import { CARD_API_HELPERS } from 'apis/components/Cards/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import Button from 'viewComponents/Button';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import { Text } from 'ugcomponents/Inputs';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';
import { FORM_FIELD_TITLE, FORM_FIELD_NAME } from './constants';
import { usePlanContext } from '../../../Plan/context/planStateContext';
import { isEmptyString } from '../../../../utils/stringAdditions';
import JText from '../../../../components/JText';
function usePaymentButton(props) {
  const [isModalOpen, setModalState] = useState(false);
  const [isLoading, setLoadingState] = useState(false);
  const { id } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [planState, dispatchPlanState] = usePlanContext();
  const onOpenModal = () => {
    setModalState(true);
  };

  const onCloseModal = () => {
    setModalState(false);
    setLoadingState(false);
  };

  const createCardSuccess = () => {
    setModalState(false);
    setLoadingState(false);
  };
  const createCardError = () => {
    setLoadingState(false);
  };

  const onFormChanges = () => {
    setLoadingState(false);
  };

  const onCardChanges = () => {
    dispatchPlanState.setStripeError('');
  };
  const renderSubmitButtonContent = () => <M {...m.submitButtonText} />;

  const submitForm = async ({ cardName }) => {
    setLoadingState(true);
    const cardElement = elements.getElement(CardElement);
    cardElement.name = cardName;
    const { token, error } = await stripe.createToken(cardElement);
    if (token) {
      CARD_API_HELPERS.createCustomerCard(
        {
          id,
          data: { source: token.id },
          onSuccess: createCardSuccess,
          onError: createCardError,
        },
        props,
      );
    } else {
      setLoadingState(false);
      if (error) {
        dispatchPlanState.setStripeError(error.message);
      }
    }
  };

  const displayError = () => {
    if (!isEmptyString(planState && planState.stripeError)) {
      return (
        <GridItem>
          <JText sm danger>
            {planState.stripeError}
          </JText>
        </GridItem>
      );
    }
    return null;
  };
  const renderDialogContent = () => (
    <GridContainer direction="column">
      <GridItem data-testid="addPaymentCardName">
        <Text
          inputProps={{
            'data-testid': FORM_FIELD_NAME.CARD_NAME,
          }}
          required
          name={FORM_FIELD_NAME.CARD_NAME}
          label={FORM_FIELD_TITLE.CARD_NAME_TITLE}
        />
      </GridItem>
      <GridItem data-testid="addPaymentStripeCardNumber">
        <CardElement hidePostalCode onChange={onCardChanges} />
      </GridItem>
      {displayError()}
    </GridContainer>
  );

  const renderAddButton = () => (
    <Button
      data-testid="add-payment-method-btn"
      color="primary"
      size="small"
      onClick={onOpenModal}
    >
      <M {...m.AddPaymentButtonText} />
    </Button>
  );

  const renderHeader = ({ renderCloseButton }) => (
    <>
      <Title heading={<M {...m.FormTitleText} />} />
      {renderCloseButton()}
    </>
  );
  renderHeader.propTypes = {
    renderCloseButton: PropTypes.func,
  };

  const renderDialogForm = () => (
    <DialogForm
      open={isModalOpen}
      onClose={onCloseModal}
      onCancel={onCloseModal}
      renderHeader={renderHeader}
      onFormValidSubmit={submitForm}
      canSubmitForm={!isLoading}
      onFormChange={onFormChanges}
      submitButtonContent={renderSubmitButtonContent()}
      fullWidth={false}
      size={SIZE_CONSTANTS.SM}
      dialogProps={{
        'data-testid': 'add-payment-dialog-form',
      }}
    >
      {renderDialogContent()}
    </DialogForm>
  );
  return {
    isModalOpen,
    onCloseModal,
    onOpenModal,
    isLoading,
    submitForm,
    renderSubmitButtonContent,
    renderDialogContent,
    renderAddButton,
    renderHeader,
    renderDialogForm,
    createCardSuccess,
  };
}

export const AddPaymentButton = ({ ...props }) => {
  const paymentFunc = usePaymentButton(props);

  return (
    <React.Fragment>
      {paymentFunc.renderAddButton()}
      {paymentFunc.renderDialogForm()}
    </React.Fragment>
  );
};

AddPaymentButton.propTypes = {
  id: PropTypes.string,
};

AddPaymentButton.defaultProps = {};

export default compose(resaga())(AddPaymentButton);
