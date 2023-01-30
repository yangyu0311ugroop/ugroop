import { Hidden } from '@material-ui/core';
import { MOVE_NODE_AFTER, MOVE_NODE_BEFORE, NODE_API } from 'apis/constants';
import { CONTENT, HIDDEN } from 'appConstants';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import UGDialogAction from 'components/Dialog/UGDialogAction';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import tabs from 'datastore/templateManagementStore/helpers/tabs';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import resaga from 'resaga';
import DraggableNode from 'smartComponents/Node/components/DraggableNode';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import TabAccess from 'smartComponents/Node/types/TabOther/components/TabAccess';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import Icon from 'ugcomponents/Icon';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { parseQueryParam } from 'utils/helpers/url';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';
import EditTab from './components/EditTab/index';

export class ManageTabs extends PureComponent {
  state = {};

  componentWillMount = () => {
    this.dialogProps = { onEscapeKeyDown: this.handleClose };
  };

  onDragStart = () => {
    this.setState({ dragStarted: true });
  };

  onDragEnd = ({ destination, source, reason }) => {
    const { children } = this.props;

    let sourceIndex = get(source, 'index', -1);
    let destinationIndex = get(destination, 'index', -1);

    if (
      destinationIndex === -1 ||
      reason === 'CANCEL' ||
      sourceIndex === destinationIndex
    )
      return false;

    const availableChildren = this.availableChildren();

    const sourceId = availableChildren[sourceIndex];
    const destinationId = availableChildren[destinationIndex];

    sourceIndex = children.indexOf(sourceId);
    destinationIndex = children.indexOf(destinationId);

    this.setState({
      dragStarted: false,
    });

    this.updateServer(sourceIndex, destinationIndex);
    this.updateStore(sourceIndex, destinationIndex);

    return true;
  };

  // real source index and destination index in the full tab ids array
  updateServer = (source, destination) => {
    const { id, children } = this.props;

    const ACTION = LOGIC_HELPERS.ifElse(
      destination < source,
      MOVE_NODE_BEFORE,
      MOVE_NODE_AFTER,
    );

    this.props.resaga.dispatchTo(NODE_API, ACTION, {
      payload: {
        id: get(children, destination),
        toBeMovedId: get(children, source),
        tabId: id,
        children, // for revert purpose when something goes wrong
      },
    });
  };

  movingNode = () => {
    const { movingNodeBefore, movingNodeAfter } = this.props;

    return movingNodeBefore || movingNodeAfter;
  };

  isDragDisabled = () => this.movingNode();

  updateStore = (source, destination) => {
    const { id } = this.props;

    this.props.resaga.setValue({
      nodes: tabs.moveChildren(id, source, destination),
    });

    this.changeTab(source, destination);
  };

  activeId = () => {
    const { location, visibleChildren } = this.props;

    const { search } = location;
    const parsedQuery = parseQueryParam(search);

    if (parsedQuery.tabId) {
      return parseInt(parsedQuery.tabId, 10);
    }

    const activeTab = parseInt(parsedQuery.tab || 0, 10);
    return visibleChildren[activeTab];
  };

  // real source index and destination index in the full tab ids array
  changeTab = (source, destination) => {
    const { children, visibleChildren } = this.props;

    const sourceId = children[source];
    const destinationId = children[destination];

    const availableChildren = this.availableChildren();
    const sourceIndex = availableChildren.indexOf(sourceId);
    const destinationIndex = availableChildren.indexOf(destinationId);

    const activeId = this.activeId();

    const remove = [
      ...availableChildren.slice(0, sourceIndex),
      ...availableChildren.slice(sourceIndex + 1),
    ];

    const newChildren = [
      ...remove.slice(0, destinationIndex),
      sourceId,
      ...remove.slice(destinationIndex),
    ];

    const newVisibleChildren = newChildren.reduce((accu, tab) => {
      if (visibleChildren.indexOf(tab) === -1) return accu;

      return accu.concat(tab);
    }, []);

    this.goToTab(newVisibleChildren.indexOf(activeId));
  };

