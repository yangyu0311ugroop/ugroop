import {
  CONFIRMED,
  FREE_ORG_SEATS_THRESHOLD,
  INVITATION_MODE,
  PENDING,
} from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Fade } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon/index';
import { useSelector } from 'react-redux';
import styles from './styles';
import ButtonUpgradeActions from '../../../../../../Components/ButtonUpgradeActions';
import { makeStyles } from '../../../../../../../../components/material-ui';
import { makeSingleSelect } from '../../../../../../../../datastore/selectUtility';
import {
  CREATEDBY,
  CustomDataOrgId,
  NODE_STORE_RESELECTORS,
} from '../../../../../../../../datastore/nodeStore/selectorsViaConnect';
import { selectAccountAttribute } from '../../../../../../../../datastore/stormPathStore/selectors';
import { TEMPLATE_VIEWSTORE_RESELECTORS } from '../../../../../../../../datastore/templateManagementStore/selectorsViaConnect';
import { useGlobalContext } from '../../../../../../../App/globalStateContext';
import { STRING_HELPERS } from '../../../../../../../../utils/stringAdditions';
import P from '../../../../../../../../viewComponents/Typography';
import { INVITATION_STORE_RESELECTORS } from '../../../../../../../../datastore/invitationStore/selectorsViaConnect';
/* eslint-disable no-param-reassign */

const useStyles = makeStyles(styles);
function Buttons(props) {
  const classes = useStyles();
  const [globalContext] = useGlobalContext();

  const recalculateRemainingSeats = () => {
    if (orgId) {
      let pending = 0;
      if (
        globalContext.BillingContext.org.orgPending &&
        globalContext.BillingContext.org.orgPending.length > 0
      ) {
        pending = globalContext.BillingContext.org.orgPending.length;
      }
      const num =
        globalContext.BillingContext.org.orgSeats +
        FREE_ORG_SEATS_THRESHOLD -
        globalContext.BillingContext.org.connectedOrgPeople -
        globalContext.BillingContext.org.connectedContributor -
        pending;
      if (num === 0.5) {
        return 1;
      }
      return num < 1 ? 0 : Math.round(num);
    }
    const num =
      globalContext.BillingContext.person.tourSeats -
      globalContext.BillingContext.person.connectedPeople;
    if (num < 1) {
      if (num === 0.5) {
        return 1;
      }
      return 0;
    }
    return Math.round(num);
  };
  const {
    shared,
    fetching,
    onReset,
    sending,
    connected,
    templateId,
    inviteeToken,
    isPartOfOrg,
  } = props;
  // If connected, not pending
  const status = useSelector(state =>
    makeSingleSelect(INVITATION_STORE_RESELECTORS.getSharesAttribute)(state, {
      inviteeToken,
      attribute: 'status',
    }),
  );
  const pending = status === PENDING;
  const accepted = status === CONFIRMED;
  const getPending = () => !connected && pending;

  const orgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: props.templateId,
      attribute: CustomDataOrgId,
    }),
  );
  const me = useSelector(state =>
    makeSingleSelect(selectAccountAttribute)(state, {
      attribute: 'id',
    }),
  );

  const inviteeEmail = useSelector(state =>
    makeSingleSelect(TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey)(
      state,
      {
        key: 'inviteeEmail',
      },
    ),
  );

  const exist = !!inviteeEmail;
  const invitationMode = useSelector(state =>
    makeSingleSelect(TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey)(
      state,
      {
        key: 'invitationMode',
      },
    ),
  );

  const owner = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: CREATEDBY,
    }),
  );

  const canStillInvite = () => {
    if (orgId) {
      return recalculateRemainingSeats() > 0;
    }
    return recalculateRemainingSeats() > 0;
  };

  const showSubmitButton = () => {
    const pendingV = getPending();
    const isOwner = me === owner && (pendingV || accepted);

    return !(shared || isOwner || accepted || pending);
  };

  const showResetButton = () => {
    const loading = fetching || sending;

    return exist && !loading;
  };

  const handleReset = () => {
    if (onReset) onReset();
  };

  const renderSubmitButton = () => {
    const loading = fetching || sending;

    let button;
    if (isPartOfOrg) return null;
    if (connected) button = 'Confirm';
    else if (exist) button = 'Send invitation';
    else button = 'Find';

    const submitBtn = LOGIC_HELPERS.ifElse(
      canStillInvite() || button === 'Find',
      <GridItem>
        <Button
          type="submit"
          dense
          size="small"
          color={LOGIC_HELPERS.ifElse(
            invitationMode === INVITATION_MODE.BY_ORG,
            'gray',
            'primary',
          )}
          loading={loading}
          disabled={invitationMode === INVITATION_MODE.BY_ORG}
        >
          {button}
        </Button>
      </GridItem>,
      <GridItem>
        <ButtonUpgradeActions
          name="Upgrade Plan"
          orgId={orgId}
          userId={me}
          tourCreatedBy={owner}
        />
      </GridItem>,
    );
    return showSubmitButton() && <>{submitBtn}</>;
  };

  const renderResetText = () => {
    const pendingV = getPending();

    return shared || pendingV || accepted ? 'Invite someone else' : 'Cancel';
  };

  const renderResetButton = () =>
    showResetButton() && (
      <GridItem>
        <Button dense size="small" variant="outline" onClick={handleReset}>
          {renderResetText()}
        </Button>
      </GridItem>
    );

  const renderSuccess = () => {
    const text = connected
      ? 'Role added successfully!'
      : 'Invitation sent successfully!';
    return (
      <span className={classes.success}>
        <Icon size="small" icon="lnr-check" paddingRight />
        {text}
      </span>
    );
  };

  const submitButton = renderSubmitButton();
  const resetButton = renderResetButton();
  const seatsText = () => {
    const remaining = recalculateRemainingSeats();
    return (
      <GridItem>
        <P noMargin subtitle>
          {remaining} {STRING_HELPERS.pluralise('seat', remaining, true)} left
        </P>
      </GridItem>
    );
  };

  return (
    <GridContainer alignItems="center">
      {submitButton}
      {resetButton}
      {seatsText()}
      <Fade in={shared}>
        <GridItem>{renderSuccess()}</GridItem>
      </Fade>
    </GridContainer>
  );
}

Buttons.propTypes = {
  // parent props
  shared: PropTypes.bool,
  connected: PropTypes.bool,
  onReset: PropTypes.func,
  fetching: PropTypes.bool,
  sending: PropTypes.bool,
  templateId: PropTypes.number,
  inviteeToken: PropTypes.string,
  isPartOfOrg: PropTypes.bool,
};

Buttons.defaultProps = {
  shared: false,
  connected: false,
  fetching: false,
  sending: false,
};

export default React.memo(Buttons);
