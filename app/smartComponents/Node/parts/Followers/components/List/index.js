import { DEFAULT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Guardian from 'smartComponents/Links/types/Guardian';
import { EditablePlaceholder } from 'viewComponents/Editable';
// import Hr from 'components/Hr';

import OldFollower from './components/OldFollower';
import { CONFIG, CONFIG_1, CONFIG_2, CONFIG_3 } from './config';
import styles from './styles';
import { withNodeRole } from '../../../../hoc/withNodeRole';
import {
  TOUR_INTERESTED,
  TOUR_ORGANIZER,
  TOUR_OWNER,
  TOUR_PARTICIPANT,
} from '../../../../../../utils/modelConstants';
import { withXSDown } from '../../../../../../components/material-ui/hocs/withMediaQuery';
import JText from '../../../../../../components/JText';
import HRWithText from '../../../../../../ugcomponents/HRWithText';

export class List extends PureComponent {
  renderList = followerId => {
    const { readOnly, showUnlink } = this.props;
    return (
      <GridItem key={followerId}>
        <Guardian
          participantId={this.props.id}
          id={followerId}
          variant={VARIANTS.EDITABLE}
          readOnly={readOnly}
          showUnlink={showUnlink}
          showEditBtn
        />
      </GridItem>
    );
  };

  getFollowerIds = filteredFollowers => {
    const { roles = [], participantUserId, userId } = this.props;

    if (roles.includes(TOUR_ORGANIZER) || roles.includes(TOUR_OWNER))
      return filteredFollowers;

    if (roles.includes(TOUR_PARTICIPANT) && participantUserId === userId)
      return filteredFollowers;

    if (roles.includes(TOUR_INTERESTED)) return filteredFollowers;

    return [];
  };

  renderPlaceholder = () => (
    <EditablePlaceholder>No followers linked</EditablePlaceholder>
  );

  renderListWithOldData = () => {
    const { id, filteredFollowers, oldParentNodeId } = this.props;

    const followerIds = this.getFollowerIds(filteredFollowers);

    const oldFollower = LOGIC_HELPERS.ifElse(
      oldParentNodeId,
      <GridItem>
        <OldFollower participantId={id} id={oldParentNodeId} />
      </GridItem>,
      null,
    );

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer direction="column">
            {followerIds.map(this.renderList)}
            {oldFollower}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderDefault = () => {
    const {
      oldParentNodeId,
      filteredFollowers,
      classes,
      indentLeft,
      xsDown,
    } = this.props;
    const followerIds = this.getFollowerIds(filteredFollowers);

    if (oldParentNodeId !== 0) return this.renderListWithOldData();

    if (followerIds.length === 0 && filteredFollowers.length > 0) return null;

    if (followerIds.length === 0) return this.renderPlaceholder();

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <HRWithText
            x2MarginTopBottom
            noFontSize
            content={
              <JText sm bold>
                Followers
              </JText>
            }
            halfPadding
          />
        </GridItem>
        <GridContainer
          direction="column"
          className={indentLeft && !xsDown && classes.indentLeft}
        >
          {filteredFollowers.map(this.renderList)}
        </GridContainer>
      </GridContainer>
    );
  };

  renderCount = () => {
    const { followers, oldParentNodeId } = this.props;

    return LOGIC_HELPERS.ifElse(
      oldParentNodeId !== 0,
      followers.length + 1,
      followers.length,
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.COUNT]: this.renderCount,
      [DEFAULT]: this.renderDefault,
    });
  };
}

List.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array,
  xsDown: PropTypes.bool,

  // parent props
  id: PropTypes.number,
  showUnlink: PropTypes.bool,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  indentLeft: PropTypes.bool,
  userId: PropTypes.number,
  participantUserId: PropTypes.number,

  // resaga props
  filteredFollowers: PropTypes.array,
  followers: PropTypes.array,
  oldParentNodeId: PropTypes.number,
};

List.defaultProps = {
  filteredFollowers: [],
  oldParentNodeId: 0,
  readOnly: false,
};

export default compose(
  withXSDown,
  withNodeRole,
  withStyles(styles, { name: 'List' }),
  resaga(CONFIG),
  resaga(CONFIG_1),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
)(List);
