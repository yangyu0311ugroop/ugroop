import { Hidden } from '@material-ui/core';
import { TOUR_ROLE } from 'apis/components/Ability/roles';
import { PENDING, PEOPLE_FILTERS, PEOPLE_TAB_OPTIONS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import Hr from 'components/Hr';
import {
  CONFIG_0,
  CONFIG_1,
  CONFIG_2,
  CONFIG_3,
} from 'containers/Templates/Modals/InterestedList/config';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Margin from 'viewComponents/Margin';
import P from 'viewComponents/Typography';
import Button from 'viewComponents/Button';

import Filters from './components/Filters';
import { CONFIG, SET_VALUE } from './config';
import styles from './styles';
import JText from '../../../../../../../../../../../../../../../components/JText';

export class FollowerMenuButton extends PureComponent {
  handleClick = () => {
    this.props.resaga.setValue({
      peopleFilterSelected: PEOPLE_FILTERS.FOLLOWER,
      peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.ALL_FOLLOWERS,
    });
  };

  renderContent = (content, show) => {
    const { peopleFilterSelected, isMobile, classes } = this.props;
    if (!show) return null;
    const color = LOGIC_HELPERS.ifElse(
      peopleFilterSelected === PEOPLE_FILTERS.FOLLOWER,
      'black',
      'gray',
    );
    return (
      <GridItem
        xs={LOGIC_HELPERS.ifElse(isMobile, 4, 12)}
        className={isMobile && classes.smGrid}
      >
        <div>
          <GridContainer direction="column">
            <GridItem>
              <Hidden smDown>
                <JText gray bold halfPaddingLeft md>
                  Followers
                </JText>
              </Hidden>
              <Hidden mdUp>
                <Button
                  variant={VARIANTS.INLINE}
                  size="xs"
                  dense
                  onClick={this.handleClick}
                  className={classes.btn}
                >
                  <P dense weight="bold" color={color}>
                    Followers
                  </P>
                </Button>
              </Hidden>
              <Hidden smDown>
                <Hr noMarginBottom halfMarginTop />
              </Hidden>
            </GridItem>
          </GridContainer>
        </div>
        <Hidden smDown>
          <Margin left="md" top="sm" bottom="sm">
            <GridContainer direction="column">{content}</GridContainer>
          </Margin>
        </Hidden>
      </GridItem>
    );
  };

  render = () => {
    const { templateId } = this.props;
    return <Filters templateId={templateId}>{this.renderContent}</Filters>;
  };
}

FollowerMenuButton.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent props
  isMobile: PropTypes.bool,
  // resaga props
  templateId: PropTypes.number,
  peopleFilterSelected: PropTypes.string,
};

FollowerMenuButton.defaultProps = {
  templateId: 0,
  isMobile: false,
};

export default compose(
  withStyles(styles, { name: 'FollowerMenuButton' }),
  resaga(CONFIG),
  INVITATION_STORE_HOC.selectShareTokens({
    nodeIds: 'templateId',
    roles: [TOUR_ROLE.TOUR_INTERESTED],
    statuses: [PENDING],
  }),
  resaga(CONFIG_0()),
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
  resaga(CONFIG_3()),
  resaga(SET_VALUE),
)(FollowerMenuButton);