  availableChildren = () => {
    const { children, visibleChildren, privateIds, hiddenIds } = this.props;

    return children.reduce((accu, id) => {
      if (visibleChildren.indexOf(id) !== -1) return accu.concat(id);
      if (privateIds.indexOf(id) !== -1) return accu.concat(id);
      if (hiddenIds.indexOf(id) !== -1) return accu.concat(id);

      return accu;
    }, []);
  };

  handleVisibilitySuccess = (id, status) => {
    const { visibleChildren } = this.props;
    const children = this.availableChildren();

    const activeId = this.activeId();

    // hiding
    if (status === HIDDEN) {
      const newVisibleChildren = visibleChildren.reduce((accu, tab) => {
        if (tab === id) return accu;

        return accu.concat(tab);
      }, []);

      return this.goToTab(newVisibleChildren.indexOf(activeId));
    }

    // showing
    const newVisibleChildren = children.reduce((accu, tab) => {
      if (tab === id || visibleChildren.indexOf(tab) !== -1)
        return accu.concat(tab);

      return accu;
    }, []);

    return this.goToTab(newVisibleChildren.indexOf(activeId));
  };

  goToTab = index => {
    const { history, location } = this.props;
    const { pathname } = location;

    const goToIndex = LOGIC_HELPERS.ifElse(index > -1, index, 0);

    return history.push(`${pathname}?tab=${goToIndex}`);
  };

  goToTabId = id => () => {
    const { visibleChildren, history, location } = this.props;
    const { pathname } = location;

    const tabIndex = visibleChildren.indexOf(id);
    if (tabIndex !== -1) {
      return history.push(`${pathname}?tab=${tabIndex}`);
    }

    return history.push(`${pathname}?tabId=${id}`);
  };

  handleClose = (event, reason) => {
    const { dragStarted } = this.state;

    // if dragging, cancel drag first
    if (dragStarted && reason === 'escapeKeyDown') {
      return null;
    }

    if (this.movingNode()) {
      return null;
    }

    return PORTAL_HELPERS.close(this.props);
  };

