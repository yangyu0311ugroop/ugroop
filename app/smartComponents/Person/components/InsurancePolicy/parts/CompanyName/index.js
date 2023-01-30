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

export const CompanyName = props => {
  const classes = useStyles();
  const { id, required, variant, children, readOnly, onSubmit } = props;

  const value = useSelector(state =>
    makeSingleSelect(PERSON_STORE_RESELECTORS.selectInsurancePolicyAttribute)(
      state,
      {
        id,
        attribute: 'companyName',
      },
    ),
  );

  const renderTextWithLabel = () => (
    <EditableTextForm
      name="companyName"
      label="Company Name"
      onSubmit={onSubmit}
      value={value}
      readOnly={readOnly}
      placeholder="Click to specify Company Name"
      readOnlyPlaceholder="No passport number"
    />
  );

  const renderFields = () => (
    <GridContainer className={classes.root} direction="column">
      <GridItem>
        <FText
          name="companyName"
          value={value}
          label="Company Name"
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
      name="companyName"
      label="Company Name"
      required={required}
      disabled={readOnly}
    />
  );

  const renderTextOnly = () => (
    <Span dense weight="bold" transform="capitalize">
      {value}
    </Span>
  );

  const renderProp = () => LOGIC_HELPERS.ifFunction(children, [value]);

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.TEXT_FIELD]: renderTextField,
    [VARIANTS.EDITABLE]: renderFields,
    [VARIANTS.RENDER_PROP]: renderProp,
    [VARIANTS.TEXT_WITH_LABEL]: renderTextWithLabel,
    [DEFAULT]: renderTextOnly,
  });
};

CompanyName.propTypes = {
  id: PropTypes.number,
  required: PropTypes.number,
  variant: PropTypes.string,
  children: PropTypes.any,
  readOnly: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default CompanyName;
