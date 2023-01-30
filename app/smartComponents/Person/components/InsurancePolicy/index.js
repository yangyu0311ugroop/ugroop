import React, { useState } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT, THE_BIG_DOT } from 'appConstants';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
// import { EditableForm } from 'smartComponents/Editables';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import DeleteButton from 'viewComponents/DeleteButton';
import { compose } from 'redux';
import { Hidden } from '@material-ui/core';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import {
  InsuranceNumber,
  ExpiryDate,
  CommencementDate,
  EmergencyPhone,
  CompanyName,
} from './parts';
import { CONFIG } from './config';
import styles from './styles';
import { withStyles } from '../../../../components/material-ui';
import Button from '../../../../viewComponents/Button';
import Icon from '../../../../ugcomponents/Icon';

import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { PERSON_STORE_RESELECTORS } from '../../../../datastore/personDataStore/selectorsViaConnect';
import JText from '../../../../components/JText';

export function InsurancePolicy(props) {
  const { id, personId, readOnly, classes, variant } = props;
  const [editing, setEditing] = useState(false);

  const insuranceNumber = useSelector(state =>
    makeSingleSelect(PERSON_STORE_RESELECTORS.selectInsurancePolicyAttribute)(
      state,
      {
        id,
        attribute: 'insuranceNumber',
      },
    ),
  );

  /* const handleEditableSubmit = model => {
    PERSON_DETAIL_HELPER.patchInsurancePolicy(
      {
        personId,
        id,
        insurancePolicy: { ...model },
        onSuccess: handleEditSuccess,
      },
      props,
    );
  }; */

  const onSubmit = ({ model, onSuccess, onError }) => {
    PERSON_DETAIL_HELPER.patchInsurancePolicy(
      {
        personId,
        id,
        insurancePolicy: { ...model },
        onSuccess,
        onError,
      },
      props,
    );
  };

  const handleEditableDeleteClick = ({ onLoad, onClose }) => {
    PERSON_DETAIL_HELPER.removeInsurancePolicy(
      {
        personId,
        id,
        onSuccess: handleEditableDeleteSuccess({
          onLoad,
          onClose,
        }),
        onError: handleEditableDeleteError({ onLoad }),
      },
      props,
    );
  };

  const handleEditableDeleteSuccess = ({ onLoad, onClose }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
    LOGIC_HELPERS.ifFunction(onClose);
  };

  const handleEditableDeleteError = ({ onLoad }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
  };

  const renderPart = (Component, variants, prop = {}) => (
    <Component {...props} variant={variants} {...prop} />
  );

  /* const handleEditSuccess = () => {
    setSuccess(true);
  }; */

  const renderTextOnly = () => (
    <GridContainer wrap="nowrap" alignItems="baseline">
      <GridItem>{renderPart(InsuranceNumber, VARIANTS.TEXT_ONLY)}</GridItem>
    </GridContainer>
  );

  const renderProp = valueParm => {
    if (valueParm) {
      return (
        <React.Fragment>
          <GridItem>{THE_BIG_DOT}</GridItem>
          <GridItem className="j-text-ellipsis">{valueParm}</GridItem>
        </React.Fragment>
      );
    }
    return null;
  };

  const renderForm = () => (
    <GridContainer direction="column">
      <GridItem>
        {renderPart(InsuranceNumber, VARIANTS.TEXT_FIELD, {
          readOnly,
          required: true,
        })}
      </GridItem>
      <GridItem>
        {renderPart(CompanyName, VARIANTS.TEXT_FIELD, { readOnly })}
      </GridItem>
      <GridItem>
        {renderPart(CommencementDate, VARIANTS.TEXT_FIELD, { readOnly })}
      </GridItem>
      <GridItem>
        {renderPart(ExpiryDate, VARIANTS.TEXT_FIELD, { readOnly })}
      </GridItem>
      <GridItem>
        {renderPart(EmergencyPhone, VARIANTS.TEXT_FIELD, { readOnly })}
      </GridItem>
    </GridContainer>
  );

  const editableContent = (isEditing = true) => {
    const isReadOnly = readOnly || !isEditing;
    return (
      <React.Fragment>
        <Hidden xsDown>
          <GridItem xs={7}>
            <GridContainer direction="column">
              <GridItem>
                {renderPart(InsuranceNumber, VARIANTS.TEXT_WITH_LABEL, {
                  required: true,
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
              <GridItem>
                {renderPart(CompanyName, VARIANTS.TEXT_WITH_LABEL, {
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
              <GridItem>
                {renderPart(EmergencyPhone, VARIANTS.TEXT_WITH_LABEL, {
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={5}>
            <GridContainer direction="column">
              <GridItem>
                {renderPart(CommencementDate, VARIANTS.TEXT_WITH_LABEL, {
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
              <GridItem>
                {renderPart(ExpiryDate, VARIANTS.TEXT_WITH_LABEL, {
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
            </GridContainer>
          </GridItem>
        </Hidden>
        <Hidden smUp>
          <GridItem>
            <GridContainer direction="column">
              <GridItem>
                {renderPart(InsuranceNumber, VARIANTS.TEXT_WITH_LABEL, {
                  required: true,
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
              <GridItem>
                {renderPart(CompanyName, VARIANTS.TEXT_WITH_LABEL, {
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
              <GridItem>
                {renderPart(CommencementDate, VARIANTS.TEXT_WITH_LABEL, {
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
              <GridItem>
                {renderPart(ExpiryDate, VARIANTS.TEXT_WITH_LABEL, {
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
              <GridItem>
                {renderPart(EmergencyPhone, VARIANTS.TEXT_WITH_LABEL, {
                  readOnly: isReadOnly,
                  onSubmit,
                })}
              </GridItem>
            </GridContainer>
          </GridItem>
        </Hidden>
      </React.Fragment>
    );
  };
  const renderFields = () => <GridContainer>{editableContent()}</GridContainer>;

  /* const renderEditableFormActions = () => (
    <DeleteButton
      dialogTitle="Delete this Insurance Policy Information"
      headlineText="Are you sure you want to delete this Insurance Policy Information?"
      confirmButton="Delete Insurance Policy Information"
      onClick={handleEditableDeleteClick}
    />
  ); */

  /* const renderEditable = () => (
    <EditableForm
      isRow
      value={id}
      renderValue={renderTextOnly}
      renderSecondaryFormActions={renderEditableFormActions}
      onSubmit={handleEditableSubmit}
      readOnly={readOnly}
      testId="editable-form-insurance-click"
    >
      {renderForm()}
    </EditableForm>
  ); */

  // eslint-disable-next-line react/prop-types
  const renderDeleteButton = ({ onClick }) => (
    <Button
      noMargin
      dense
      size="extraSmall"
      variant={VARIANTS.OUTLINE}
      onClick={onClick}
      className={classes.actionButton}
      data-testid="btn-action-insurance-delete"
    >
      <GridContainer alignItems="center">
        <GridItem>
          <Icon icon="lnr-trash2" size="small" color="danger" />
        </GridItem>
      </GridContainer>
    </Button>
  );

  const toggleEditing = () => setEditing(!editing);

  const renderCardAction = () => (
    <GridContainer>
      <GridItem xs />
      <GridItem>
        <Button
          noMargin
          dense
          size="extraSmall"
          variant={VARIANTS.OUTLINE}
          onClick={toggleEditing}
          className={classnames(
            classes.actionButton,
            LOGIC_HELPERS.ifElse(editing, classes.editingButton),
          )}
          buttonTitle={LOGIC_HELPERS.ifElse(
            editing,
            'Finish editing',
            'Start editing',
          )}
          data-testid="btn-action-insurance-save"
        >
          <GridContainer alignItems="center">
            <GridItem>
              <Icon
                icon={LOGIC_HELPERS.ifElse(editing, 'lnr-check', 'lnr-pencil')}
                size="small"
              />
            </GridItem>
            {editing && (
              <Hidden smDown>
                <GridItem>Finish Editing</GridItem>
              </Hidden>
            )}
          </GridContainer>
        </Button>
      </GridItem>
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
    </GridContainer>
  );

  const renderCard = () => (
    <div className={classes.offsetGrid}>
      <GridContainer direction="column" spacing={0}>
        <GridItem>{renderCardAction()}</GridItem>
        <GridItem>
          <GridContainer card highlight cardPadding={4}>
            {editableContent(editing)}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );

  const renderRow = () => (
    <GridContainer noWrap>
      <GridItem className="j-text-ellipsis">
        {renderPart(InsuranceNumber, VARIANTS.TEXT_ONLY)}
      </GridItem>
      <CompanyName variant={VARIANTS.RENDER_PROP} id={id}>
        {renderProp}
      </CompanyName>
    </GridContainer>
  );

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.TEXT_ONLY]: renderTextOnly,
    [VARIANTS.FORM]: renderForm,
    [VARIANTS.CARD]: renderCard,
    [VARIANTS.ROW]: renderRow,
    [VARIANTS.FIELDS_ONLY]: renderFields,
    [DEFAULT]: renderFields,
  });
}

InsurancePolicy.propTypes = {
  classes: PropTypes.object,

  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  personId: PropTypes.number,
};

InsurancePolicy.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,

  personId: null,
};
export default compose(
  withStyles(styles, { name: 'InsurancePolicy' }),
  resaga(CONFIG),
)(React.memo(InsurancePolicy));
