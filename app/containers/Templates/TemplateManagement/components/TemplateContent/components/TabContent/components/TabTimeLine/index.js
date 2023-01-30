import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import { ability } from 'apis/components/Ability/ability';
import { ICON_BUTTON } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  withStyles,
} from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { compose } from 'redux';
import resaga from 'resaga';

import ChecklistIcon from 'smartComponents/Node/components/ChecklistIcon';
import Checklists from 'smartComponents/Node/components/Checklists';
import Description from 'smartComponents/Node/parts/Description';
import MiniCalendar from 'smartComponents/Node/parts/StartDate/components/MiniCalendar';
import EventsWithoutDay from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/EventsWithoutDay';
import Headx from 'ugcomponents/Headx';
import Icon from 'ugcomponents/Icon';
import { scrollOptions, templateDayIdAnchor } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { parseQueryParam } from 'utils/helpers/url';
import { TEMPLATE, CHECKLIST } from 'utils/modelConstants';

import { STRING_HELPERS } from 'utils/stringAdditions';
import TimeLineContent from './components/TimeLineContent';
import { CONFIG } from './config';
import styles from './styles';

export class TabTimeLine extends PureComponent {
  state = {
    open: false,
    expanded: false,
  };

  isExpanded = () => {
    const { expanded } = this.state;

    return expanded;
  };

  expansionIcon = () => {
    const { checklists } = this.props;
    const text = `${LOGIC_HELPERS.ifElse(
      this.isExpanded(),
      'Hide',
      'Show',
    )} ${STRING_HELPERS.pluralise('Task', checklists.length || 1)}`;
    return (
      <span title={text}>
        <Icon size="xsmall" icon="chevron-down" />
      </span>
    );
  };

  toggleExpanded = () => {
    this.setState(prevState => ({
      open: !prevState.open,
      expanded: !prevState.expanded,
    }));
  };

  renderOpenChecklist = () => {
    this.setState({ open: true });
  };

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

  canExecute = () => ability.can('execute', CHECKLIST);

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

  renderChecklists = () => {
    const { templateId, classes, checklists } = this.props;
    const { expanded, open } = this.state;
    return (
      <GridContainer
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <GridItem className={classes.normalWidth}>
          <GridContainer
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            card
            dense
            spacing={0}
          >
            <GridItem md={10} xs={10} style={{ padding: '10px 5px' }}>
              <ChecklistIcon
                parentNodeId={templateId}
                className={classes.checklistNoBorder}
                isClick={this.renderOpenChecklist}
                showEmpty //= {layout === DAY}
                defaultShowChecklists // ={layout === DAY && checklists.length > 0}
                variant={ICON_BUTTON}
                showChecklists={!open}
              />
            </GridItem>
            <GridItem md={2} xs={2} style={{ paddingRight: '12px' }}>
              {checklists.length > 0 && (
                <ExpansionPanel
                  className={classes.expansionPanel}
                  expanded={expanded}
                  onClick={this.toggleExpanded}
                >
                  <ExpansionPanelSummary expandIcon={this.expansionIcon()} />
                </ExpansionPanel>
              )}
            </GridItem>
          </GridContainer>
        </GridItem>
        {checklists.length > 0 && (
          <GridItem className={classes.normalWidth}>
            <Collapse in={open}>
              <Checklists
                parentNodeId={templateId}
                showChecklists
                editing
                showEmpty
                isLayoutView
                iconToggle={this.toggleExpanded}
              />
            </Collapse>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  render = () => {
    const { classes, templateId, id, isPublic } = this.props;

    const editable = this.canEdit();

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
          renderSeeMore={!isPublic}
          isCollapeSeeMore={!isPublic}
        >
          {this.renderDescription}
        </Description>
        {!isPublic && this.canExecute() && (
          <GridItem>{this.renderChecklists()}</GridItem>
        )}
        <Hidden mdUp>
          <GridItem>
            <div className={classes.marginTop}>
              <GridContainer
                card
                direction="column"
                spacing={0}
                alignItems="center"
              >
                <GridItem>
                  <MiniCalendar templateId={templateId} tabId={id} />
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>
          <GridItem className={classes.eventNodaySx}>
            <EventsWithoutDay
              templateId={templateId}
              tabId={id}
              smDown
              maxContent={2}
            />
          </GridItem>
        </Hidden>
        <GridItem className={classes.contentWidth}>
          <TimeLineContent
            fetching={this.props.fetching}
            isMoving={this.props.isMoving}
            origin={this.props.tabChildrenData}
            id={this.props.id}
            templateId={templateId}
            isPublic={isPublic}
          />
        </GridItem>
      </GridContainer>
    );
  };
}

TabTimeLine.propTypes = {
  id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  templateId: PropTypes.number,
  resaga: PropTypes.object,
  isMoving: PropTypes.bool,
  fetching: PropTypes.bool,
  editable: PropTypes.bool,
  isPublic: PropTypes.bool,
  tabChildrenData: PropTypes.array,
  selectDayId: PropTypes.number,
  location: PropTypes.object,
  checklists: PropTypes.array,
};

TabTimeLine.defaultProps = {
  selectDayId: -1,
  location: {},
  isPublic: false,
  checklists: [],
};

export default compose(
  withStyles(styles, { name: 'TabTimeLine' }),
  withRouter,
  resaga(CONFIG),
)(TabTimeLine);
