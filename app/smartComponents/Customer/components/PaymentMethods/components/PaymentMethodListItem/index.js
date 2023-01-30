import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import { CARD_API_HELPERS } from 'apis/components/Cards/helpers';
import { PAYMENT_METHOD_API_HELPERS } from 'apis/components/PaymentMethod/helpers';
import { CUSTOMER_API_HELPERS } from 'apis/components/Customer/helpers';
import { DeleteConfirmationDialog } from 'ugcomponents/DialogPopup';
import { FormattedMessage as M } from 'react-intl';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import { FIELD_VARIANTS } from 'smartComponents/Customer/constants';
import { H5 } from 'viewComponents/Typography';
import { Collapse } from '@material-ui/core';
import { get } from 'lodash';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { useHistory } from 'react-router-dom';

// Parts
import Brand from 'smartComponents/Customer/parts/PaymentSources/components/Brand';
import CardNo from 'smartComponents/Customer/parts/PaymentSources/components/CardNo';
import ExpiryDate from 'smartComponents/Customer/parts/PaymentSources/components/ExpiryDate';
import ExpiryMonth from 'smartComponents/Customer/parts/PaymentSources/components/ExpiryMonth';
import ExpiryYear from 'smartComponents/Customer/parts/PaymentSources/components/ExpiryYear';
import CustomerInfo from 'smartComponents/Customer/parts/Info';
// Address
import Line1 from 'smartComponents/Customer/parts/PaymentSources/components/address/Line1';
import Line2 from 'smartComponents/Customer/parts/PaymentSources/components/address/Line2';
import City from 'smartComponents/Customer/parts/PaymentSources/components/address/City';
import PostalCode from 'smartComponents/Customer/parts/PaymentSources/components/address/PostalCode';
import State from 'smartComponents/Customer/parts/PaymentSources/components/address/State';
import Country from 'smartComponents/Customer/parts/PaymentSources/components/address/Country';
import styles from './styles';
import m from './messages';
import { LOGIC_HELPERS } from '../../../../../../utils/helpers/logic';
import { makeStyles } from '../../../../../../components/material-ui';
const useStyles = makeStyles(styles);
export const PaymentMethodListItem = props => {
  const classes = useStyles();
  const history = useHistory();
  const [isDeleteModalOpen, setDeleteModalState] = useState(false);
  const [isEditModalOpen, setEditModalState] = useState(false);
  const [isSetDefaultModalOpen, setSetDefaultModalState] = useState(false);
  const [isLoading, setLoadingState] = useState(false);
  const [showMore, setMoreState] = useState(false);
  const [errorState, setErrorState] = useState('');

  const { id, customerId, ...rest } = props;

  const renderPart = (Component, partPops, variant) => (
    <Component variant={variant} {...partPops} />
  );

  const toggleMore = () => setMoreState(!showMore);
  const isDefault = true;
  const deleteCardSuccess = () => {
    onCloseDeleteModal();
  };
  const updatePaymentMethodSuccess = ({ error }) => {
    if (error) return setLoadingState(false);

    setLoadingState(false);
    return onCloseEditModal();
  };

  const updatePaymentMthodError = result => {
    setErrorState(
      get(result, 'response.error.body.message.error.exceptions.0.message', ''),
    );
    setLoadingState(false);
  };

  const deleteCard = async () => {
    setLoadingState(true);
    CARD_API_HELPERS.deleteCustomerCard(
      {
        id: customerId,
        cardId: id,
        isDefault: true,
        onSuccess: deleteCardSuccess,
      },
      rest,
    );
  };

  const updateCustomerSuccess = () => {
    rest.resaga.setValue({ defaultSourceId: id, defaultSource: id });
    setSetDefaultModalState(false);
    return onCloseSetDefaultModal();
  };

  const updateCustomerError = () => {
    setSetDefaultModalState(false);
  };

  const handleFormValidSubmit = ({ model }) => {
    setErrorState('');
    const { exp_month: expMonth, exp_year: expYear, ...address } = model;
    PAYMENT_METHOD_API_HELPERS.updatePaymentMethod(
      {
        id,
        data: {
          card: {
            exp_month: expMonth,
            exp_year: expYear,
          },
          billing_details: {
            address,
          },
        },
        onSuccess: updatePaymentMethodSuccess,
        onError: updatePaymentMthodError,
      },
      rest,
    );
  };

  const handleUpdateCustomer = () => {
    setLoadingState(true);
    CUSTOMER_API_HELPERS.updateCustomer(
      {
        id: customerId,
        data: {
          default_source: id,
        },
        onSuccess: updateCustomerSuccess,
        onError: updateCustomerError,
      },
      rest,
    );
  };

  const onOpenDeleteModal = () => {
    setDeleteModalState(true);
  };

  const onCloseDeleteModal = () => {
    setErrorState('');
    setLoadingState(false);
    setDeleteModalState(false);
  };

  const onOpenEditModal = () => {
    setEditModalState(true);
  };

  const onCloseEditModal = () => {
    setErrorState('');
    setEditModalState(false);
    setLoadingState(false);
  };

  const onOpenSetDefaultModal = () => {
    setSetDefaultModalState(true);
  };

  const onCloseSetDefaultModal = () => {
    setSetDefaultModalState(false);
  };

  const buttonPros = {
    variant: VARIANTS.INLINE,
    size: 'xs',
    dense: true,
  };

  const renderConfirm = parm => <DeleteConfirmationDialog {...parm} />;

  const renderActions = () => (
    <GridContainer spacing={0}>
      <GridItem data-testid="editCardButton">
        <Button {...buttonPros} onClick={onOpenEditModal}>
          <M {...m.actionEditButtonLabel} />
        </Button>
      </GridItem>
      <GridItem data-testid="removeCardButton">
        <Button {...buttonPros} onClick={onOpenDeleteModal}>
          <M {...m.actionDeleteButtonLabel} />
        </Button>
      </GridItem>
      {!isDefault && (
        <GridItem>
          <Button {...buttonPros} onClick={onOpenSetDefaultModal}>
            <M {...m.actionDefaultButtonLabel} />
          </Button>
        </GridItem>
      )}
    </GridContainer>
  );

  const renderDefaultBadge = () => (
    <GridItem>
      <H5 className={classes.badge} dense>
        Default
      </H5>
    </GridItem>
  );
  const renderCardViewDetail = () => (
    <GridItem>
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <GridContainer direction="row">
            <GridItem data-testid="cardBrand">
              {renderPart(Brand, { id })}
            </GridItem>
            <GridItem data-testid="cardNum">
              {renderPart(CardNo, { id })}
            </GridItem>
            <GridItem data-testid="cardExpiry">
              {renderPart(ExpiryDate, { id })}
            </GridItem>
            {isDefault && renderDefaultBadge()}
          </GridContainer>
        </GridItem>
        <GridItem className={classes.actionButton}>{renderActions()}</GridItem>
      </GridContainer>
    </GridItem>
  );
  const generateButton = () => {
    const text = showMore ? 'Show Less' : 'Show More';

    return (
      <GridItem className={classes.button} data-testid="showmore">
        <Button variant="inline" onClick={toggleMore}>
          <H5 weight="bold" subtitle>
            {text}
          </H5>
        </Button>
      </GridItem>
    );
  };

  const renderError = () => (
    <Collapse in={!!errorState}>
      <GridItem className={classes.error}>{errorState}</GridItem>
    </Collapse>
  );

  const renderEditableHeader = ({ renderCloseButton }) => (
    <React.Fragment>
      <Title
        heading={<M {...m.headingBackground} />}
        // renderSubheading={renderSubHeading}
        headingBackground={<M {...m.headingBackground} />}
        headingUnderline={false}
      />
      {renderCloseButton()}
    </React.Fragment>
  );

  const onFormChanges = () => setErrorState('');

  renderEditableHeader.propTypes = {
    renderCloseButton: PropTypes.func,
  };

  const renderMore = () => (
    <React.Fragment>
      <GridItem data-testid="line1">
        {renderPart(Line1, { id }, FIELD_VARIANTS.TEXT_FIELD)}
      </GridItem>
      <GridItem>
        {renderPart(Line2, { id }, FIELD_VARIANTS.TEXT_FIELD)}
      </GridItem>
      <GridItem data-testid="city">
        {renderPart(City, { id }, FIELD_VARIANTS.TEXT_FIELD)}
      </GridItem>
      <GridItem>
        {renderPart(PostalCode, { id }, FIELD_VARIANTS.TEXT_FIELD)}
      </GridItem>
      <GridItem>
        {renderPart(State, { id }, FIELD_VARIANTS.TEXT_FIELD)}
      </GridItem>
      <GridItem>
        {renderPart(Country, { id }, FIELD_VARIANTS.TEXT_FIELD)}
      </GridItem>
    </React.Fragment>
  );

  const handleGoBack = () => () => history.go(-1);

  const renderReadOnly = ({ orgId, userId }) => {
    const subheaderText = LOGIC_HELPERS.ifElse(
      orgId,
      'Organisation account',
      'Personal account',
    );
    const subheader = (
      <H5 dense subtitle>
        {subheaderText}
      </H5>
    );

    return (
      <GridItem>
        <GridContainer alignItems="center" justify="space-between" spacing={0}>
          <GridItem>
            {renderPart(CustomerInfo, { orgId, userId, subheader })}
          </GridItem>
          <GridItem>
            <GridContainer direction="column" alignItems="flex-end" spacing={0}>
              <GridItem>
                <GridContainer>
                  <GridItem>{renderPart(Brand, { id, dense: true })}</GridItem>
                  <GridItem>{renderPart(CardNo, { id, dense: true })}</GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>{renderPart(ExpiryDate, { id, dense: true })}</GridItem>
              <GridItem>
                <Button
                  noMargin
                  noPadding
                  variant="inline"
                  size="extraSmall"
                  onClick={handleGoBack({ history })}
                >
                  Edit...
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  const renderCardEditView = () => (
    <DialogForm
      open={isEditModalOpen}
      onClose={onCloseEditModal}
      onCancel={onCloseEditModal}
      renderHeader={renderEditableHeader}
      onFormValidSubmit={handleFormValidSubmit}
      canSubmitForm={!isLoading}
      submitButtonContent={<M {...m.submitButtonLabel} />}
      fullWidth={false}
      size={SIZE_CONSTANTS.SM}
      onFormChange={onFormChanges}
    >
      <GridItem>
        {renderPart(ExpiryMonth, { id }, FIELD_VARIANTS.TEXT_FIELD)}
      </GridItem>
      <GridItem>
        {renderPart(ExpiryYear, { id }, FIELD_VARIANTS.TEXT_FIELD)}
      </GridItem>
      {generateButton()}
      {showMore && renderMore()}
      {renderError()}
    </DialogForm>
  );

  const { orgId, userId } = props;

  if (props.readOnly) {
    return renderReadOnly({ orgId, userId, history });
  }

  return (
    <React.Fragment>
      {renderCardViewDetail()}
      {renderConfirm({
        dialogTitle: <M {...m.deleteConfirmTitle} />,
        headlineText: <M {...m.deleteConfirmText} />,
        confirmButton: <M {...m.deleteButtonText} />,
        open: isDeleteModalOpen,
        onCancel: onCloseDeleteModal,
        onConfirm: deleteCard,
        disabled: isLoading,
        'data-testid': 'deleteConfirm',
      })}
      {renderConfirm({
        dialogTitle: <M {...m.setDefaultConfirmTitle} />,
        headlineText: <M {...m.setDefaultConfirmText} />,
        confirmButton: <M {...m.setDefaultButtonText} />,
        open: isSetDefaultModalOpen,
        onCancel: onCloseSetDefaultModal,
        onConfirm: handleUpdateCustomer,
        disabled: isLoading,
      })}
      {renderCardEditView()}
    </React.Fragment>
  );
};

PaymentMethodListItem.propTypes = {
  id: PropTypes.string,
  orgId: PropTypes.any,
  userId: PropTypes.number,
  readOnly: PropTypes.bool,
  customerId: PropTypes.string,
};

PaymentMethodListItem.defaultProps = {
  readOnly: false,
};

export default compose(resaga())(React.memo(PaymentMethodListItem));
