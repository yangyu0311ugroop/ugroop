import { PERSON_STORE_RESELECTORS } from 'datastore/personDataStore/selectorsViaConnect';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { makeSingleSelect } from 'datastore/selectUtility';
import { MOMENT_HELPERS } from '../../../../../../utils/helpers/moment';
import { Date } from '../../../../../Inputs';
import { LOGIC_HELPERS } from '../../../../../../utils/helpers/logic';
import { VARIANTS } from '../../../../../../variantsConstants';
import { DEFAULT } from '../../../../../../appConstants';
import { Span } from '../../../../../../viewComponents/Typography';
import { EditableDateForm } from '../../../../../Editables';

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: '0px 0px 4px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    '&:hover': {
      backgroundColor: '#fff',
    },

    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `rgba(131,192,253,.5) 0 0 0 2px`,
      borderColor: '#0070c9',
    },
  },
}));

export const ExpiryDate = props => {
  const classes = useStyles();
  const { id, variant, readOnly, onSubmit } = props;

  const value = useSelector(state =>
    makeSingleSelect(PERSON_STORE_RESELECTORS.selectInsurancePolicyAttribute)(
      state,
      {
        id,
        attribute: 'expiryDate',
      },
    ),
  );

  const renderTextField = () => (
    <Date
      name="expiryDate"
      label="Expiry Date"
      value={value}
      maxDate={MOMENT_HELPERS.getDateLastYear()}
      initialFocusedDate={MOMENT_HELPERS.getDateMiddleLastYear()}
      disabled={readOnly}
    />
  );

  const renderFields = () => (
    <div className={classes.root}>
      <Date
        name="expiryDate"
        label="Expiry Date"
        value={value}
        maxDate={MOMENT_HELPERS.getDateLastYear()}
        initialFocusedDate={MOMENT_HELPERS.getDateMiddleLastYear()}
        InputProps={{
          disableUnderline: true,
        }}
        disabled={readOnly}
      />
    </div>
  );

  const renderTextWithLabel = () => (
    <EditableDateForm
      name="expiryDate"
      label="Expiry Date"
      value={value}
      readOnly={readOnly}
      placeholder="Click to specify Expiry Date"
      readOnlyPlaceholder="No Expiry Date"
      onSubmit={onSubmit}
      maxDate={MOMENT_HELPERS.createUtc()}
    />
  );

  const renderTextOnly = () => (
    <Span dense weight="bold" transform="capitalize">
      {value}
    </Span>
  );

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.TEXT_FIELD]: renderTextField,
    [VARIANTS.EDITABLE]: renderFields,
    [VARIANTS.TEXT_WITH_LABEL]: renderTextWithLabel,
    [DEFAULT]: renderTextOnly,
  });
};

ExpiryDate.propTypes = {
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default ExpiryDate;
