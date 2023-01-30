import { PERSON_STORE_RESELECTORS } from 'datastore/personDataStore/selectorsViaConnect';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { makeSingleSelect } from 'datastore/selectUtility';
import { Span } from '../../../../../../viewComponents/Typography';
import {
  Phone as PhoneInput,
  Phone,
  PhoneActionButtons,
} from '../../../../../Inputs';
import { LOGIC_HELPERS } from '../../../../../../utils/helpers/logic';
import { VARIANTS } from '../../../../../../variantsConstants';
import { DEFAULT } from '../../../../../../appConstants';
import Form from '../../../../../../ugcomponents/Form';
import { EditableTextForm } from '../../../../../Editables';

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
  phoneClass: {
    '& > .react-phone-number-input__row > .react-phone-number-input__input': {
      borderBottom: 'none',
      '&:hover': {
        borderBottom: 'none',
      },
      '&:focus': {
        borderBottom: 'none',
      },
    },
  },
}));
export const EmergencyPhone = props => {
  const classes = useStyles();
  const { id, required, variant, readOnly, onSubmit } = props;

  const value = useSelector(state =>
    makeSingleSelect(PERSON_STORE_RESELECTORS.selectInsurancePolicyAttribute)(
      state,
      {
        id,
        attribute: 'emergencyPhone',
      },
    ),
  );

  const renderEditableValue = valueParm => (
    <Form>
      <PhoneInput value={valueParm} readOnly name="emergencyPhone" />
    </Form>
  );

  const renderFields = () => (
    <div className={classes.root}>
      <Phone
        name="emergencyPhone"
        value={value}
        label="Emergency Phone"
        InputProps={{
          disableUnderline: true,
        }}
        inline
        className={classes.phoneClass}
        required={required}
        readOnly={readOnly}
      />
    </div>
  );

  const renderTextField = () => (
    <Phone
      name="emergencyPhone"
      value={value}
      label="Emergency Phone"
      InputProps={{
        disableUnderline: true,
      }}
      inline
      required={required}
      readOnly={readOnly}
    />
  );

  const renderTextOnly = () => (
    <Span dense weight="bold" transform="capitalize">
      {value}
    </Span>
  );
  const renderActions = () => <PhoneActionButtons value={value} />;
  const renderTextWithLabel = () => (
    <EditableTextForm
      name="emergencyPhone"
      value={value}
      label="Emergency Phone"
      renderValue={renderEditableValue}
      renderActions={renderActions}
      TextComponent={Phone}
      TextProps={{ inline: true, inputProps: undefined }}
      readOnly={readOnly}
      onSubmit={onSubmit}
      placeholder="Click to specify emergency phone number"
      readOnlyPlaceholder="No emergency phone number"
    />
  );

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.TEXT_FIELD]: renderTextField,
    [VARIANTS.EDITABLE]: renderFields,
    [VARIANTS.TEXT_WITH_LABEL]: renderTextWithLabel,
    [DEFAULT]: renderTextOnly,
  });
};

EmergencyPhone.propTypes = {
  id: PropTypes.number,
  required: PropTypes.bool,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default EmergencyPhone;
