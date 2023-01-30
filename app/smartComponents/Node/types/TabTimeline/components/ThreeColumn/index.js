import { Hidden } from '@material-ui/core';
import { ability } from 'apis/components/Ability/ability';
import {
  CARD,
  CONTENT,
  DEFAULT,
  LIST,
  ROUTE_CONTENT,
  TOUR_ITINERARY,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import { withMDDown } from 'components/material-ui/hocs/withMediaQuery';
import TabChecklistView from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabChecklistView';
import Overview from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabCustom/components/Overview';
import TabDayView from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabDayView';
import TabTimeLine from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine';
import PeopleCard from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/PeopleCard';
import EventsWithoutDay from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/EventsWithoutDay';
import FlightBookings from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/FlightBookings';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Risks from 'smartComponents/Node/components/Risks';
import Rooms from 'smartComponents/Node/components/Rooms';
import Routes from 'smartComponents/Node/components/Routes';
import Description from 'smartComponents/Node/parts/Description';
import MiniCalendar from 'smartComponents/Node/parts/StartDate/components/MiniCalendar';
import AmountsCard from 'smartComponents/Node/types/Event/components/AmountsCard';
import TabGallery from 'smartComponents/Node/types/TabGallery';
import TabAccess from 'smartComponents/Node/types/TabOther/components/TabAccess';
import LayoutSelect from 'smartComponents/Node/types/TabTimeline/components/LayoutSelect';
import FloatingDayNavigation from 'smartComponents/Node/types/TabTimeline/components/ThreeColumn/components/FloatingDayNavigation';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CHECKLIST, DAY, TAB_TIMELINE, TEMPLATE } from 'utils/modelConstants';
import { CONFIG } from './config';
import styles from './styles';

export class ThreeColumn extends PureComponent {
  canEdit = () => this.props.editable && ability.can('update', TEMPLATE);

  canExecuteTab = () =>
    this.props.editable && ability.can('execute', TAB_TIMELINE);

  renderOverview = () => {
    const {
      classes,
      templateId,
      tabId,
      dayIds,
      startDate,
      galleryId,
      isPublic,
    } = this.props;

    const editable = this.canEdit();

    return (
      <Sticky top={106} id="day-overview" enabled enableTransforms={false}>
        <Overview
          isPublic={isPublic}
          variant={TOUR_ITINERARY}
          templateId={templateId}
          parentId={tabId}
          ids={dayIds}
          startDate={startDate}
          showDownload
          showFeedbacks
          showGallery
          type={DAY}
          galleryId={galleryId}
          bodyClassName={classnames(
            classes.stickyGrid,
            LOGIC_HELPERS.ifElse(
              editable,
              classes.stickyGridEdit,
              classes.stickyGridRead,
            ),
          )}
        />
      </Sticky>
    );
  };

  renderDescription = ({ content }) =>
    content && (
      <>
        <Hr half />
        {content}
      </>
    );

  canShowTabAccess = () => {
    const { editable } = this.props;
    return editable && ability.can('execute', TAB_TIMELINE);
  };

