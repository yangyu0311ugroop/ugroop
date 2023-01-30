import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { InlineRadioGroup } from '../../Inputs';
import {
  TOUR_CONTRIBUTOR_ROLES,
  VALID_TOUR_ROLES_FREE_PLAN,
} from '../../../datastore/invitationStore/constants';
import { makeSingleSelect } from '../../../datastore/selectUtility';
import style from './style';
import {
  CustomDataOrgId,
  NODE_STORE_RESELECTORS,
} from '../../../datastore/nodeStore/selectorsViaConnect';
import { makeStyles } from '../../../components/material-ui';
import { useGlobalContext } from '../../../containers/App/globalStateContext';
import { SUBSCRIPTION_PLANS } from '../../../appConstants';
const useStyles = makeStyles(style);
function RoleSelection(props) {
  const classes = useStyles();
  const [globalContext] = useGlobalContext();
  const roles = TOUR_CONTRIBUTOR_ROLES;
  const orgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: props.templateId,
      attribute: CustomDataOrgId,
    }),
  );

  const recalculateRemainingSeats = () => {
    if (orgId) {
      return globalContext.BillingContext.org.orgSeats;
    }
    return globalContext.BillingContext.person.tourSeats;
  };

  const getTourOptions = () => {
    const seats = recalculateRemainingSeats();
    if (seats === SUBSCRIPTION_PLANS.FREE.value) {
      return VALID_TOUR_ROLES_FREE_PLAN;
    }
    return roles;
  };
  const {
    editable,
    changeRole,
    editableLabel,
    role,
    changingRole,
    changeRoleFailed,
    editingLabel,
  } = props;
  const options = getTourOptions();

  if (editable) {
    return (
      <InlineRadioGroup
        padding="xs"
        loading={changingRole}
        showSaved={!changeRoleFailed}
        highlightSelected
        required
        autoClose
        color="primary"
        name="role"
        label={editableLabel}
        tooltip="Click button to change role"
        valueLabel=""
        value={role}
        options={options}
        className={classes.newTourRole}
        onChange={changeRole}
      />
    );
  }
  return (
    <InlineRadioGroup
      required
      name="role"
      label={editingLabel}
      valueLabel="Their role as a contributor will be"
      value={role}
      options={options}
      className={classes.newTourRole}
    />
  );
}

RoleSelection.propTypes = {
  editingLabel: PropTypes.string,
  changeRole: PropTypes.func,
  editable: PropTypes.bool,
  role: PropTypes.string,
  editableLabel: PropTypes.string,
  changingRole: PropTypes.bool,
  changeRoleFailed: PropTypes.bool,
  templateId: PropTypes.number,
};
export default RoleSelection;
