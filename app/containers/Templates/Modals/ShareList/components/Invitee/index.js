import { Grow } from '@material-ui/core';
import { ability } from 'apis/components/Ability/ability';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Hidden, makeStyles } from 'components/material-ui';
import { TOUR_ROLES } from 'datastore/invitationStore/constants';
import {
  TOUR_CONTRIBUTOR_ROLE,
  TOUR_CONTRIBUTOR_ROLE_TYPES,
} from 'apis/components/Ability/roles';
import { capitalize } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage as M, injectIntl } from 'react-intl';
import { compose } from 'redux';
import resagaHOC from 'resaga';
import {
  CONFIRMED,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  TEXT,
  TEXT_WITH_LABEL,
} from 'appConstants';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import Role from 'smartComponents/Organisation/parts/Members/parts/Role';
import LastAccessAt from 'smartComponents/RecentActivity/parts/LastAccessAt';
import { SimpleRTE } from 'ugcomponents/Inputs';
import { Avatar, Name, Organisation, TourRole } from 'ugcomponents/Person';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import classnames from 'classnames';
import {
  NODE_SHARE,
  PARTICIPANT,
  TOUR_PARTICIPANT,
} from 'utils/modelConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { H5 } from 'viewComponents/Typography';
import TransferStatus from 'containers/Templates/Modals/TransferTourOwner/Components/TransferStatus';
import { VARIANTS } from 'variantsConstants';
import TourCustomRole from 'smartComponents/Node/parts/TourCustomRole';
import { useSelector } from 'react-redux';
import {
  ANIMATION_MAX_INDEX,
  ANIMATION_TIMEOUT,
  INCREMENT_TIMEOUT,
  NO_ANIMATION_TIMEOUT,
} from './constants';
import m from './messages';
import styles from './styles';
import Icon from '../../../../../../ugcomponents/Icon';
import JText from '../../../../../../components/JText';
import { useGlobalContext } from '../../../../../App/globalStateContext';
import { makeSingleSelect } from '../../../../../../datastore/selectUtility';
import {
  CustomDataOrgId,
  NODE_STORE_RESELECTORS,
  TRANSFER_TO_USERID,
} from '../../../../../../datastore/nodeStore/selectorsViaConnect';
import useOrgMembersHook from '../../../../../../hooks/useOrgMembersHook';
import {
  TEMPLATE_VIEWSTORE_RESELECTORS,
  VIEW_STORE_ATTRIBUTES,
} from '../../../../../../datastore/templateManagementStore/selectorsViaConnect';
import { ORG_DATASTORE_RESELECTORS } from '../../../../../../datastore/orgStore/selectorsViaConnect';
import { ORG_ATTRIBUTE } from '../../../../../../datastore/orgStore/selectors';
import {
  COGNITO_ACCOUNT_ATTRIBUTES,
  selectAccountAttribute,
} from '../../../../../../datastore/stormPathStore/selectors';
import {
  INVITATION_STORE_RESELECTORS,
  NOTIFICATION_ATTRIBUTE,
} from '../../../../../../datastore/invitationStore/selectorsViaConnect';
const useStyles = makeStyles(styles);
function Invitee(props) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const {
    index,
    noanimate,
    creating,
    userId,
    token,
    onSeeDetail,
    email,
    emailLinkSubject,
    templateId,
    emailLinkBody,
    accepted,
    role,
    userNodeId,
  } = props;
  const { smDown } = props; // from smdown
  const [globalState] = useGlobalContext();
  const tourConnectedPeople = globalState.BillingContext.tourConnectedPeople;
  const deactivatedMembers = globalState.BillingContext.org.deactivatedMembers;
  const userRoles = tourConnectedPeople.filter(o => o.userId === userId);
  const tourOrgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: CustomDataOrgId,
    }),
  );
  const {
    isPartOfOrg: isMember,
    memberRole: orgRole,
    memberKnownAs: knownAs,
  } = useOrgMembersHook({
    orgId: tourOrgId,
    userId,
  });
  const isDeactivatedMember =
    deactivatedMembers &&
    deactivatedMembers.findIndex(o => o.userId === userId) >= 0 &&
    tourConnectedPeople.findIndex(
      o =>
        o.token &&
        o.email === email &&
        o.status === CONFIRMED &&
        TOUR_CONTRIBUTOR_ROLE_TYPES.includes(o.role),
    ) === -1;
  const editable = useSelector(store =>
    makeSingleSelect(TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey)(
      store,
      {
        key: VIEW_STORE_ATTRIBUTES.updatingTourInfo,
      },
    ),
  );
  const orgName = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgAttribute)(store, {
      id: tourOrgId,
      attribute: ORG_ATTRIBUTE.name,
    }),
  );
  const meId = useSelector(store =>
    makeSingleSelect(selectAccountAttribute)(store, {
      attribute: COGNITO_ACCOUNT_ATTRIBUTES.id,
    }),
  );

  const content = useSelector(store =>
    makeSingleSelect(
      INVITATION_STORE_RESELECTORS.getNotificationTokenAttribute,
    )(store, {
      inviteeToken: token,
      attribute: NOTIFICATION_ATTRIBUTE.messageContent,
    }),
  );

  const paxLabel = useSelector(store => {
    const label = makeSingleSelect(
      TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey,
    )(store, {
      key: 'paxLabel',
    });
    return label || 'PAX';
  });

  const nodeTransferToUserId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: TRANSFER_TO_USERID,
    }),
  );
  const { minimise, hideRole } = props;

  let timer;
  useEffect(() => {
    let timeout;
    if (index < ANIMATION_MAX_INDEX) {
      timeout = ANIMATION_TIMEOUT + index * INCREMENT_TIMEOUT;
    } else {
      timeout = NO_ANIMATION_TIMEOUT;
    }
    timer = setTimeout(() => setShow(true), timeout);
    return function cleanup() {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [index]);

  const getSeeDetailButtonDisabled = () => !(token || onSeeDetail);

  const getOwner = () => role === TOUR_CONTRIBUTOR_ROLE.TOUR_OWNER;

  const seeDetail = () => {
    if (onSeeDetail) {
      onSeeDetail();
    } else {
      props.resaga.setValue({ seeDetail: token });
    }
  };

  const hideOrganisation = () => !creating || !!userId;

  const isRoleEditable = () =>
    ability.can('update', NODE_SHARE) && userId !== meId && editable;

  const renderStatus = () => {
    if (hideOrganisation()) {
      return 'REGISTERED USER';
    }

    return 'NEW USER';
  };

  const renderUserStatus = noGrid => {
    // don't render for exist invitees
    if (!creating) return '';

    if (noGrid) return renderStatus();

    return (
      <GridItem>
        <span className={classes.userStatus}>{renderStatus()}</span>
      </GridItem>
    );
  };

  const renderSeeDetail = () => {
    if (creating) return null;

    return (
      <GridItem
        className={classes.noPaddingBottom}
        data-testid={`seeDetail${userId}`}
      >
        <Button
          className={classes.detailButton}
          dense
          noPadding
          square
          iconButton
          size="extraSmall"
          color="gray"
          icon="ellipsis"
          variant="borderless"
          disabled={getSeeDetailButtonDisabled()}
          onClick={seeDetail}
          tooltipProps={{
            title: 'More options',
          }}
        />
      </GridItem>
    );
  };

  const renderContent = () => {
    if (accepted) {
      return renderAccepted();
    }
    return renderPending();
  };

  const renderOrganisation = () => {
    if (!isMember || hideOrganisation()) {
      return null;
    }
    // Just set isOrgEditable to true if we decided we can invite from org
    return <Organisation orgId={tourOrgId} isOrgEditable={false} />;
  };

  const renderMemberOfOrg = () => {
    if (!isMember || !creating) {
      return null;
    }

    const values = {
      memberRole: orgRole,
      orgName: <strong>{orgName}</strong>,
      knownAs: <strong>{knownAs}</strong>,
      role: <strong>{capitalize(orgRole)}</strong>,
    };

    return (
      <GridItem>
        <H5 className={classes.alreadyMember}>
          <M {...m.alreadyMember} values={values} />
        </H5>
      </GridItem>
    );
  };

  const renderPersonalMessage = () => {
    if (!content) return null;

    return (
      <GridItem className={classes.messageRoot}>
        <GridContainer alignItems="baseline">
          <Hidden smDown>
            <GridItem className={classes.noPaddingRight}>
              <div className={classes.padding} />
            </GridItem>
          </Hidden>
          <GridItem className={classes.noPaddingLeft}>
            <H5 className={classes.h5}>Message: </H5>
          </GridItem>
          <GridItem className={classes.noPadding}>
            <SimpleRTE
              name="pm"
              value={content}
              className={classes.message}
              readOnly
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  const renderRoleEditingLabel = () =>
    LOGIC_HELPERS.ifElse(props.fromOrg, 'Select contributor role');

  const renderTourRole = () => {
    if (hideRole) return null;
    return (
      <GridItem key={userId}>
        <TourRole
          token={token}
          editingLabel={renderRoleEditingLabel()}
          showStatus={!minimise}
          templateId={templateId}
        />
      </GridItem>
    );
  };

  const renderPending = () => (
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
                  spacing={orgRole ? 4 : 0}
                >
                  <GridItem>
                    <Name id={userId} email={email} variant={TEXT} bold />
                    <div className={classes.status}>
                      {renderUserStatus(true)}
                    </div>
                  </GridItem>
                </GridContainer>
              </GridItem>
              {orgRole && (
                <GridItem>
                  <Role
                    id={userId}
                    variant={ORG_FIELD_VARIANTS.TEXT_WITH_LABEL}
                    role={orgRole}
                  />
                </GridItem>
              )}
              {!minimise && <Hidden smUp>{renderTourRole()}</Hidden>}
            </GridContainer>
          </GridItem>
          {!minimise && <Hidden xsDown>{renderTourRole()}</Hidden>}
          <GridItem>{renderOrganisation()}</GridItem>
          {renderSeeDetail()}
        </GridContainer>
      </GridItem>
      {minimise && renderTourRole()}
      {renderMemberOfOrg()}
      {renderPersonalMessage()}
    </GridContainer>
  );
  const paxBadge = () => {
    const isParticipant =
      userRoles && userRoles.findIndex(o => o.role === TOUR_PARTICIPANT) !== -1;
    if (!isParticipant) return null;
    return (
      <GridItem title={paxLabel}>
        <Icon
          icon="lnr-users"
          size="xsmall"
          paddingLeft
          paddingRight
          color="success"
        />
      </GridItem>
    );
  };

  const getCustRoleProps = () => {
    const isOwner = getOwner();
    const readOnly = !ability.can('update', NODE_SHARE) || !editable;
    if (isOwner) {
      return {
        nodeId: templateId,
        isOwner: true,
        readOnly,
      };
    }
    return {
      id: userNodeId,
      nodeId: templateId,
      isOwner: false,
      readOnly,
    };
  };

  const renderCustomRole = () => {
    if (ability.can('update', NODE_SHARE)) {
      return (
        <GridItem className={smDown && classes.customRole}>
          <TourCustomRole {...getCustRoleProps()} variant={VARIANTS.POPPER} />
        </GridItem>
      );
    }
    return (
      <GridItem
        className={smDown && classes.customRole}
        data-testid={`acceptedTourRole${userId}`}
      >
        <JText ellipsis bold>
          <TourCustomRole
            {...getCustRoleProps()}
            variant={VARIANTS.VALUE_ONLY}
            renderRole={TOUR_ROLES[role]}
          />
        </JText>
      </GridItem>
    );
  };

  const renderAccepted = () => (
    <GridContainer direction="column" className={classes.root} spacing={0}>
      {renderUserStatus()}
      <GridItem>
        <GridContainer noWrap>
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
          <GridItem
            className={classnames(
              classes.grow,
              classes.noPaddingBottom,
              !smDown && classes.nameContainer,
            )}
          >
            <GridContainer spacing={0}>
              <GridItem className={classes.grow}>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <GridContainer direction="row" alignItems="center">
                      <GridItem className="j-text-ellipsis">
                        <GridContainer spacing={0} noWrap>
                          <GridItem>
                            <Name
                              id={userId}
                              email={email}
                              variant={TEXT}
                              bold
                              component={GridItem}
                            />
                          </GridItem>
                          {paxBadge()}
                        </GridContainer>
                        <Hidden smDown>
                          <React.Fragment>
                            {ability.can('execute', PARTICIPANT) && (
                              <div>
                                <LastAccessAt
                                  id={userId}
                                  variant={TEXT_WITH_LABEL}
                                />
                              </div>
                            )}
                          </React.Fragment>
                        </Hidden>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <Hidden smDown>
                    {!!orgRole && !isDeactivatedMember && (
                      <GridItem>
                        <Role
                          id={userId}
                          variant={ORG_FIELD_VARIANTS.TEXT_WITH_LABEL}
                          role={orgRole}
                        />
                      </GridItem>
                    )}
                    {isDeactivatedMember && (
                      <GridItem data-testid={`deactivated${userId}`}>
                        <JText xs gray halfPaddingRight>
                          Organisation Role:
                        </JText>
                        <JText xs danger>
                          Deactivated
                        </JText>
                      </GridItem>
                    )}
                  </Hidden>
                </GridContainer>
              </GridItem>
              {ability.can('update', NODE_SHARE) && (
                <GridItem className={classes.role}>
                  {renderAcceptedTourRole()}
                </GridItem>
              )}
            </GridContainer>
          </GridItem>
          {renderCustomRole()}
          {renderSeeDetail()}
        </GridContainer>
      </GridItem>
      <Hidden mdUp>
        <GridItem>
          <GridContainer spacing={0} direction="column">
            <GridItem>
              {ability.can('execute', PARTICIPANT) && (
                <div>
                  <LastAccessAt id={userId} variant={TEXT_WITH_LABEL} />
                </div>
              )}
              {!!orgRole && !isDeactivatedMember && (
                <GridItem>
                  <Role
                    id={userId}
                    variant={ORG_FIELD_VARIANTS.TEXT_WITH_LABEL}
                    role={orgRole}
                  />
                </GridItem>
              )}
              {isDeactivatedMember && (
                <GridItem>
                  <JText xs gray halfPaddingRight>
                    Organisation Role:
                  </JText>
                  <JText xs danger>
                    Deactivated
                  </JText>
                </GridItem>
              )}
            </GridItem>
          </GridContainer>
        </GridItem>
      </Hidden>
    </GridContainer>
  );

  const ownerRole = () => (
    <GridContainer spacing={0} direction="column">
      <GridItem>{TOUR_ROLES[role]}</GridItem>
      {nodeTransferToUserId && (
        <TransferStatus
          id={templateId}
          me={userId}
          simple
          variant={VARIANTS.BADGE}
        />
      )}
    </GridContainer>
  );

  const renderAcceptedTourRole = () => {
    // HACK
    if (getOwner()) {
      return ownerRole();
    }

    return (
      <GridContainer spacing={0} direction="column">
        <Hidden mdUp>
          <GridItem>
            <TourRole
              templateId={templateId}
              userId={userId}
              token={token}
              role={role}
              editable={isRoleEditable()}
              editableLabel="Role"
            />
          </GridItem>
        </Hidden>
        <Hidden smDown>
          <GridItem>
            <TourRole
              templateId={templateId}
              userId={userId}
              token={token}
              role={role}
              editable={isRoleEditable()}
            />
          </GridItem>
        </Hidden>
        {nodeTransferToUserId === userId && (
          <TransferStatus
            id={templateId}
            me={userId}
            simple
            variant={VARIANTS.BADGE}
          />
        )}
      </GridContainer>
    );
  };

  if (index < ANIMATION_MAX_INDEX) {
    if (noanimate) return renderContent();

    return (
      <Grow in={show} timeout={ANIMATION_TIMEOUT / 2}>
        {renderContent()}
      </Grow>
    );
  }

  return show && content;
}

Invitee.propTypes = {
  resaga: PropTypes.object.isRequired,
  templateId: PropTypes.number, // templateId
  userId: PropTypes.number, // overrides token
  role: PropTypes.string, // overrides token
  token: PropTypes.string, // invitation token
  index: PropTypes.number,
  noanimate: PropTypes.bool,
  creating: PropTypes.bool,
  onSeeDetail: PropTypes.func,
  hideRole: PropTypes.bool,
  minimise: PropTypes.bool,
  renderPublic: PropTypes.bool,
  phoneNoMargin: PropTypes.bool,
  emailLinkSubject: PropTypes.string,
  emailLinkBody: PropTypes.string,
  email: PropTypes.string,
  accepted: PropTypes.bool,
  showCustomRoleAsValue: PropTypes.bool,
  editable: PropTypes.bool,
  smDown: PropTypes.bool,
  adjustAvatarSmDown: PropTypes.bool,
  userNodeId: PropTypes.number,
};

Invitee.defaultProps = {
  templateId: 0,
  userId: 0,
  role: null,
  token: '',
  index: 0,
  noanimate: false,
  creating: false,
  onSeeDetail: null,

  email: '',
  me: 0,
  orgId: 0,
  accepted: false,
  orgRole: null,
  minimise: false,
  phoneNoMargin: false,
  ownerSettingId: 0,
};

export default compose(
  injectIntl,
  withSMDown,
  resagaHOC({
    setValue: {
      seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
    },
  }),
)(React.memo(Invitee));
