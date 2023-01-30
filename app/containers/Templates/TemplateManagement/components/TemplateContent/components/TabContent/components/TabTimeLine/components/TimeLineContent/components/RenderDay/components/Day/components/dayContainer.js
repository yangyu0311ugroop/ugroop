import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import {
  withStyles,
  ExpansionPanelSummary,
  ExpansionPanel,
} from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import SingleDayEventWithEventIds from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/Day/components/SingleDayEventList/singleDayEventWithEventIds';
import Form from 'ugcomponents/Form';
import Checklists from 'smartComponents/Node/components/Checklists';
import Collapse from '@material-ui/core/Collapse';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { STRING_HELPERS } from 'utils/stringAdditions';
import Icon from 'ugcomponents/Icon';

import ChecklistIcon from 'smartComponents/Node/components/ChecklistIcon';
import { ICON_BUTTON } from 'appConstants';
import { ability } from 'apis/components/Ability/ability';
import { CHECKLIST } from 'utils/modelConstants';
import { dayContainerStyle } from './style';
import { CONFIG } from './defines/containerConfig';
import DayContent from './dayContent';

export class DayContainer extends PureComponent {
  state = {
    open: false,
    expanded: false,
  };

  handleValidSubmit = formData => {
    this.props.toolBarFunc.update(formData);
  };

  isExpanded = () => {
    const { expanded } = this.state;

    return expanded;
  };

  expansionIcon = () => {
    const { checklistLength } = this.props;
    const text = `${LOGIC_HELPERS.ifElse(
      this.isExpanded(),
      'Hide',
      'Show',
    )} ${STRING_HELPERS.pluralise('Task', checklistLength || 1)}`;
    return (
      <span title={text}>
        <Icon size="small" icon="chevron-down" />
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

  canExecute = () => ability.can('execute', CHECKLIST);

  renderBody = () => {
    const {
      dayIndex,
      templateId,
      dayId,
      classes,
      editorMode,
      dayPhotoId,
      toolBarFunc,
      onTitleChange,
      onUrlChange,
      onRichContentTextChange,
      showEventDetail,
      isPublic,
      checklistLength,
      index,
      editing,
    } = this.props;
    const { open, expanded } = this.state;

    return (
      <GridContainer spacing={0}>
        <GridItem className={classes.grow}>
          <GridContainer
            direction="column"
            className={classes.root}
            spacing={0}
          >
            <DayContent
              id={dayId}
              templateId={templateId}
              dayId={dayId}
              dayPhotoId={dayPhotoId}
              index={dayIndex}
              editor={editorMode}
              onTitleChange={onTitleChange}
              onUrlChange={onUrlChange}
              onRichContentTextChange={onRichContentTextChange}
              toolBarFunc={toolBarFunc}
              isPublic={isPublic}
            />
            {!isPublic && checklistLength > 0 && this.canExecute() && (
              <GridContainer
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                <GridItem GridItem className={classes.normalWidth}>
                  <GridContainer
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <GridItem md={10} xs={10}>
                      <GridContainer
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        className={checklistLength > 0 && classes.checklist}
                      >
                        <ChecklistIcon
                          parentNodeId={dayId}
                          index={index}
                          checklistsClass={classes.checklists}
                          className={classes.checklistNoBorder}
                          isClick={this.renderOpenChecklist}
                          iconClass={classes.checklistDay}
                          showEmpty={false} //= {layout === DAY}
                          defaultShowChecklists={false} // ={layout === DAY && checklists.length > 0}
                          variant={ICON_BUTTON}
                          stopPropagation={false}
                          showChecklists={!open}
                        />
                      </GridContainer>
                    </GridItem>
                    <GridItem md={2} xs={2}>
                      <GridContainer justify="center" alignItems="flex-end">
                        <ExpansionPanel
                          className={classes.expansionPanel}
                          expanded={expanded}
                          onClick={this.toggleExpanded}
                        >
                          <ExpansionPanelSummary
                            expandIcon={this.expansionIcon()}
                          />
                        </ExpansionPanel>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem className={classes.normalWidth}>
                  <Collapse in={open}>
                    <Checklists
                      parentNodeId={dayId}
                      showChecklists
                      editing
                      showEmpty
                      isLayoutView
                      iconToggle={this.toggleExpanded}
                    />
                  </Collapse>
                </GridItem>
              </GridContainer>
            )}
            <SingleDayEventWithEventIds
              id={dayId}
              templateId={templateId}
              index={dayIndex}
              showEventDetail={showEventDetail}
              isPublic={isPublic}
              editing={editing}
            />
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  render() {
    const { editorMode, classes } = this.props;

    let renderBody = this.renderBody();

    if (editorMode) {
      renderBody = (
        <Form
          onValid={this.handleValid}
          onInvalid={this.handleInvalid}
          onValidSubmit={this.handleValidSubmit}
          className={classes.relative}
        >
          {renderBody}
        </Form>
      );
    }

    return <div className={classes.relative}>{renderBody}</div>;
  }
}

DayContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dayIndex: PropTypes.number.isRequired,
  toolBarFunc: PropTypes.object,
  editorMode: PropTypes.bool,
  dayId: PropTypes.number.isRequired,
  dayPhotoId: PropTypes.string,
  onTitleChange: PropTypes.func,
  onUrlChange: PropTypes.func,
  onRichContentTextChange: PropTypes.func,
  showEventDetail: PropTypes.bool,
  templateId: PropTypes.number,
  isPublic: PropTypes.bool,
  editing: PropTypes.bool,
  checklistLength: PropTypes.number,
  index: PropTypes.number,

  // resaga value
};

DayContainer.defaultProps = {};

export default compose(
  withStyles(dayContainerStyle, { name: 'DayContainer' }),
  resaga(CONFIG),
)(DayContainer);
