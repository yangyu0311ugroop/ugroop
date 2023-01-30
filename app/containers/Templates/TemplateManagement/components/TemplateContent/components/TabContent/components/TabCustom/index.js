import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { MOVE_NODE_AFTER, MOVE_NODE_BEFORE, NODE_API } from 'apis/constants';
import { CONTENT, DEFAULT } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import { Hidden } from 'components/material-ui';
import DeleteTab from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabHeader/components/DeleteTab';
import tabs from 'datastore/templateManagementStore/helpers/tabs';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { withRouter } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import resaga from 'resaga';
import DraggableNode from 'smartComponents/Node/components/DraggableNode';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Description from 'smartComponents/Node/parts/Description';
import Heading from 'smartComponents/Node/parts/Heading';
import TabAccess from 'smartComponents/Node/types/TabOther/components/TabAccess';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ACTIVITY, TAB_OTHER, TAB_PEOPLE } from 'utils/modelConstants';
import Button from 'viewComponents/Button';

import TabPeople from './components/TabPeople';
import Empty from './components/Empty';
import Overview from './components/Overview';
import Section from './components/Section';
import TabOption from './components/TabOption';
import { CONFIG } from './config';
import styles from './styles';

export class TabCustom extends PureComponent {
  state = {};

  canEdit = () => {
    const { editable } = this.props;

    return editable && ability.can('execute', TAB_OTHER);
  };

  onDragEnd = ({ destination, source, reason }) => {
    const sourceIndex = get(source, 'index', -1);
    const destinationIndex = get(destination, 'index', -1);

    if (
      destinationIndex === -1 ||
      reason === 'CANCEL' ||
      sourceIndex === destinationIndex
    )
      return false;

    this.updateServer(sourceIndex, destinationIndex);
    this.updateStore(sourceIndex, destinationIndex);

    return true;
  };

  updateServer = (source, destination) => {
    const { id, sectionIds } = this.props;

    const ACTION = destination < source ? MOVE_NODE_BEFORE : MOVE_NODE_AFTER;

    this.props.resaga.dispatchTo(NODE_API, ACTION, {
      payload: {
        id: get(sectionIds, destination),
        toBeMovedId: get(sectionIds, source),
        tabId: id,
        children: sectionIds, // for revert purpose when something goes wrong
      },
    });
  };

  updateStore = (source, destination) => {
    const { id } = this.props;

    return this.props.resaga.setValue({
      tabs: tabs.moveChildren(id, source, destination),
    });
  };

  handleClick = selectedId => () => {
    const { offset } = this.props;

    if (offset) return null;

    // on select if section is a card (not offset)
    return this.props.resaga.setValue({ selectedId });
  };

  renderContentDraggable = (sectionId, index, sectionIds) => (
    provided,
    { editing, editable },
  ) => {
    const { id, isPrint, elevation } = this.props;

    return (
      <GridItem onClick={this.handleClick(sectionId)}>
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <GridContainer direction="column">
            <Heading
              id={sectionId}
              first={index === 0}
              component={GridItem}
              editing={editing}
              typeLabelHeader="Section"
              // noHeading={type !== TAB_OTHER}
            />
            <GridItem>
              <Section
                id={sectionId}
                tabId={id}
                ids={sectionIds}
                dragHandleProps={provided.dragHandleProps}
                isPublic={this.props.isPublic}
                isPrint={isPrint}
                elevation={elevation}
                editing={editing}
                editable={editable}
              />
            </GridItem>
          </GridContainer>
          {provided.placeholder}
        </div>
      </GridItem>
    );
  };

  renderContent = sectionIds => {
    const { editing, editable } = this.props;

    const sections = sectionIds.map((sectionId, index) => (
      <DraggableNode
        key={sectionId}
        id={sectionId}
        index={index}
        editing={editing}
        editable={editable}
      >
        {this.renderContentDraggable(sectionId, index, sectionIds)}
      </DraggableNode>
    ));

    return <GridContainer direction="column">{sections}</GridContainer>;
  };

