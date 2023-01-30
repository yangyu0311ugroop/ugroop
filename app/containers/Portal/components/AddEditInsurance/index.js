import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import InsurancePolicy from 'smartComponents/Person/components/InsurancePolicy';
import Ownership from 'smartComponents/Person/components/InsurancePolicy/parts/Ownership';
import { VARIANTS } from 'variantsConstants';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import DeleteButton from 'viewComponents/DeleteButton';
import JDialog from 'ugcomponents/JDialog';
import JText from 'components/JText';
import { useSelector } from 'react-redux';
import { CONFIG } from './config';
import styles from './styles';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { PERSON_STORE_RESELECTORS } from '../../../../datastore/personDataStore/selectorsViaConnect';

export const AddEditInsurance = memo(props => {
  const {
    onSuccess,
    onDeleteSuccess: onDelete,
    personId,
    id,
    canDelete,
    canEdit,
    userId,
    isUserOwned,
    showOwnerShip,
  } = props;

  const insuranceNumber = useSelector(state =>
    makeSingleSelect(PERSON_STORE_RESELECTORS.selectInsurancePolicyAttribute)(
      state,
      {
        id,
        attribute: 'insuranceNumber',
      },
    ),
  );

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    PORTAL_HELPERS.close(props);
  };

  const handleSubmitSuccess = data => {
    setLoading(false);
    LOGIC_HELPERS.ifFunction(onSuccess, [data]);
    handleClose();
  };

  const onDeleteSuccess = data => {
    setLoading(false);
    LOGIC_HELPERS.ifFunction(onDelete, [data]);
    handleClose();
  };

  const handleSubmitError = () => {
    setLoading(false);
  };

  const handleValidSubmit = model => {
    setLoading(true);
    PERSON_DETAIL_HELPER.addInsurancePolicy(
      {
        personId,
        insurancePolicy: { ...model },
        onSuccess: handleSubmitSuccess,
        onError: handleSubmitError,
      },
      props,
    );
  };

  const handleEditableDeleteClick = () => {
    PERSON_DETAIL_HELPER.removeInsurancePolicy(
      {
        personId,
        id,
        onSuccess: onDeleteSuccess,
        onError: handleSubmitError,
      },
      props,
    );
  };

  // eslint-disable-next-line react/prop-types
  const renderDeleteButton = ({ onClick }) => (
    <Button
      size="xs"
      color="alert"
      onClick={onClick}
      disabled={loading}
      data-testid="add-insurance-delete"
    >
      <GridContainer alignItems="center" spacing={0}>
        <GridItem>Delete</GridItem>
      </GridContainer>
    </Button>
  );

  const renderDelete = () => {
    if (!canDelete) return null;
    return (
      <GridItem>
        <DeleteButton
          dialogTitle="Delete this Insurance Policy Information"
          headlineText={
            <JText nowrap={false}>
              Are you sure you want to delete this Insurance Policy{' '}
              <b>{insuranceNumber}</b>?
            </JText>
          }
          confirmButton="Delete Insurance Policy Information"
          onClick={handleEditableDeleteClick}
          renderProp
        >
          {renderDeleteButton}
        </DeleteButton>
      </GridItem>
    );
  };

  const renderCreateAction = () => (
    <GridContainer justify="space-between" noWrap>
      <GridItem>{renderFooter()}</GridItem>
      <GridItem>
        <GridContainer alignItems="center">
          {canEdit && (
            <React.Fragment>
              <GridItem>
                <Button
                  size="xs"
                  color="gray"
                  onClick={handleClose}
                  disabled={loading}
                  data-testid="add-insurance-discard"
                >
                  Discard
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  size="xs"
                  color="primary"
                  type="submit"
                  // disabled={loading}
                  data-testid="add-insurance-save"
                >
                  <GridContainer alignItems="center" spacing={0}>
                    <GridItem>Save</GridItem>
                  </GridContainer>
                </Button>
              </GridItem>
            </React.Fragment>
          )}

          {renderDelete()}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );

  const renderEditAction = () => (
    <GridContainer justify="space-between" noWrap>
      <GridItem>{renderFooter()}</GridItem>
      {canDelete && <GridItem>{renderDelete()}</GridItem>}
    </GridContainer>
  );

  const renderPart = (Component, variantParm, prop) => (
    <Component variant={variantParm} {...prop} />
  );

  const renderSubheading = () => {
    if (!showOwnerShip || id) return null;
    return (
      <GridItem>
        <Ownership futureTense personId={personId} personUserId={userId} />
      </GridItem>
    );
  };

  const renderFooter = () => {
    if (!showOwnerShip || !id) return null;
    return (
      <Ownership
        personId={personId}
        personUserId={userId}
        isUserOwned={isUserOwned}
      />
    );
  };

  const renderContent = () => (
    <GridContainer direction="column">
      {renderSubheading()}
      <GridItem>
        {renderPart(
          InsurancePolicy,
          LOGIC_HELPERS.ifElse(id, VARIANTS.FIELDS_ONLY, VARIANTS.FORM),
          {
            id,
            readOnly: !canEdit,
          },
        )}
      </GridItem>
    </GridContainer>
  );
  return (
    <JDialog
      open
      onClose={handleClose}
      header={
        <JText xl bold>
          {LOGIC_HELPERS.ifElse(
            id,
            'Edit Insurance Policy',
            'Add Insurance Policy',
          )}
        </JText>
      }
      fullWidth
      fullScreen={false}
      headerNoWrap
      headerContainerAlign="baseline"
      customAction={id ? renderEditAction() : renderCreateAction()}
      actionDivider
      onValidSubmit={id ? null : handleValidSubmit}
    >
      {renderContent()}
    </JDialog>
  );
});

AddEditInsurance.propTypes = {
  // hoc props
  // eslint-disable-next-line react/no-unused-prop-types
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  personId: PropTypes.number,
  onSuccess: PropTypes.func,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  onDeleteSuccess: PropTypes.func,
  userId: PropTypes.number,
  isUserOwned: PropTypes.bool,
  showOwnerShip: PropTypes.bool,

  // resaga props
};

AddEditInsurance.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'AddEditInsurance' }),
  resaga(CONFIG),
)(AddEditInsurance);
