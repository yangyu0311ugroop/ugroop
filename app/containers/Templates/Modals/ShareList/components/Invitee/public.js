import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from '../../../../../../utils/helpers/logic';
import { IMAGE_SIZES_CONSTANTS } from '../../../../../../smartComponents/File/types/Photo/constants';
import GridContainer from '../../../../../../components/GridContainer';
import GridItem from '../../../../../../components/GridItem';
import { Avatar, Name } from '../../../../../../ugcomponents/Person';
import { TEXT, TEXT_WITH_LABEL } from '../../../../../../appConstants';
import { ability } from '../../../../../../apis/components/Ability/ability';
import { PARTICIPANT } from '../../../../../../utils/modelConstants';
import LastAccessAt from '../../../../../../smartComponents/RecentActivity/parts/LastAccessAt';
import Icon from '../../../../../../ugcomponents/Icon';
import Email from '../../../../../../smartComponents/Person/parts/Email';
import { VARIANTS } from '../../../../../../variantsConstants';
import PhoneList from '../../../../../../smartComponents/Person/components/Phones';
import { PERSON_PROFILE_VIEW_STORE } from '../../../../../Profile/components/Person/constants';
import { withSMDown } from '../../../../../../components/material-ui/hocs/withMediaQuery';
import TourCustomRole from '../../../../../../smartComponents/Node/parts/TourCustomRole';
import JText from '../../../../../../components/JText';
import { TOUR_ROLES } from '../../../../../../datastore/invitationStore/constants';
import {
  ANIMATION_MAX_INDEX,
  ANIMATION_TIMEOUT,
  INCREMENT_TIMEOUT,
  NO_ANIMATION_TIMEOUT,
} from './constants';
import { TOUR_CONTRIBUTOR_ROLE } from '../../../../../../apis/components/Ability/roles';
import { makeStyles } from '../../../../../../components/material-ui';
import styles from './styles';
const useStyles = makeStyles(styles);
function InviteePublic(props) {
  const {
    index,
    userId,
    role,
    templateId,
    emailLinkSubject,
    emailLinkBody,
    adjustAvatarSmDown,
    smDown,
    phoneNoMargin,
    showCustomRoleAsValue,
    userNodeId,
  } = props;
  const classes = useStyles();
  const [show, setShow] = useState(false);
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

  const getCustRoleProps = () => {
    const isOwner = role === TOUR_CONTRIBUTOR_ROLE.TOUR_OWNER;
    const readOnly = true;
    if (isOwner) {
      return {
        nodeId: templateId,
        isOwner: true,
        readOnly,
      };
    }
    return {
      nodeId: templateId,
      isOwner: false,
      readOnly,
      id: userNodeId,
    };
  };

  const renderCustomRole = () => (
    <GridItem className={smDown && classes.customRole}>
      <JText ellipsis bold>
        <TourCustomRole
          {...getCustRoleProps()}
          variant={LOGIC_HELPERS.ifElse(
            !showCustomRoleAsValue,
            VARIANTS.VALUE_ONLY,
            VARIANTS.POPPER,
          )}
          renderRole={TOUR_ROLES[role]}
          showAsValue={showCustomRoleAsValue}
        />
      </JText>
    </GridItem>
  );

  const renderPublic = () => {
    const imageSize = LOGIC_HELPERS.ifElse(
      smDown && adjustAvatarSmDown,
      IMAGE_SIZES_CONSTANTS.SMALL,
      IMAGE_SIZES_CONSTANTS.NORMAL,
    );
    return (
      <GridContainer direction="column" className={classes.root} spacing={0}>
        <GridItem>
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Avatar
                noTooltip={false}
                lg
                userId={userId}
                showAvatarDetails={show}
                xxs={false}
                imageSize={imageSize}
                emailSubjectLink={emailLinkSubject}
                emailBodyLink={emailLinkBody}
              />
            </GridItem>
            <GridItem>
              <GridContainer direction="column" spacing={0} wrap="nowrap">
                <GridItem>
                  <GridContainer direction="row" alignItems="center">
                    <GridItem className="j-text-ellipsis">
                      <Name id={userId} variant={TEXT} bold />
                      {ability.can('execute', PARTICIPANT) && (
                        <div>
                          <LastAccessAt id={userId} variant={TEXT_WITH_LABEL} />
                        </div>
                      )}
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem>
                  <GridContainer wrap="nowrap" spacing={0}>
                    <GridItem>
                      <Icon
                        icon="lnr-user"
                        size="small"
                        className={classes.icon}
                      />
                    </GridItem>
                    {renderCustomRole()}
                  </GridContainer>
                </GridItem>
                <GridItem>
                  <Email
                    id={userId}
                    variant={VARIANTS.ICON}
                    emailSubjectLink={emailLinkSubject}
                    emailBodyLink={emailLinkBody}
                  />
                </GridItem>
                <GridItem>
                  <PhoneList
                    id={userId}
                    viewStore={PERSON_PROFILE_VIEW_STORE}
                    variant={VARIANTS.LIST_ONLY}
                    showDefaultOnly
                    showSimple
                    noMargin={phoneNoMargin}
                    withAction
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
  return renderPublic();
}

export default compose(withSMDown)(React.memo(InviteePublic));
