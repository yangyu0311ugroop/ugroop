import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import React, { PureComponent } from 'react';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import ParticipantListWrapper from 'smartComponents/Node/components/ParticipantList';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TOUR_CONTRIBUTOR, TAB_OTHER, NODE_SHARE } from 'utils/modelConstants';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import {
  CONTENT,
  DEFAULT,
  PEOPLE_FILTERS,
  PEOPLE_TAB_OPTIONS,
} from 'appConstants';
import { Hidden } from '@material-ui/core';

import TabAccess from 'smartComponents/Node/types/TabOther/components/TabAccess';
import { ability } from 'apis/components/Ability/ability';
import { VARIANTS } from 'variantsConstants';
import BuymoreTourSeats from 'smartComponents/Subscription/BuymoreTourSeats';
import ContributorMenuButton from './components/ContributorMenuButton';
import ParticipantMenuButton from './components/ParticipantMenuButton';
import FollowerMenuButton from './components/FollowerMenuButton';

import ContributorsFilter from './components/ContributorMenuButton/components/Filters';
import ParticipantsFilter from './components/ParticipantMenuButton/components/Filters';
import FollowersFilter from './components/FollowerMenuButton/components/Filters';

import { CONFIG, CONFIG1 } from './config';
import styles from './styles';

export class Sidebar extends PureComponent {
  state = {
    isSticky: null,
  };

  componentDidMount() {
    const { peopleView } = this.props;
    if (!peopleView) {
      this.props.resaga.setValue({
        peopleView: TOUR_CONTRIBUTOR,
        peopleFilterSelected: PEOPLE_FILTERS.CONTRIBUTORS,
        peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.ALL_CONTRIBUTORS,
      });
    }
  }

  renderParticipantButton = (isMobile = false) => () => (
    <ParticipantMenuButton
      isMobile={isMobile}
      tid={this.props.templateId}
      canInvite={this.canInvite()}
      orgId={this.props.orgId}
    />
  );

  canExecuteTab = () => ability.can('execute', TAB_OTHER);

  canInvite = () => ability.can('execute', { type: NODE_SHARE });

  canShowTabAccess = () => {
    const { editable } = this.props;
    return editable && ability.can('execute', TAB_OTHER);
  };

  renderTitle = () => {
    const { id, classes } = this.props;
    return (
      <GridItem>
        <GridContainer
          direction="row"
          wrap="nowrap"
          alignItems="center"
          justify="space-between"
        >
          <GridItem>
            <GridContainer direction="row" spacing={0}>
              <GridItem>
                <div className={classes.tabTitle}>
                  <NodeProp
                    id={id}
                    valueKey={CONTENT}
                    isCustomData={false}
                    showEmpty
                    required
                  />
                </div>
              </GridItem>
              <GridItem>
                {this.canShowTabAccess() && (
                  <TabAccess id={id} editable component={GridItem} />
                )}
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.canInvite() && !this.props.orgId && (
            <BuymoreTourSeats
              orgId={this.props.orgId}
              templateId={this.props.templateId}
            />
          )}
        </GridContainer>
      </GridItem>
    );
  };

  renderFilters = isMobile => {
    const { templateId, peopleFilterSelected } = this.props;
    const { isSticky } = this.state;

    return LOGIC_HELPERS.switchCase(peopleFilterSelected, {
      [PEOPLE_FILTERS.CONTRIBUTORS]: (
        <ContributorsFilter
          variant={LOGIC_HELPERS.ifElse(isSticky, VARIANTS.MENU_ITEM)}
        />
      ),
      [PEOPLE_FILTERS.PARTICIPANTS]: (
        <ParticipantsFilter
          templateId={templateId}
          variant={LOGIC_HELPERS.ifElse(
            isMobile && isSticky,
            VARIANTS.POPPER,
            VARIANTS.FILTERS_ONLY,
          )}
        />
      ),
      [PEOPLE_FILTERS.FOLLOWER]: (
        <FollowersFilter
          templateId={templateId}
          variant={LOGIC_HELPERS.ifElse(
            isMobile && isSticky,
            VARIANTS.POPPER,
            VARIANTS.FILTERS_ONLY,
          )}
        />
      ),
      [DEFAULT]: null,
    });
  };

  stickyChange = status => {
    this.setState({
      isSticky: status.status === Sticky.STATUS_FIXED,
    });
  };

  render = () => (
    <div>
      <Hidden mdUp>
        <Sticky
          innerZ={999}
          id="people-tab-menu"
          top={90}
          onStateChange={this.stickyChange}
        >
          <GridContainer card justify="space-between" paddingBottom0>
            <ContributorMenuButton isMobile />
            <ParticipantListWrapper
              renderList={this.renderParticipantButton(true)}
            />
            <FollowerMenuButton isMobile />
          </GridContainer>
          <GridContainer card direction="column">
            <GridItem>{this.renderFilters(true)}</GridItem>
          </GridContainer>
        </Sticky>
      </Hidden>
      <Hidden smDown>
        <GridContainer card direction="column" spacing={2}>
          {this.renderTitle()}
          <ContributorMenuButton
            templateId={this.props.templateId}
            canInvite={this.canInvite()}
            orgId={this.props.orgId}
          />
          <ParticipantListWrapper renderList={this.renderParticipantButton()} />
          <FollowerMenuButton />
        </GridContainer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number,
  // resaga props
  peopleView: PropTypes.string,
  peopleFilterSelected: PropTypes.string,
  templateId: PropTypes.number,
  orgId: PropTypes.number,
  editable: PropTypes.bool,
};

Sidebar.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Sidebar' }),
  resaga(CONFIG),
  resaga(CONFIG1),
)(Sidebar);