  renderDroppable = sectionIds => provided => (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      {this.renderContent(sectionIds)}
      {provided.placeholder}
    </div>
  );

  renderOverview = ids => {
    const { id, isPublic, tabPrint, templateId } = this.props;

    return (
      <Overview
        header="Contents"
        parentId={id}
        ids={ids}
        type={ACTIVITY}
        showEmpty
        placeholder="No sections yet"
        isPublic={isPublic}
        tabPrint={tabPrint}
        templateId={templateId}
      />
    );
  };

  canShowTabAccess = () => {
    const { editable } = this.props;
    return editable && ability.can('execute', TAB_OTHER);
  };

  renderSubtitle = () => {
    const { classes, id, templateId } = this.props;

    const canEdit = this.canEdit();

    return (
      ability.can('execute', TAB_OTHER) && (
        <GridItem>
          <div
            className={classnames(
              classes.placeholder,
              LOGIC_HELPERS.ifElse(
                ability.can('execute', TAB_OTHER),
                classes.offsetLeft,
              ),
            )}
          >
            <GridContainer alignItems="center" spacing={0}>
              {this.canShowTabAccess() && (
                <TabAccess
                  id={id}
                  editable={ability.can('execute', TAB_OTHER)}
                  component={GridItem}
                />
              )}
              {/* <TabAccess
                id={id}
                editable={ability.can('execute', TAB_OTHER)}
                component={GridItem}
                variant={ACCESS_VARIANTS.printMode}
              /> */}
              {canEdit && (
                <React.Fragment>
                  <GridItem>
                    <Button
                      size="xs"
                      color="black"
                      className={classnames(classes.routeButton)}
                      onClick={this.openDeleteTab}
                    >
                      <Icon icon="lnr-trash2" size="xsmall" />
                    </Button>
                  </GridItem>
                  <GridItem>
                    <TabOption templateId={templateId} id={id} />
                  </GridItem>
                </React.Fragment>
              )}
            </GridContainer>
          </div>
        </GridItem>
      )
    );
  };

  renderDescription = ({ content }) =>
    content && (
      <>
        <Hr half />
        {content}
      </>
    );

  renderAbout = () => {
    const { id, classes } = this.props;

    return (
      <GridItem>
        <GridContainer card direction="column" spacing={0}>
          {this.canEdit() ? (
            <>
              <GridItem>
                <GridContainer alignItems="center" spacing={0} noWrap>
                  <GridItem className={classes.grow}>
                    <div className={classes.content}>
                      <NodeProp
                        id={id}
                        valueKey={CONTENT}
                        isCustomData={false}
                        editable={this.canEdit()}
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </GridItem>
              {this.renderSubtitle()}
            </>
          ) : (
            <GridItem>
              <GridContainer
                alignItems="row"
                spacing={0}
                justify="space-between"
                noWrap
              >
                <GridItem>
                  <GridContainer alignItems="center" spacing={0}>
                    <GridItem className={classes.grow}>
                      <div className={classes.content}>
                        <NodeProp
                          id={id}
                          valueKey={CONTENT}
                          isCustomData={false}
                          editable={this.canEdit()}
                        />
                      </div>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                {this.renderSubtitle()}
              </GridContainer>
            </GridItem>
          )}
          <Description id={id} component={GridItem} editable={this.canEdit()}>
            {this.renderDescription}
          </Description>
        </GridContainer>
      </GridItem>
    );
  };

  renderRightColumn = (ids = []) => {
    const { classes, showOverview } = this.props;

    return (
      showOverview && (
        <Hidden xsDown>
          <GridItem className={classes.right}>
            <GridContainer direction="column" spacing={2}>
              {this.renderAbout()}
              <GridItem>
                <Sticky
                  top={78}
                  id="section-overview"
                  enabled
                  enableTransforms={false}
                >
                  {this.renderOverview(ids)}
                </Sticky>
              </GridItem>
            </GridContainer>
          </GridItem>
        </Hidden>
      )
    );
  };

  openDeleteTab = () => this.setState({ deleteTab: true });

