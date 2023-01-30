import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from 'containers/Templates/Modals/ShareList/components/Invitee/styles';
import GridContainer from '../../../../../../../../../components/GridContainer';
import GridItem from '../../../../../../../../../components/GridItem';
import {
  Hidden,
  makeStyles,
} from '../../../../../../../../../components/material-ui';
import { Avatar, Name } from '../../../../../../../../../ugcomponents/Person';
import TourRole from '../../../../../../../../../ugcomponents/Person/TourRole';
import { TEXT } from '../../../../../../../../../appConstants';
import Role from '../../../../../../../../../smartComponents/Organisation/parts/Members/parts/Role';
import { ORG_FIELD_VARIANTS } from '../../../../../../../../../smartComponents/Organisation/constants';
import {
  ANIMATION_MAX_INDEX,
  ANIMATION_TIMEOUT,
  INCREMENT_TIMEOUT,
  NO_ANIMATION_TIMEOUT,
} from '../../../../Invitee/constants';
import useOrgMembersHook from '../../../../../../../../../hooks/useOrgMembersHook';

const useStyles = makeStyles(styles);
function OrgUserInvitee(props) {
  const {
    userId,
    email,
    minimise,
    emailLinkSubject,
    emailLinkBody,
    hideRole,
    index,
    templateId,
    orgId,
  } = props;
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const { memberRole, isPartOfOrg } = useOrgMembersHook({
    userId,
    orgId,
  });
  useEffect(() => {
    let timeout;

    if (index < ANIMATION_MAX_INDEX) {
      timeout = ANIMATION_TIMEOUT + index * INCREMENT_TIMEOUT;
    } else {
      timeout = NO_ANIMATION_TIMEOUT;
    }
    const timer = setTimeout(() => setShow(true), timeout * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const renderTourRole = () => {
    if (hideRole) return null;
    return (
      <GridItem key={userId}>
        <TourRole
          editingLabel="Select contributor role"
          showStatus={!minimise}
          templateId={templateId}
        />
      </GridItem>
    );
  };

  return (
    <GridContainer direction="column" className={classes.root} spacing={0}>
      <GridItem>
        <GridContainer alignItems="center">
          <Hidden smDown>
            <GridItem>
              <Avatar
                noTooltip={false}
                sm
                userId={userId}
                fullName={email}
                email={email}
                showAvatarDetails={show}
                emailSubjectLink={emailLinkSubject}
                emailBodyLink={emailLinkBody}
              />
            </GridItem>
          </Hidden>
          <GridItem className={classes.grow}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <GridContainer
                  direction="row"
                  alignItems="center"
                  spacing={isPartOfOrg && memberRole ? 4 : 0}
                >
                  <GridItem>
                    <Name id={userId} email={email} variant={TEXT} bold />
                  </GridItem>
                </GridContainer>
              </GridItem>
              {isPartOfOrg && (
                <GridItem>
                  <Role
                    id={userId}
                    variant={ORG_FIELD_VARIANTS.TEXT_WITH_LABEL}
                    role={memberRole}
                  />
                </GridItem>
              )}
              {!minimise && <Hidden smUp>{renderTourRole()}</Hidden>}
            </GridContainer>
          </GridItem>
          {!minimise && <Hidden xsDown>{renderTourRole()}</Hidden>}
        </GridContainer>
      </GridItem>
      {minimise && renderTourRole()}
    </GridContainer>
  );
}

OrgUserInvitee.propTypes = {
  templateId: PropTypes.number,
  userId: PropTypes.number,
  hideRole: PropTypes.bool,
  minimise: PropTypes.bool,
  emailLinkSubject: PropTypes.string,
  emailLinkBody: PropTypes.string,
  email: PropTypes.string,
  index: PropTypes.number,
  orgId: PropTypes.string,
};

export default OrgUserInvitee;
