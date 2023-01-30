import { Collapse } from '@material-ui/core';
import { NODE_API, SHARE_NODE } from 'apis/constants';
import { INVITATION_MODE, TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { compose } from 'redux';
import resagaHOC from 'resaga';
import Form from 'ugcomponents/Form';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { FormattedMessage as M } from 'react-intl';
import { scroller } from 'react-scroll';
import Button from 'viewComponents/Button';
import Buttons from './components/Buttons';
import Content from './components/Content';
import utils from '../InviteByEmail/utils';
import { makeStyles } from '../../../../../../components/material-ui';
import styles from './styles';
import {
  ATTRIBUTES,
  USER_STORE_RESELECTORS,
} from '../../../../../../datastore/userStore/selectorsViaConnect';
import { makeSingleSelect } from '../../../../../../datastore/selectUtility';
import { TEMPLATE_API_HELPERS } from '../../../../../../apis/components/Template/helpers';
import useUserNodesInTours from '../../../../../../hooks/useUserNodesInTours';
import useOrgMembersHook from '../../../../../../hooks/useOrgMembersHook';
import {
  CustomDataOrgId,
  NODE_STORE_RESELECTORS,
} from '../../../../../../datastore/nodeStore/selectorsViaConnect';
import { VARIANTS } from '../../../../../../variantsConstants';
import Icon from '../../../../../../viewComponents/Icon';
import { H5 } from '../../../../../../viewComponents/Typography';
import m from '../../../TourConnection/components/Dialog/components/UserNodeList/components/AddRole/messages';

const useStyles = makeStyles(styles);
export const ADD_CONTRIBUTOR_BUTTON = 'ADD_CONTRIBUTOR_BUTTON';
/* eslint-disable no-param-reassign */
function InviteByOrgUser(props) {
  const classes = useStyles();
  const { userId, id, showAsRow, orgId, resaga, variant } = props;
  const email = useSelector(store =>
    makeSingleSelect(USER_STORE_RESELECTORS.selectPeopleAttribute)(store, {
      id: userId,
      attribute: ATTRIBUTES.email,
    }),
  );

  const tourOrgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id,
      attribute: CustomDataOrgId,
    }),
  );
  const { isPassedUserPartOfTour } = useUserNodesInTours({
    templateId: id,
    userId,
  });

  const { isPartOfOrg } = useOrgMembersHook({
    orgId: tourOrgId,
    userId,
  });

  const [state, setState] = useImmer({
    error: '',
    sending: false,
    fetching: false,
    shared: false,
    inviteeToken: '',
    successTimeout: null,
    expandContent: false,
  });
  let success;
  useEffect(
    () =>
      function cleanup() {
        if (success) {
          clearTimeout(success);
        }
      },
    [],
  );

  const resetForm = () => {
    setState(draft => {
      draft.error = '';
      draft.shared = false;
      draft.sending = false;
      draft.fetching = false;
      draft.expandContent = false;
    });

    props.resaga.setValue({
      invitationMode: null,
      currentProcessId: null,
    });
    clearTimeout(success);
  };

  const handleValidSubmit = invitationData => {
    scroller.scrollTo(`Invite-${userId}`, {
      containerId: 'containerElement',
      offset: 0,
      smooth: true,
    });
    props.resaga.setValue({
      invitationMode: INVITATION_MODE.BY_ORG,
    });
    if (!state.expandContent) {
      // step 1
      setState(draft => {
        draft.expandContent = true;
      });
    } else if (isPartOfOrg) {
      handleAddRole(invitationData);
    } else if (isPassedUserPartOfTour) {
      handleAddRole(invitationData);
    } else {
      handleSendInvitation(invitationData);
    }
  };

  const handleInvalidSubmit = () => {
    scroller.scrollTo(`Invite-${userId}`, {
      containerId: 'containerElement',
      offset: 0,
      smooth: true,
    });
    if (state.expandContent) {
      return setState(draft => {
        draft.error = 'Tour role is required.';
      });
    }
    return setState(draft => {
      draft.expandContent = true;
    });
  };

  const handleValid = () => {
    setState(draft => {
      draft.error = '';
    });
  };

  const handleSendInvitation = formData => {
    setState(draft => {
      draft.sending = true;
    });
    const payload = utils.makePayload(formData, { id, userId, shareTo: email });

    props.resaga.dispatchTo(NODE_API, SHARE_NODE, {
      payload,
      onSuccess: shareNodeSuccess,
      onError: shareNodeFailure,
    });
  };
  const handleAddRoleSuccess = (data, payload) => {
    props.resaga.setValue({
      addRoleSuccess: {
        userId,
        role: payload.role,
        id: data.userNodeIdsPerTour ? data.userNodeIdsPerTour[0] : 0,
      },
    });
    success = setTimeout(() => resetForm(), 500);
    setState(draft => {
      draft.shared = true;
      draft.sending = false;
      draft.expandContent = false;
    });
  };

  const handleAddRoleError = () => {
    props.resaga.setValue({ invitationMode: null });
    return setState(draft => {
      draft.sending = false;
      draft.expandContent = false;
    });
  };

  const handleAddRole = formData => {
    setState(draft => {
      draft.sending = true;
    });
    TEMPLATE_API_HELPERS.addRole(
      {
        id,
        userId,
        role: formData.role,
        organisationId: tourOrgId,
        onSuccess: handleAddRoleSuccess,
        onError: handleAddRoleError,
      },
      {
        resaga,
      },
    );
  };
  const shareNodeSuccess = (result, payload) => {
    if (result.nodeShare) {
      props.resaga.setValue({
        invitationMode: null,
        nodeShareSuccess: {
          userId: payload.shareToUserId,
          email: payload.payload.shareTo,
          role: payload.payload.role,
          token: result.raw[0].notificationToken,
        },
      });
      setState(draft => {
        draft.shared = true;
        draft.sending = false;
      });
      resetForm();
    }
  };

  const shareNodeFailure = () => {
    props.resaga.setValue({ invitationMode: null });
    return setState(draft => {
      draft.sending = false;
    });
  };

  const { error, shared, sending } = state;

  const defaultDirection = LOGIC_HELPERS.ifElse(
    !state.expandContent,
    'row',
    'column',
  );

  const renderDefault = () => (
    <Form
      onValid={handleValid}
      onValidSubmit={handleValidSubmit}
      onInvalidSubmit={handleInvalidSubmit}
    >
      <GridContainer
        direction={defaultDirection}
        className={classnames(classes.root, classes.noWrap)}
        spacing={0}
        noWrap
      >
        <GridItem className={classes.gridContent}>
          <div className={classes.content}>
            <Content
              shared={shared}
              connected={isPassedUserPartOfTour}
              templateId={id}
              userId={userId}
              email={email}
              minimise={!showAsRow}
              orgId={orgId}
              expandContent={state.expandContent}
            />

            <Collapse in={!!error}>
              <GridItem
                className={classnames(
                  error ? classes.error : classes.good,
                  classes.errorPadding,
                )}
              >
                {error || 'All good!'}
              </GridItem>
            </Collapse>
          </div>
        </GridItem>
        <GridItem>
          <Buttons
            shared={shared}
            connected={isPassedUserPartOfTour}
            templateId={id}
            onReset={resetForm}
            sending={sending}
            userId={userId}
            expandContent={state.expandContent}
            isPartOfOrg={isPartOfOrg}
          />
        </GridItem>
      </GridContainer>
    </Form>
  );

  const renderAddButton = () => (
    <GridItem>
      <Button
        variant={VARIANTS.INLINE}
        color="primary"
        dense
        onClick={() => {
          setState(draft => {
            draft.expandContent = true;
          });
        }}
      >
        <GridContainer
          direction="row"
          alignItems="center"
          className={classes.noWrap}
          wrap="nowrap"
        >
          <GridItem>
            <Icon icon="plus" size="extraSmall" bold color="success" />
          </GridItem>
          <GridItem>
            <H5 dense primary>
              <M {...m.addContributorLabel} />
            </H5>
          </GridItem>
        </GridContainer>
      </Button>
    </GridItem>
  );

  if (variant === ADD_CONTRIBUTOR_BUTTON && !state.expandContent) {
    return renderAddButton();
  }
  return renderDefault();
}

InviteByOrgUser.propTypes = {
  // hoc props
  resaga: PropTypes.object,
  id: PropTypes.number.isRequired, // template id
  showAsRow: PropTypes.bool,
  orgId: PropTypes.number, // template id
  userId: PropTypes.number,
};

InviteByOrgUser.defaultProps = {
  userId: 0,
  showAsRow: true,
  variant: 'DEFAULT',
};

const config = {
  setValue: {
    inviteeId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeId'],
    currentProcessId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'currentProcessId'],
    invitationMode: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'invitationMode'],
    nodeShareSuccess: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'nodeShareSuccessData'],
    addRoleSuccess: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'addRoleSuccessData'],
  },
};

export default compose(resagaHOC(config))(React.memo(InviteByOrgUser));