  closeDialog = key => this.setState({ [key]: false });

  deleteSuccess = () => {
    const { id, tabIds } = this.props;

    const index = tabIds.indexOf(id);

    // delete last tab
    if (index === tabIds.length - 1) {
      this.handleTabChange({}, index - 1);
    }
  };

  handleTabChange = (event, index = 0) => {
    const { history, location } = this.props;

    const { pathname } = location;

    return history.push(`${pathname}?tab=${index}`);
  };

  renderDialogs = () => {
    const { id, templateId } = this.props;

    const { deleteTab } = this.state;

    return (
      <>
        <DeleteTab
          tabId={id}
          templateId={templateId}
          open={deleteTab}
          onClose={this.closeDialog}
          onSuccess={this.deleteSuccess}
        />
      </>
    );
  };

  renderTabPeople = () => (
    <TabPeople id={this.props.id} isPublic={this.props.isPublic} />
  );

  renderDefault = () => {
    const {
      classes,
      id,
      sectionIds,
      pubSectionIds,
      offset,
      fetching,
      showOverview,
      showEmpty,
      component: Component,
    } = this.props;

    const ids =
      (sectionIds.length && sectionIds) ||
      (pubSectionIds.length && pubSectionIds) ||
      [];

    if (!showOverview && !showEmpty && !ids.length) return null;

    return (
      <Component>
        <div className={classnames(classes.root, offset && classes.offset)}>
          <GridContainer wrap="nowrap" spacing={2}>
            {this.renderRightColumn(ids)}
            <GridItem className={classes.grow}>
              <GridContainer direction="column">
                {showOverview && (
                  <Hidden smUp>
                    <GridItem>{this.renderAbout()}</GridItem>
                  </Hidden>
                )}
                {showOverview && (
                  <Hidden smUp>
                    <GridItem>{this.renderOverview(ids)}</GridItem>
                  </Hidden>
                )}

                {!sectionIds.length && showEmpty ? (
                  <GridItem>
                    <Empty id={id} fetching={fetching} />
                  </GridItem>
                ) : (
                  <GridItem>
                    <GridContainer direction="column">
                      <GridItem>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                          <Droppable
                            droppableId="customTab-droppable"
                            type="SECTION"
                          >
                            {this.renderDroppable(ids)}
                          </Droppable>
                        </DragDropContext>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                )}
              </GridContainer>
            </GridItem>
          </GridContainer>

          {this.renderDialogs()}
        </div>
      </Component>
    );
  };

  render = () => {
    const { serverError, subtype } = this.props;

    if (serverError) {
      return <div>{serverError}</div>;
    }

    return LOGIC_HELPERS.switchCase(subtype, {
      [TAB_PEOPLE]: this.renderTabPeople,
      [DEFAULT]: this.renderDefault,
    });
  };
}

TabCustom.propTypes = {
  // hoc props
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // tab id
  templateId: PropTypes.number,
  fetching: PropTypes.bool,
  offset: PropTypes.bool,
  serverError: PropTypes.string,
  isPublic: PropTypes.bool,
  isPrint: PropTypes.bool,
  showInsertSection: PropTypes.bool,
  showOverview: PropTypes.bool,
  showEmpty: PropTypes.bool,
  editing: PropTypes.bool,
  elevation: PropTypes.number,
  tabPrint: PropTypes.bool,
  component: PropTypes.string,

  // resaga props
  type: PropTypes.string,
  isPrivate: PropTypes.bool,
  editable: PropTypes.bool,
  sectionIds: PropTypes.array,
  tabIds: PropTypes.array,
  pubSectionIds: PropTypes.array,
  subtype: PropTypes.string,
};

TabCustom.defaultProps = {
  fetching: false,
  sectionIds: [],
  tabIds: [],
  pubSectionIds: [],
  serverError: '',
  isPublic: false,
  isPrint: false,
  showInsertSection: false,
  showEmpty: true,
  elevation: 0,
  subtype: '',

  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'TabCustom' }),
  withRouter,
  resaga(CONFIG),
)(TabCustom);
