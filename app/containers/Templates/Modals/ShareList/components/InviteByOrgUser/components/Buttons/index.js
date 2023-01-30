import { FREE_ORG_SEATS_THRESHOLD, INVITATION_MODE } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import { useSelector } from 'react-redux';
import ButtonUpgradeActions from '../../../../../../Components/ButtonUpgradeActions';
import { TEMPLATE_VIEWSTORE_RESELECTORS } from '../../../../../../../../datastore/templateManagementStore/selectorsViaConnect';
import { makeSingleSelect } from '../../../../../../../../datastore/selectUtility';
import {
  CREATEDBY,
  CustomDataOrgId,
  NODE_STORE_RESELECTORS,
} from '../../../../../../../../datastore/nodeStore/selectorsViaConnect';
import { selectAccountAttribute } from '../../../../../../../../datastore/stormPathStore/selectors';
import { useGlobalContext } from '../../../../../../../App/globalStateContext';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from '../../../../../../../../apis/components/Ability/roles';
/* eslint-disable no-param-reassign */

function Buttons(props) {
  const {
    connected,
    shared,
    sending,
    onReset,
    templateId,
    userId,
    expandContent,
    isPartOfOrg,
  } = props;
  const [globalContext] = useGlobalContext();
  const orgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: props.templateId,
      attribute: CustomDataOrgId,
    }),
  );

  const recalculateRemainingSeats = () => {
    if (orgId) {
      const num =
        globalContext.BillingContext.org.orgSeats +
        FREE_ORG_SEATS_THRESHOLD -
        globalContext.BillingContext.org.connectedOrgPeople -
        globalContext.BillingContext.org.connectedContributor;
      if (num === 0.5) {
        return 1;
      }
      return num < 1 ? 0 : Math.round(num);
    }
    const num =
      globalContext.BillingContext.person.tourSeats -
      globalContext.BillingContext.person.connectedPeople;
    if (num === 0.5) return 1;
    return num < 1 ? 0 : Math.round(num);
  };
  const tourPeople = globalContext.BillingContext.tourConnectedPeople;

  const me = useSelector(state =>
    makeSingleSelect(selectAccountAttribute)(state, {
      attribute: 'id',
    }),
  );
  const invitationMode = useSelector(state =>
    makeSingleSelect(TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey)(
      state,
      {
        key: 'invitationMode',
      },
    ),
  );

  const tourCreatedBy = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: CREATEDBY,
    }),
  );

  const processId = useSelector(state =>
    makeSingleSelect(TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey)(
      state,
      {
        key: 'currentProcessId',
      },
    ),
  );
  const inUse = !!processId && processId !== userId;
  const showSubmitButton = () => {
    if (connected) {
      const people = tourPeople.find(o => o.userId === userId);
      if (people) {
        if (!TOUR_CONTRIBUTOR_ROLE_TYPES.includes(people.role)) {
          return true;
        }
        return false;
      }
      return true;
    }
    return !shared;
  };

  const showResetButton = () => expandContent;

  const handleReset = () => {
    props.resaga.setValue({
      invitationMode: null,
    });

    if (onReset) onReset();
  };

  const canStillInvite = () => {
    if (orgId) {
      return recalculateRemainingSeats() > 0 || isPartOfOrg;
    }
    return recalculateRemainingSeats() > 0;
  };

  const bColor = color => {
    if (inUse || invitationMode === INVITATION_MODE.BY_EMAIL) {
      return 'gray';
    }
    return color;
  };
  const renderSubmitButton = () => {
    const loading = sending;
    let button = 'Invite';
    let buttonColor = 'primary';
    if (isPartOfOrg) {
      button = 'Join';
      buttonColor = 'base';
    } else if (connected) {
      const connectedRole = globalContext.BillingContext.tourConnectedPeople.find(
        o => o.userId === userId,
      );
      if (
        connectedRole &&
        !TOUR_CONTRIBUTOR_ROLE_TYPES.includes(connectedRole.role)
      ) {
        button = 'Add role';
        buttonColor = 'base';
      } else {
        button = 'Invite';
      }
    }
    if (expandContent) {
      button = 'Confirm';
    }
    if (showSubmitButton()) {
      if (expandContent) {
        if (!canStillInvite()) {
          return (
            <ButtonUpgradeActions
              name="Upgrade Plan"
              orgId={orgId}
              userId={me}
              tourCreatedBy={tourCreatedBy}
            />
          );
        }
      }
      return (
        <GridItem>
          <Button
            type="submit"
            dense
            size="small"
            color={bColor(buttonColor)}
            loading={loading}
            disabled={inUse || invitationMode === INVITATION_MODE.BY_EMAIL}
          >
            {button}
          </Button>
        </GridItem>
      );
    }
    return null;
  };

  const renderResetText = () => {
    if (connected) {
      return 'Cancel';
    }
    return shared ? 'Invite someone else' : 'Cancel';
  };

  const renderResetButton = () =>
    showResetButton() && (
      <GridItem>
        <Button dense size="small" variant="outline" onClick={handleReset}>
          {renderResetText()}
        </Button>
      </GridItem>
    );

  const submitButton = renderSubmitButton();
  const resetButton = renderResetButton();

  return (
    <GridContainer alignItems="center">
      {submitButton}
      {resetButton}
    </GridContainer>
  );
}

Buttons.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  // parent props
  shared: PropTypes.bool,
  connected: PropTypes.bool,
  onReset: PropTypes.func,
  sending: PropTypes.bool,
  userId: PropTypes.number,
  templateId: PropTypes.number,
  expandContent: PropTypes.bool,
  isPartOfOrg: PropTypes.bool,
};

Buttons.defaultProps = {
  shared: false,
  connected: false,
  sending: false,
};

export default compose(resaga())(React.memo(Buttons));
