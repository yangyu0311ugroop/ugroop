import { Collapse } from '@material-ui/core';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { GET_PERSON, NODE_API, SHARE_NODE, TEMPLATE_API } from 'apis/constants';
import { DO_NOTHING, INVITATION_MODE } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import dotProp from 'dot-prop-immutable';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { compose } from 'redux';
import resagaHOC from 'resaga';
import Form, { SectionHeader } from 'ugcomponents/Form';
import { useImmer } from 'use-immer';
import Buttons from './components/Buttons';
import Content from './components/Content';
import { CONFIG } from './config';
import styles from './styles';
import InviteByEmailUtils from './utils';
import { makeStyles } from '../../../../../../components/material-ui';
import useUserNodesInTours from '../../../../../../hooks/useUserNodesInTours';
import useOrgMembersHook from '../../../../../../hooks/useOrgMembersHook';
const useStyles = makeStyles(styles);
/* eslint-disable no-param-reassign */

function InviteByEmail(props) {
  const classes = useStyles();
  const { email, userId: inviteeUserId, id, showHeader, resaga, orgId } = props;
  const [state, setState] = useImmer({
    error: '',
    inviteeToken: '',
    fetching: false,
    sending: false,
  });

  const { error, shared, inviteeToken, sending, fetching } = state;

  let success;
  useEffect(
    () =>
      function cleanup() {
        resetForm();
      },
    [],
  );

  const getFirstContributorToken = shares => {
    const contributorShare = shares.find(
      share => share && TOUR_CONTRIBUTOR_ROLE_TYPES.includes(share.role),
    );
    return dotProp.get(contributorShare, 'notificationToken', null);
  };

  const { isPassedUserPartOfTour } = useUserNodesInTours({
    templateId: id,
    userId: inviteeUserId,
  });

  const { isPartOfOrg } = useOrgMembersHook({
    userId: inviteeUserId,
    orgId,
  });

  const getPersonSuccess = (result, { email: emailValue }) => {
    const { share, inviteeId } = result;
    const shares = Object.values(share());
    const inviteeTokenValue = getFirstContributorToken(shares);
    setState(draft => {
      draft.inviteeToken = inviteeTokenValue;
      draft.fetching = false;
    });
    resaga.setValue({ inviteeEmail: emailValue, inviteeId });
  };

  const resetForm = () => {
    setState(draft => {
      draft.error = '';
      draft.shared = false;
      draft.inviteeToken = '';
      draft.fetching = false;
      draft.sending = false;
    });
    resaga.setValue({
      inviteeId: 0,
      inviteeEmail: null,
      invitationMode: null,
    });
    clearTimeout(success);
  };

  const handleValidSubmit = ({ email: emailValue, ...invitationData }) => {
    resaga.setValue({
      invitationMode: INVITATION_MODE.BY_EMAIL,
    });
    if (emailValue) {
      // step 1
      handleFetchEmailInfo(emailValue);
    } else {
      // step 2
      handleSendInvitation(invitationData);
    }
  };

  const handleInvalidSubmit = () => {
    if (email) {
      return setState(draft => {
        draft.error = 'Tour role is required.';
      });
    }

    return DO_NOTHING;
  };

  const handleValid = () => {
    setState(draft => {
      draft.error = '';
    });
  };

  const handleFetchEmailInfo = emailV => {
    setState(draft => {
      draft.fetching = true;
    });
    if (emailV) {
      return resaga.dispatchTo(TEMPLATE_API, GET_PERSON, {
        payload: { email: emailV, id },
        onSuccess: getPersonSuccess,
      });
    }

    return DO_NOTHING;
  };

  const handleSendInvitation = formData => {
    const connected = isPassedUserPartOfTour;
    setState(draft => {
      draft.sending = true;
    });

    if (connected) {
      TEMPLATE_API_HELPERS.addRole(
        {
          id,
          userId: inviteeUserId,
          ...formData,
          onSuccess: (result, payload) =>
            shareNodeSuccess(result, payload, {
              requireResetConnectedPeopleAfterAddRole: true,
            }),
        },
        props,
      );
    } else {
      const payload = InviteByEmailUtils.makePayload(formData, {
        id,
        userId: inviteeUserId,
        shareTo: email,
      });

      resaga.dispatchTo(NODE_API, SHARE_NODE, {
        payload,
        onSuccess: (res, reqPayload) =>
          shareNodeSuccess(res, reqPayload, {
            requireResetConnectedPeople: true,
          }),
      });
    }
  };

  const setValueNewConnectedPeople = (result, payload) => {
    if (result.nodeShare) {
      resaga.setValue({
        nodeShareSuccess: {
          userId: payload.shareToUserId,
          email: payload.payload.shareTo,
          role: payload.payload.role,
          token: result.raw[0].notificationToken,
        },
      });
    }
  };

  const setValueAddNewContributorRole = result => {
    if (result.raw.userNodes && result.raw.userNodes.length > 0) {
      const userNodes = result.raw.userNodes[0];
      if (TOUR_CONTRIBUTOR_ROLE_TYPES.includes(userNodes.role)) {
        // Add Contributor Role
        resaga.setValue({
          addRoleSuccess: {
            userId: userNodes.userId,
            role: userNodes.role,
          },
        });
      }
    }
  };

  const shareNodeSuccess = (result, payload, options = {}) => {
    if (options.requireResetConnectedPeople) {
      setValueNewConnectedPeople(result, payload);
    }
    if (options.requireResetConnectedPeopleAfterAddRole) {
      setValueAddNewContributorRole(result);
    }
    success = setTimeout(() => resetForm(), 10000);
    return setState(draft => {
      draft.shared = true;
      draft.sending = false;
    });
  };

  const sectionHeader = () => (
    <GridItem>
      <SectionHeader className={classes.sectionHeader} first>
        Invite someone to work with you on this tour
      </SectionHeader>
    </GridItem>
  );

  const renderInvite = () => {
    const connected = isPassedUserPartOfTour;

    return (
      <Form
        onValid={handleValid}
        onValidSubmit={handleValidSubmit}
        onInvalidSubmit={handleInvalidSubmit}
      >
        <GridContainer direction="column" className={classes.root} spacing={0}>
          {showHeader && sectionHeader()}
          <GridItem>
            <div className={classes.content}>
              <Content
                shared={shared}
                connected={connected}
                inviteeToken={inviteeToken}
                templateId={id}
                userId={inviteeUserId}
                email={email}
                isPartOfOrg={isPartOfOrg}
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
              connected={connected}
              inviteeToken={inviteeToken}
              templateId={id}
              onReset={resetForm}
              sending={sending}
              fetching={fetching}
              isPartOfOrg={isPartOfOrg}
            />
          </GridItem>
        </GridContainer>
      </Form>
    );
  };

  return renderInvite();
}

InviteByEmail.propTypes = {
  resaga: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired, // template id
  showHeader: PropTypes.bool,
  email: PropTypes.string,
  userId: PropTypes.number,
  orgId: PropTypes.number,
  inviteeToken: PropTypes.string,
};

InviteByEmail.defaultProps = {
  userNodeUserIds: [],
  email: '',
  userId: 0,
  showHeader: true,
};

export default compose(resagaHOC(CONFIG))(InviteByEmail);
