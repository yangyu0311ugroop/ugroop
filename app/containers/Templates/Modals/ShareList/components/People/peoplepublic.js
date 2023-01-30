import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { TOUR_CONTRIBUTOR_ROLE } from 'apis/components/Ability/roles';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import Hr from 'components/Hr';
import { H4 } from 'viewComponents/Typography';
import InviteeByOwner from '../InviteeByOwner';
import InviteeByUserNodePublic from '../InviteeByUserNode/public';
import { CONFIG_FILTER } from './config';
import styles from './styles';

export class PeoplePublic extends PureComponent {
  renderPublicView = () => {
    const { id, userNodeIds, roles, classes } = this.props;
    const owner = roles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER) ? (
      <GridItem
        key="ownerId"
        xs={12}
        lg={4}
        md={4}
        sm={6}
        className={classes.publicViewItem}
      >
        <InviteeByOwner templateId={id} renderPublic />
      </GridItem>
    ) : null;

    const invitees = userNodeIds.map((userNodeId, index) => (
      <GridItem
        key={userNodeId}
        xs={12}
        lg={4}
        md={4}
        sm={6}
        className={classes.publicViewItem}
      >
        <InviteeByUserNodePublic
          templateId={id}
          userNodeId={userNodeId}
          index={index}
          renderPublic
          role={roles[index]}
        />
      </GridItem>
    ));

    return (
      <>
        <GridItem>
          <H4 dense weight="bold">
            Organisers
          </H4>
          <Hr halfMarginTop halfMarginBottom />
        </GridItem>
        <GridItem>
          <GridContainer justify="space-between">
            {owner}
            {invitees}
          </GridContainer>
        </GridItem>
      </>
    );
  };

  render = () => this.renderPublicView();
}

PeoplePublic.propTypes = {
  classes: PropTypes.object.isRequired,
  userNodeIds: PropTypes.array,
  id: PropTypes.number.isRequired, // template id
  roles: PropTypes.array,
};

PeoplePublic.defaultProps = {
  userNodeIds: [],
  roles: [],
};

export default compose(
  withStyles(styles, { name: 'PeoplePublic' }),
  resaga(CONFIG_FILTER),
  INVITATION_STORE_HOC.selectUserNodeIds({
    nodeIds: 'id',
  }),
)(PeoplePublic);