  renderDraggableContent = (provided, props, snapshot) => {
    const { classes } = this.props;
    const { dragStarted } = this.state;

    const { id, index, active } = props;
    const { isDragging } = snapshot;

    return (
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <GridContainer
          alignItems="center"
          spacing={0}
          wrap="nowrap"
          onClick={!active && this.goToTabId(id)}
        >
          <GridItem xs>
            <div
              className={classnames(
                classes.item,
                LOGIC_HELPERS.ifElse(
                  [!dragStarted, !this.movingNode()],
                  classes.itemHover,
                ),
                LOGIC_HELPERS.ifElse(active, classes.itemActive),
                LOGIC_HELPERS.ifElse(isDragging, classes.dragging),
              )}
            >
              <GridContainer
                direction="column"
                spacing={0}
                className={classnames(
                  LOGIC_HELPERS.ifElse(
                    this.isDragDisabled(),
                    LOGIC_HELPERS.ifElse(
                      this.movingNode(),
                      classes.dragDisabled,
                    ),
                    classes.dragHandle,
                  ),
                )}
                {...provided.dragHandleProps}
              >
                <GridItem>
                  <GridContainer alignItems="center">
                    <GridItem className={classes.index}>{index + 1}</GridItem>
                    <GridItem>
                      <Hidden smDown>
                        <NodeProp
                          id={id}
                          valueKey={CONTENT}
                          isCustomData={false}
                          editable={false}
                          ellipsis
                          ellipsisClassName={classes.menuItem}
                        />
                      </Hidden>
                      <Hidden mdUp>
                        <NodeProp
                          id={id}
                          valueKey={CONTENT}
                          isCustomData={false}
                          editable={false}
                          ellipsis
                          ellipsisClassName={classes.menuItemXs}
                        />
                      </Hidden>
                    </GridItem>

                    <GridItem xs />
                    {/* {![galleryId, timelineId].includes(id) && (
                      <TabAccess
                        id={id}
                        simple
                        editable
                        showPublic
                        component={GridItem}
                        variant={ACCESS_VARIANTS.printMode}
                      />
                    )} */}
                    <GridItem>
                      <EditTab id={id} />
                    </GridItem>
                    <TabAccess
                      id={id}
                      simple
                      editable
                      showPublic
                      component={GridItem}
                    />
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  renderRow = (id, index) => (
    <GridItem key={id}>
      <DraggableNode
        id={id}
        active={this.activeId() === id}
        index={index}
        editable
        isDragDisabled={this.isDragDisabled()}
      >
        {this.renderDraggableContent}
      </DraggableNode>
    </GridItem>
  );

  renderDroppableContent = () => {
    const children = this.availableChildren();

    return children.map((id, index) =>
      this.renderRow(id, index, index > 0 && children[index - 1]),
    );
  };

  renderDroppable = () => provided => (
    <div {...provided.droppableProps} ref={provided.innerRef}>
      {this.renderDroppableContent()}
      {provided.placeholder}
    </div>
  );

  renderContent = () => {
    const { classes, id } = this.props;
    const { dragStarted } = this.state;

    const children = this.availableChildren();

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <div className={classnames(classes.reorderHeader)}>
            <GridContainer alignItems="center" justify="center">
              <GridItem className={classnames(classes.minIconWidth)}>
                {this.movingNode() ? (
                  <LoadingText />
                ) : (
                  <Icon size="small" icon="lnr-move" bold color="grey" />
                )}
              </GridItem>
              <GridItem className={classes.minDragWidth}>
                {LOGIC_HELPERS.ifElse(
                  this.movingNode(),
                  'Moving tab',
                  'Drag to reorder',
                )}
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>

        <GridItem>
          <GridContainer alignItems="center" justify="center">
            <GridItem>
              <div
                className={classnames(
                  classes.reorderContent,
                  LOGIC_HELPERS.ifElse(
                    dragStarted,
                    classes.reorderContentDragging,
                  ),
                )}
              >
                <GridContainer direction="column" wrap="nowrap" spacing={0}>
                  <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd}
                  >
                    <Droppable
                      droppableId={`managetabs-droppable-${id}`}
                      type="SECTION"
                    >
                      {this.renderDroppable(children)}
                    </Droppable>
                  </DragDropContext>
                </GridContainer>
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>
          <div className={classes.subtitle}>
            <GridContainer alignItems="center" justify="center">
              <GridItem>
                Everyone in this tour can see public tabs. Tour owner and
                organisers can change the accessibility of tabs.
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>
    );
  };

  renderSaveCancelButton = () => (
    <GridContainer alignItems="center">
      <GridItem xs />

      <GridItem>
        <Button
          size="xs"
          color="primary"
          onClick={this.handleClose}
          disabled={this.movingNode()}
        >
          Finish
        </Button>
      </GridItem>
    </GridContainer>
  );

  render = () => (
    <Dialog maxWidth="xs" fullWidth open onClose={this.handleClose}>
      <DialogTitle noPaddingBottom>
        <Title heading="Manage Tabs" />
        <CloseButton onClick={this.handleClose} />
      </DialogTitle>
      <DialogContent halfPaddingTop noPaddingBottom>
        {this.renderContent()}
      </DialogContent>
      <UGDialogAction bgColor>{this.renderSaveCancelButton()}</UGDialogAction>
    </Dialog>
  );
}

ManageTabs.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
  children: PropTypes.array,
  visibleChildren: PropTypes.array,
  privateIds: PropTypes.array,
  hiddenIds: PropTypes.array,
  updatingNode: PropTypes.bool,
  movingNodeBefore: PropTypes.bool,
  movingNodeAfter: PropTypes.bool,
  timelineId: PropTypes.number,
  galleryId: PropTypes.number,

  // customisable props
};

ManageTabs.defaultProps = {
  children: [],
  visibleChildren: [],
  privateIds: [],
  hiddenIds: [],
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'ManageTabs' }),
  resaga(CONFIG),
)(ManageTabs);
