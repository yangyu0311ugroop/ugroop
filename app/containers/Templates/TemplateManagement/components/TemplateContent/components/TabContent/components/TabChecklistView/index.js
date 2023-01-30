import Hidden from '@material-ui/core/Hidden';
import { ability } from 'apis/components/Ability/ability';
import { CARD, DO_NOTHING, TOUR_ITINERARY } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import Overview from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabCustom/components/Overview';
// import PeopleCard from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/PeopleCard';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { compose } from 'redux';
import resaga from 'resaga';

import Checklists from 'smartComponents/Node/components/Checklists';
import Description from 'smartComponents/Node/parts/Description';
import TabGallery from 'smartComponents/Node/types/TabGallery';
import Headx from 'ugcomponents/Headx';
import { scrollOptions, templateDayIdAnchor } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { parseQueryParam } from 'utils/helpers/url';
import { DAY, TEMPLATE } from 'utils/modelConstants';
import Day from './components/Day';
import { CONFIG } from './config';
import styles from './styles';

export class TabChecklistView extends PureComponent {
  componentDidMount = () => {
    const parsedQuery = parseQueryParam(this.props.location.search);
    const selectDayId = LOGIC_HELPERS.ifElse(
      this.props.selectDayId === -1,
      parsedQuery.selectedDay,
      this.props.selectDayId,
    );

    setTimeout(() => {
      scroller.scrollTo(templateDayIdAnchor(selectDayId), scrollOptions);
      this.props.resaga.setValue({
        selectDayId: Number(selectDayId),
      });
    }, 0);
  };

  canEdit = () => this.props.editable && ability.can('update', TEMPLATE);

  renderDescription = ({ content }) =>
    content && (
      <GridItem>
        <GridContainer card direction="column" spacing={0}>
          <GridItem>
            <Headx>Details</Headx>
          </GridItem>
          <Hr half />
          <GridItem>{content}</GridItem>
        </GridContainer>
      </GridItem>
    );

  renderDay = (dayId, index) => {
    const { templateId, id, content, selectDayId } = this.props;
    return (
      <GridItem>
        <Day
          templateId={templateId}
          tabId={id}
          dayId={dayId}
          index={index}
          selected={dayId === selectDayId}
          content={content}
        />
      </GridItem>
    );
  };

  iconToggle = () => DO_NOTHING;

  render = () => {
    const {
      classes,
      secondChild,
      templateId,
      startDate,
      id,
      dayIds,
      isPublic,
    } = this.props;

    const editable = this.canEdit();

    const overview = (
      <Overview
        variant={TOUR_ITINERARY}
        templateId={templateId}
        parentId={id}
        ids={dayIds}
        startDate={startDate}
        showDownload
        showFeedbacks
        showGallery
        type={DAY}
        bodyClassName={classnames(
          classes.stickyGrid,
          LOGIC_HELPERS.ifElse(
            editable,
            classes.stickyGridEdit,
            classes.stickyGridRead,
          ),
        )}
        isPublic={isPublic}
      />
    );

    return (
      <GridContainer
        direction="column"
        spacing={0}
        wrap="nowrap"
        className={classes.root}
      >
        <Description
          id={templateId}
          editable={editable}
          placeholder="Add an overview description of the tour"
          noContent="Add an overview description of the tour"
        >
          {this.renderDescription}
        </Description>
        {!isPublic && (
          <GridItem className={classes.elevation}>
            <div id={`day${templateId}`}>
              <GridContainer spacing={0}>
                <GridItem className={classes.contentWidth}>
                  <Checklists
                    parentNodeId={templateId}
                    renderBlankSlate
                    showChecklists
                    editing
                    showEmpty
                    isLayoutView
                    iconToggle={this.iconToggle}
                    useExpandedState
                  />
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>
        )}
        <Hidden mdUp>
          {/* {isPublic ? null : (
            <GridItem>
              <div className={classes.marginTop}>
                <PeopleCard templateId={templateId} maxAvatars={6} />
              </div>
            </GridItem>
          )} */}
          <GridItem>
            <div className={classes.marginTop}>
              <TabGallery
                variant={CARD}
                id={secondChild}
                templateId={templateId}
              />
            </div>
          </GridItem>
          <GridItem>
            <div className={classes.marginTop}>{overview}</div>
          </GridItem>
        </Hidden>
        <GridItem className={classes.contentWidth}>
          <GridContainer direction="column" spacing={0}>
            <GridItem className={classes.root}>
              {dayIds.map(this.renderDay)}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

TabChecklistView.propTypes = {
  id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  templateId: PropTypes.number,
  resaga: PropTypes.object,
  editable: PropTypes.bool,
  isPublic: PropTypes.bool,
  dayIds: PropTypes.array,
  selectDayId: PropTypes.number,
  secondChild: PropTypes.number,
  startDate: PropTypes.string,
  location: PropTypes.object,
  content: PropTypes.object,
};

TabChecklistView.defaultProps = {
  dayIds: [],
  selectDayId: -1,
  location: {},
  isPublic: false,
};

export default compose(
  withStyles(styles, { name: 'TabTimeLine' }),
  withRouter,
  resaga(CONFIG),
)(TabChecklistView);
