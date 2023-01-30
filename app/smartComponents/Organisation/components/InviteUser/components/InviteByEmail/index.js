import { Collapse } from '@material-ui/core';
import {
  GET_ORGANISATION_MEMBER_INFO,
  ORGANISATION_API,
  SHARE_ORGANISATION,
} from 'apis/constants';
import { DO_NOTHING } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Form, { SectionHeader } from 'ugcomponents/Form';
import { useImmer } from 'use-immer';
import Buttons from './components/Buttons';
import Content from './components/Content';
import { CONFIG } from './config';
import styles from './styles';
import utils from './utils';
import { makeStyles } from '../../../../../../components/material-ui';
const useStyles = makeStyles(styles);
/* eslint-disable no-param-reassign */
function InviteByEmail(props) {
  const classes = useStyles();
  const { email, userId, id, inviteeToken, disabled } = props;
  const [state, setState] = useImmer({
    error: '',
    invited: false,
    isSending: false,
  });
  let success;
  useEffect(
    () =>
      function cleanup() {
        resetForm();
      },
    [],
  );

  const getPersonSuccess = (result, { email: emailValue }) => {
    const { invited, registered } = result;
    setState(draft => {
      draft.invited = invited;
      draft.registered = registered;
      draft.error = invited ? 'This email has already been invited' : '';
    });

    props.resaga.setValue({ inviteeEmail: emailValue });
  };

  const getPersonError = (_, { email: emailValue }) => {
    props.resaga.setValue({ inviteeEmail: emailValue });
  };

  const resetForm = () => {
    setState(draft => {
      draft.error = '';
      draft.shared = false;
      draft.invited = false;
      draft.registered = false;
      draft.isSending = false;
    });
    props.resaga.setValue({
      inviteeId: 0,
      inviteeToken: '',
      inviteeEmail: null,
      inviteeOrgId: null,
    });
    clearTimeout(success);
  };

  const handleValidSubmit = ({ email: emailValue, ...invitationData }) => {
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
        draft.error = 'Role is required.';
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
    resetForm();

    if (emailV) {
      return props.resaga.dispatchTo(
        ORGANISATION_API,
        GET_ORGANISATION_MEMBER_INFO,
        {
          payload: { id, email: emailV },
          onSuccess: getPersonSuccess,
          onError: getPersonError,
        },
      );
    }
    return DO_NOTHING;
  };

  const handleSendInvitation = formData => {
    const payload = utils.makePayload(formData, {
      id,
      userId,
      inviteTo: email,
    });

    props.resaga.dispatchTo(ORGANISATION_API, SHARE_ORGANISATION, {
      payload,
      onSuccess: shareOrganisationSuccess,
    });
  };

  const shareOrganisationSuccess = result => {
    setState(draft => {
      draft.invited = false;
      draft.isSending = true;
    });

    // in case some error occurred, just clean up the form
    if (typeof result !== 'object') {
      return resetForm();
    }

    success = setTimeout(() => resetForm(), 10000);
    return setState(draft => {
      draft.shared = true;
    });
  };

  const fromOtherOrg = () => false; // inviteeOrgId > 0 && inviteeOrgId !== id;

  const { error, shared, invited, registered, isSending } = state;
  return (
    <Form
      onValid={handleValid}
      onValidSubmit={handleValidSubmit}
      onInvalidSubmit={handleInvalidSubmit}
    >
      <GridContainer direction="column" className={classes.root} spacing={0}>
        <GridItem>
          <SectionHeader className={classes.sectionHeader} first>
            Invite someone to join your organisation
          </SectionHeader>
        </GridItem>

        <GridItem>
          <div className={classes.content}>
            <Content
              invited={invited}
              registered={registered}
              shared={shared}
              inviteeToken={inviteeToken}
              id={id}
              userId={userId}
              email={email}
              fromOtherOrg={fromOtherOrg()}
              isSending={isSending}
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
            invited={invited}
            id={id}
            inviteeToken={inviteeToken}
            shared={shared}
            onReset={resetForm}
            userId={userId}
            fromOtherOrg={fromOtherOrg()}
            disabled={disabled}
          />
        </GridItem>
      </GridContainer>
    </Form>
  );
}

InviteByEmail.propTypes = {
  resaga: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired, // orgid id
  disabled: PropTypes.bool,
  inviteeToken: PropTypes.string,
  email: PropTypes.string,
  userId: PropTypes.number,
};

InviteByEmail.defaultProps = {
  inviteeToken: '',
  email: '',
  userId: 0,
};

export default compose(resaga(CONFIG))(InviteByEmail);
