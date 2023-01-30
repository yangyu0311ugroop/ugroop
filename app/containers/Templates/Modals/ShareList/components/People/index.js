import { Can } from 'apis/components/Ability/components/Can';
import { DEFAULT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React from 'react';
import {
  TOUR_CONTRIBUTOR_ROLE,
  TOUR_CONTRIBUTOR_ROLE_TYPES,
} from 'apis/components/Ability/roles';
import {
  CONFIRMED,
  PENDING,
  ORG_MEMBER,
} from 'datastore/invitationStore/constants';
import Form from 'ugcomponents/Form';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Hr from 'components/Hr';
import { NODE_SHARE } from 'utils/modelConstants';
import P, { H4 } from 'viewComponents/Typography';
import Margin from 'viewComponents/Margin';
import { useSelector } from 'react-redux';
import Scroll from 'react-scroll';
import Invitee from '../Invitee';
import InviteeByOwner from '../InviteeByOwner';
import InviteeByUserNode from '../InviteeByUserNode';
import styles from './styles';
import PeopleWrapper from './components/PeopleWrapper';
import { makeStyles } from '../../../../../../components/material-ui';
import { useGlobalContext } from '../../../../../App/globalStateContext';
import { makeSingleSelect } from '../../../../../../datastore/selectUtility';

import {
  TEMPLATE_VIEWSTORE_RESELECTORS,
  VIEW_STORE_ATTRIBUTES,
} from '../../../../../../datastore/templateManagementStore/selectorsViaConnect';
const useStyles = makeStyles(styles);
function People(props) {
  const classes = useStyles();
  const { id, shareListFilter, showConnected, orgId, variant } = props;

  const [globalState] = useGlobalContext();
  const tourConnectPeople = globalState.BillingContext.tourConnectedPeople;
  const selectOrgId = useSelector(store =>
    makeSingleSelect(TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey)(
      store,
      {
        key: VIEW_STORE_ATTRIBUTES.selectedOrgId,
      },
    ),
  );
  const roles = useSelector(store =>
    makeSingleSelect(TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey)(
      store,
      {
        key: VIEW_STORE_ATTRIBUTES.filterRoleBy,
      },
    ),
  );
  const shareTokens = tourConnectPeople.filter(
    o => o.token && o.status === PENDING && roles && roles.includes(o.role),
  );
  const renderInvitees = () => {
    const owner =
      roles && roles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER) ? (
        <GridItem key="ownerId">
          <InviteeByOwner templateId={id} />
        </GridItem>
      ) : null;

    const invitees = tourConnectPeople
      .filter(o => o.userId && roles && roles.includes(o.role))
      .map((p, index) => (
        <GridItem key={p.id}>
          <InviteeByUserNode
            templateId={id}
            userNodeId={p.id}
            index={index}
            content={p.content}
            role={p.role}
            userId={p.userId}
            email={p.email}
          />
        </GridItem>
      ));

    const emptyText =
      owner || tourConnectPeople.filter(o => o.userId).length > 0 ? null : (
        <GridItem>
          <P fontStyle="italic" dense>
            No confirmed user yet
          </P>
        </GridItem>
      );

    return (
      <>
        <GridItem>
          <H4 dense weight="bold">
            Confirmed
          </H4>
          <Hr halfMarginTop halfMarginBottom />
        </GridItem>
        {owner}
        {invitees}
        {emptyText}
        <Can do="create" on={NODE_SHARE}>
          {renderPendingPeople()}
        </Can>
      </>
    );
  };

  const getSelectedOrgId = () => selectOrgId || orgId;

  const renderPendingPeople = () => {
    if (!shareTokens.length) {
      return <div />;
    }
    const people = shareTokens.map((ns, index) => (
      <GridItem key={ns.token} className={classes.pending}>
        <Invitee
          pending
          templateId={id}
          token={ns.token}
          email={ns.email}
          index={index}
        />
      </GridItem>
    ));

    return (
      <>
        <GridItem>
          <Margin top="sm" />
          <H4 dense weight="bold">
            Pending
          </H4>
          <Hr halfMarginTop halfMarginBottom />
        </GridItem>
        {people}
      </>
    );
  };

  const renderOrgMemberList = () => {
    const ids = tourConnectPeople
      .filter(o => o.userId && TOUR_CONTRIBUTOR_ROLE_TYPES.includes(o.role))
      .map(o => o.userId);
    const lprops = {
      showConnected,
      orgId: getSelectedOrgId(),
      variant,
      id,
      userIds: ids,
    };
    return (
      <Scroll.Element id="containerElement" className={classes.scrollElement}>
        <GridContainer className={classes.orgContainer} direction="column">
          <GridItem>
            <PeopleWrapper {...lprops} />
          </GridItem>
        </GridContainer>
      </Scroll.Element>
    );
  };

  const renderContent = () =>
    LOGIC_HELPERS.switchCase(shareListFilter, {
      [CONFIRMED]: renderInvitees,
      [PENDING]: renderPendingPeople,
      [ORG_MEMBER]: renderOrgMemberList,
      [DEFAULT]: renderInvitees,
    });

  const renderVariant = () =>
    LOGIC_HELPERS.switchCase(variant, {
      [ORG_MEMBER]: renderOrgMemberList,
      [DEFAULT]: renderContent,
    });

  return (
    <Form>
      <GridContainer
        classes={{ root: classes.container }}
        direction="column"
        spacing={0}
      >
        {renderVariant()}
        <GridItem xs />
      </GridContainer>
    </Form>
  );
}

People.propTypes = {
  id: PropTypes.number.isRequired, // template id
  orgId: PropTypes.number,
  variant: PropTypes.string,
  showConnected: PropTypes.bool,
  shareListFilter: PropTypes.string,
};

People.defaultProps = {
  showConnected: true,
};

export default React.memo(People);
