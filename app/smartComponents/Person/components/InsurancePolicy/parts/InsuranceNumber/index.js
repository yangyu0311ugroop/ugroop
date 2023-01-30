import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import { PERSON_STORE_RESELECTORS } from 'datastore/personDataStore/selectorsViaConnect';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { useSelector } from 'react-redux';
import { makeSingleSelect } from 'datastore/selectUtility';
import { Span } from '../../../../../../viewComponents/Typography';
import { Text } from '../../../../../Inputs';
import { LOGIC_HELPERS } from '../../../../../../utils/helpers/logic';
import { VARIANTS } from '../../../../../../variantsConstants';
import { DEFAULT } from '../../../../../../appConstants';
import { EditableTextForm } from '../../../../../Editables';

const useStyles = makeStyles(() => ({
  root: {},
}));

export const InsuranceNumber = props => {
  const classes = useStyles();
  const { id, required, variant, readOnly, onSubmit } = props;

  const value = useSelector(state =>
    makeSingleSelect(PERSON_STORE_RESELECTORS.selectInsurancePolicyAttribute)(
      state,
      {
        id,
        attribute: 'insuranceNumber',
      },
    ),
  );

  const renderTextWithLabel = () => (
    <EditableTextForm
      label="Insurance Policy Number"
      onSubmit={onSubmit}
      name="insuranceNumber"
      value={value}
      readOnly={readOnly}
      placeholder="Click to specify insurance policy number"
      readOnlyPlaceholder="No passport number"
    />
  );

  const renderFields = () => (
    <GridContainer className={classes.root} direction="column">
      <GridItem>
        <FText
          name="insuranceNumber"
          value={value}
          label="Insurance Policy Number"
          required={required}
          disabled={readOnly}
        />
      </GridItem>
    </GridContainer>
  );

  const renderTextField = () => (
    <Text
      className={classes.text}
      value={value}
      name="insuranceNumber"
      label="Insurance Policy Number"
      required={required}
      autoFocus
      disabled={readOnly}
    />
  );

  const renderTextOnly = () => <Span dense>{value}</Span>;

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.TEXT_FIELD]: renderTextField,
    [VARIANTS.EDITABLE]: renderFields,
    [VARIANTS.TEXT_WITH_LABEL]: renderTextWithLabel,
    [DEFAULT]: renderTextOnly,
  });
};

InsuranceNumber.propTypes = {
  id: PropTypes.number,
  onSubmit: PropTypes.func,
  required: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default InsuranceNumber;
