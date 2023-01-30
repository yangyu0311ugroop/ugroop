import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TRANSFER_TOUR_TYPE } from 'variantsConstants';
import Invitee from 'smartComponents/Organisation/components/InviteUser/components/Invitee';
import Editable from 'viewComponents/Editable';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { H3, H5 } from 'viewComponents/Typography';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import Form from 'ugcomponents/Form';
import { CONFIG } from './config';
import styles from './styles';
import InviteeByUserNodeWrapper from '../../../ShareList/components/InviteeByUserNode/wrapper';

export class TransferByUser extends PureComponent {
  handleEditableClick = id => () => {
    this.props.resaga.setValue({
      transferToUserId: id,
    });
  };

  renderOrgMember = () => {
    const { peopleIds, me, createdBy } = this.props;
    const filteredIds = peopleIds.filter(id => ![me, createdBy].includes(id));
    const content = [
      ...filteredIds.map(userId => (
        <GridItem key={userId}>
          <Editable onClick={this.handleEditableClick(userId)}>
            <Invitee userId={userId} accepted />
          </Editable>
        </GridItem>
      )),
    ];

    return this.contentWrapper(content, filteredIds);
  };

  renderNoList = () => {
    const { classes } = this.props;
    return (
      <GridContainer alignItems="center" direction="column">
        <GridItem className={classes.blankSlate}>
          <H3 noMargin>No Members yet</H3>
        </GridItem>
        <GridItem className={classes.blankSlate}>
          <H5 noMargin>Please choose another option</H5>
        </GridItem>
      </GridContainer>
    );
  };

  renderTourMember = () => {
    const { id, userNodeIds } = this.props;
    const content = [
      <InviteeByUserNodeWrapper
        id={id}
        handleEditableClick={this.handleEditableClick}
      />,
    ];
    return this.contentWrapper(content, userNodeIds);
  };

  contentWrapper = (content, ids) => {
    const { classes } = this.props;
    if (!ids || ids.length === 0) return this.renderNoList();
    return (
      <Form>
        <GridContainer
          classes={{ root: classes.container }}
          direction="column"
          spacing={0}
        >
          {content}
          <GridItem xs />
          <GridItem>
            <H5>Please select a tour member to transfer this tour</H5>
          </GridItem>
        </GridContainer>
      </Form>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [TRANSFER_TOUR_TYPE.TOUR_CONNECTION]: this.renderTourMember,
      [TRANSFER_TOUR_TYPE.ORG_CONNECTION]: this.renderOrgMember,
      [DEFAULT]: this.renderTourMember,
    });
  };
}

TransferByUser.propTypes = {
  // HOc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  userNodeIds: PropTypes.array,
  id: PropTypes.number.isRequired, // template id
  variant: PropTypes.string,
  peopleIds: PropTypes.array,
  me: PropTypes.number,

  // resaga props
  createdBy: PropTypes.number,
};

TransferByUser.defaultProps = {
  peopleIds: [],
  userNodeIds: [],
};

export default compose(
  withStyles(styles, { name: 'TransferByUser' }),
  INVITATION_STORE_HOC.selectUserNodeIds({
    nodeIds: 'id',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
  }),
  INVITATION_STORE_HOC.selectUserNodeUserIds({
    nodeIds: 'id',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
    outputProp: 'userIds',
  }),
  resaga(CONFIG),
)(TransferByUser);