  renderAbout = () => {
    const { classes, tabId } = this.props;

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <GridContainer card direction="column" spacing={0}>
              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem xs>
                    <div className={classes.title}>
                      <NodeProp
                        id={tabId}
                        valueKey={CONTENT}
                        isCustomData={false}
                        showEmpty
                        required
                        editable={this.canExecuteTab()}
                      />
                    </div>
                  </GridItem>
                  {this.canShowTabAccess() && (
                    <TabAccess
                      id={tabId}
                      editable={ability.can('execute', TAB_TIMELINE)}
                      component={GridItem}
                    />
                  )}
                </GridContainer>
              </GridItem>

              <Description
                id={tabId}
                component={GridItem}
                editable={this.canExecuteTab()}
                placeholder="Add a description about this tab"
              >
                {this.renderDescription}
              </Description>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderLeft = () => {
    const { classes, tabId, templateId } = this.props;

    return (
      <div className={classes.left}>
        <GridContainer direction="column" spacing={2}>
          <GridItem>{this.renderAbout()}</GridItem>

          <MiniCalendar card templateId={templateId} tabId={tabId} />

          <GridItem>{this.renderOverview()}</GridItem>
        </GridContainer>
      </div>
    );
  };

  renderRight = () => {
    const {
      tabId,
      templateId,
      galleryId,
      layout,
      isPublic,
      hashkey,
      editable,
    } = this.props;

    return (
      <GridContainer direction="column" spacing={2}>
        <AmountsCard templateId={templateId} />

        {isPublic ? null : (
          <GridItem>
            <PeopleCard templateId={templateId} />
          </GridItem>
        )}

        <EventsWithoutDay templateId={templateId} tabId={tabId} smDown />

        <FlightBookings card templateId={templateId} editing={editable} />

        {!isPublic && (
          <GridItem>
            <Rooms variant={CARD} id={templateId} limit />
          </GridItem>
        )}

        <Routes
          isPublic={isPublic}
          variant={ROUTE_CONTENT}
          id={tabId}
          parentId={tabId}
        />

        <TabGallery
          variant={CARD}
          id={galleryId}
          templateId={templateId}
          filtered={layout === DAY}
          component={GridItem}
          isPublic={isPublic}
          hashkey={hashkey}
        />
        {!isPublic && (
          <GridItem>
            <Risks variant={CARD} id={templateId} />
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderDayView = () => {
    const { templateId, tabId, selectedOverviewType, isPublic } = this.props;
    return (
      <TabDayView
        templateId={templateId}
        id={tabId}
        renderChecklistView={this.isChecklistView(selectedOverviewType)}
        isPublic={isPublic}
      />
    );
  };

  renderTabView = () => {
    const { templateId, tabId, isPublic, selectedOverviewType } = this.props;
    if (this.isChecklistView(selectedOverviewType)) {
      return (
        <TabChecklistView
          templateId={templateId}
          id={tabId}
          isPublic={isPublic}
        />
      );
    }
    return (
      <TabTimeLine templateId={templateId} id={tabId} isPublic={isPublic} />
    );
  };

  isChecklistView = selectedOverviewType => selectedOverviewType === CHECKLIST;

  renderContent = () => {
    const { layout } = this.props;

    return LOGIC_HELPERS.switchCase(layout, {
      [DAY]: this.renderDayView,
      [DEFAULT]: this.renderTabView,
    });
  };

  render = () => {
    const { classes, isPublic, mdDown } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <Hidden smDown>
            <LayoutSelect row isPublic={isPublic} />
          </Hidden>
          <Hidden mdUp>
            <LayoutSelect isPublic={isPublic} />
          </Hidden>
        </GridItem>
        {/* <Hidden smUp>
          {isPublic || layout !== LIST ? null : (
            <>
              <GridItem>
                <PeopleCard templateId={templateId} />
              </GridItem>
            </>
          )}
        </Hidden> */}
        <GridItem>
          <GridContainer
            // justify={isPublic ? 'unset' : 'space-between'}
            justify="space-between"
            className={classes.root}
            wrap="nowrap"
          >
            <Hidden smDown>
              <GridItem>{this.renderLeft()}</GridItem>
            </Hidden>
            <GridItem
              className={classnames(
                classes.grow,
                classes.content,
                !mdDown && classes.contentMaxWidth,
              )}
            >
              {mdDown && <FloatingDayNavigation />}
              {this.renderContent()}
            </GridItem>
            <Hidden smDown>
              <GridItem className={classes.right}>
                <Sticky top={106} bottomBoundary="#LayoutContent">
                  {this.renderRight()}
                </Sticky>
              </GridItem>
            </Hidden>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

ThreeColumn.propTypes = {
  // hoc props
  // resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  mdDown: PropTypes.bool,

  // parent props
  tabId: PropTypes.number,
  templateId: PropTypes.number,
  galleryId: PropTypes.number,
  layout: PropTypes.string,
  hashkey: PropTypes.string,
  isPublic: PropTypes.bool,

  // resaga props
  editable: PropTypes.bool,
  dayIds: PropTypes.array,
  startDate: PropTypes.string,
  selectedOverviewType: PropTypes.string,
};

ThreeColumn.defaultProps = {
  dayIds: [],
  layout: LIST,
};

export default compose(
  withStyles(styles, { name: 'ThreeColumn' }),
  resaga(CONFIG),
  withMDDown,
)(ThreeColumn);
