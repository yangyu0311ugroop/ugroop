import { withStyles } from '@material-ui/core/styles';
import { Can } from 'apis/components/Ability/components/Can';
import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import Scroll, { scroller } from 'react-scroll';
import DATASTORE_UTILS from 'datastore/utils';
import {
  MOVE_NODE_AFTER,
  MOVE_NODE_BEFORE,
  NODE_API,
  UPDATE_NODE,
} from 'apis/constants';
import {
  CLOSED,
  DEFAULT,
  NULL,
  OPTION,
  REMAINING,
  TITLE,
  ADD_CHECKLIST,
  CHECK_INPUT,
  ICON_BUTTON,
  TOTAL,
  COMPRESSED,
} from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import tabs from 'datastore/templateManagementStore/helpers/tabs';
import { get, last, first } from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { compose } from 'redux';
import resaga from 'resaga';
import Node from 'smartComponents/Node';
import SortByMenu from 'smartComponents/Node/components/Checklists/components/SortByMenu';
import OpenClosed from 'smartComponents/Node/logics/OpenClosed';
import Description from 'smartComponents/Node/parts/Description';
import SortBy from 'smartComponents/Node/logics/SortBy';
import { BadgeProgress, Content } from 'smartComponents/Node/parts';
import { InlineButton } from 'ugcomponents/Buttons';
import Icon from 'viewComponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import AddCheckGroup from 'containers/ChecklistsRoute/components/MyChecklists/components/AddCheckGroup';
// import Checkbox from 'ugcomponents/Inputs/CheckboxField';
import { Checkbox } from 'components/material-ui/index';
import {
  CHECKITEM,
  CHECKLIST,
  CHECKLISTS,
  TEMPLATE,
  DAY,
  TOUR,
} from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { H3, H5 } from 'viewComponents/Typography';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import { Hidden } from '@material-ui/core';
import JText from 'components/JText';
import { scrollOptions } from 'utils/constant';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { CHECKITEMS_CONFIG, CONFIG, PARENT_CONFIG } from './config';
import AddCheckitem from './parts/AddCheckitem';
import Checkitems from './parts/Checkitems';
import Progress from './parts/Progress';
import styles from './styles';

export class Checklists extends PureComponent {
  state = {
    showChecklists: this.props.showChecklists,
    opened: true,
    selectedId: [],
    confirmDeleteDialogId: null,
  };

  outlineButtonProps = { variant: 'outline', color: 'black' };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.showChecklists !== nextProps.showChecklists &&
      nextProps.showChecklists !== this.state.showChecklists
    ) {
      this.setState({ showChecklists: nextProps.showChecklists });
    }
  }

  confirmDelete = e => {
    const confirmDeleteDialogId = PORTAL_HELPERS.confirmDelete(
      {
        title: 'Delete',
        message: 'Are you sure you want to delete this group?',
        onConfirm: this.deleteNode(e),
      },
      this.props,
    );

    this.setState({ confirmDeleteDialogId });
  };

  onDragEnd = id => data => {
    const { destination, source, reason } = data;
    const sourceIndex = get(source, 'index', -1);
    const destinationIndex = get(destination, 'index', -1);

    if (
      destinationIndex === -1 ||
      reason === 'CANCEL' ||
      sourceIndex === destinationIndex
    )
      return false;

    this.updateServer(sourceIndex, destinationIndex, id);
    this.updateStore(sourceIndex, destinationIndex, id);

    return true;
  };

  updateServer = (source, destination, id) => {
    const { checklists, checkItems } = this.props;

    const ACTION = destination < source ? MOVE_NODE_BEFORE : MOVE_NODE_AFTER;

    const checklistArr = checklists
      .map((checklist, index) => ({
        id: checklist,
        checkItems: checkItems[index],
      }))
      .filter(arg => arg.id === id);

    this.props.resaga.dispatchTo(NODE_API, ACTION, {
      payload: {
        id: get(checklistArr[0].checkItems, destination),
        toBeMovedId: get(checklistArr[0].checkItems, source),
        tabId: id,
        children: checklists,
      },
    });
  };

  updateStore = (source, destination, id) =>
    this.props.resaga.setValue({
      nodes: tabs.moveChildren(id, source, destination, CHECKLISTS),
    });

  toggleChecklists = () =>
    this.setState(({ showChecklists }) => ({
      showChecklists: !showChecklists,
    }));

  toggleShowClosed = event => {
    const { stopPropogateShowClose } = this.props;
    if (!stopPropogateShowClose) event.stopPropagation();
    const { remainingChecklist, parentNodeId, showClosed } = this.props;
    if (remainingChecklist.length === 0 && !showClosed) {
      this.props.resaga.setValue({
        showClosed: DATASTORE_UTILS.upsertObject({
          [parentNodeId]: { showClosed: !showClosed },
        }),
      });
      this.setState({ opened: true });
    } else {
      // this.setState(({ showClosed }) => ({ showClosed: !showClosed }));
      this.props.resaga.setValue({
        showClosed: DATASTORE_UTILS.upsertObject({
          [parentNodeId]: { showClosed: !showClosed },
        }),
      });
    }
  };

  canUpdate = () => {
    const { createdBy, readOnly } = this.props;
    return !readOnly && ability.can('update', { type: CHECKLIST, createdBy });
  };

  addChecklist = event => {
    const { stopPropagation } = this.props;
    if (stopPropagation) event.stopPropagation();

    const { parentNodeId } = this.props;

    this.props.resaga.setValue({ addChecklistParentId: parentNodeId });
  };

  deleteNode = event => () => {
    event.stopPropagation();

    const { parentNodeId, parentParentNodeId } = this.props;

    return NODE_API_HELPERS.deleteNode(
      {
        nodeId: parentNodeId,
        parent: parentParentNodeId,
        childKey: CHECKLISTS,
        onSuccess: this.deleteSuccess,
      },
      this.props,
    );
  };

  deleteSuccess = () => {
    const { confirmDeleteDialogId } = this.state;

    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);
  };

  renderAddCheckItem = (id, checklists) => {
    const { createdBy, editingCheckItem, readOnly } = this.props;

    if (editingCheckItem || readOnly) {
      return null;
    }

    return (
      <Can do="create" on={{ type: CHECKITEM, createdBy }}>
        <AddCheckitem parentNodeId={id} lastNodeId={last(checklists)} />
      </Can>
    );
  };

  renderBodyContent = ({
    variant,
    id,
    checklists,
    showCompleted,
    showOutstanding,
    anchorDate,
    type,
    readOnly,
  }) => provided => (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <Checkitems
        variant={variant}
        parentNodeId={id}
        checklists={checklists}
        showCompleted={showCompleted}
        showOutstanding={showOutstanding}
        anchorDate={anchorDate}
        parentType={type}
        readOnly={readOnly}
      />
      {provided.placeholder}
    </div>
  );

  toggleNode = ({ id, status }) => () => {
    const { me } = this.props;

    const node = CHECKLIST_HELPERS.toggleStatus(
      { id, status, type: CHECKLIST },
      { me },
    );

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: { nodeId: id, node },
    });
  };

  renderButtons = ({ id, status }) => {
    const action = LOGIC_HELPERS.ifElse(
      status === CLOSED,
      'Reopen',
      'Close Checklist',
    );
    return (
      <GridContainer alignItems="center" spacing={0}>
        <Can do="create" on={CHECKLIST}>
          <GridItem xs={12}>
            <Button
              size="small"
              {...this.outlineButtonProps}
              dense
              onClick={this.toggleNode({ id, status })}
            >
              {action}
            </Button>
          </GridItem>
        </Can>
      </GridContainer>
    );
  };

  isTemplate = () => [DAY, TOUR, TEMPLATE].includes(this.props.type);

  renderBody = (
    { id, checklists, selected, expanded, readOnly },
    { showCompleted, showOutstanding, expandedState },
    { toggleShowCompleted, toggleShowOutstanding },
  ) => {
    const { classes, anchorDate, type } = this.props;

    const variant = LOGIC_HELPERS.ifElse(!(expandedState || expanded), NULL);
    return (
      <Fragment>
        <Progress
          id={id}
          selected={selected}
          showCompleted={showCompleted}
          showOutstanding={showOutstanding}
          toggleShowCompleted={toggleShowCompleted}
          toggleShowOutstanding={toggleShowOutstanding}
          completedMessageClassName={classes.completedMessage}
          variant={LOGIC_HELPERS.ifElse(!this.isTemplate(), TOTAL)}
        />
        <DragDropContext onDragEnd={this.onDragEnd(id)}>
          <Droppable droppableId="checklist-droppable" type="CHECKLIST">
            {this.renderBodyContent({
              variant,
              id,
              checklists,
              showCompleted,
              showOutstanding,
              anchorDate,
              type,
              readOnly,
            })}
          </Droppable>
        </DragDropContext>
        {this.renderAddCheckItem(id, checklists)}
      </Fragment>
    );
  };

  renderContentOverview = (id, index) => {
    const { expandedChecklistId, classes } = this.props;
    return (
      <GridItem>
        <GridContainer wrap="nowrap">
          <GridItem>
            <JText
              sm
              gray // >={this.props.expandedChecklistId !== id}
              ellipsis
              link
              onClick={this.toggleChecklist(id)}
              className={expandedChecklistId === id && classes.active}
            >
              {`${index + 1}. `}
              <Content id={id} variant={VARIANTS.TEXT_ONLY} showTooltip />
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderAsIconButton = ({ id }) => data => (
    <GridItem>
      <BadgeProgress
        id={id}
        variant={ICON_BUTTON}
        onClick={this.toggleChecklist(id)}
        iconLabel={data}
        icon="ug-pin-3"
        isSelected={id === this.props.expandedChecklistId}
      />
    </GridItem>
  );

  renderSortedChecklists = (
    {
      parentNodeId,
      anchorDate,
      expandedChecklistId,
      remainingChecklist = [],
      readOnly,
      useExpandedState,
    },
    { showClosed },
  ) => ({ ids, sortedIds }) => {
    const sortedOpen = showClosed
      ? sortedIds
      : sortedIds.filter(id => remainingChecklist.includes(id));
    const selectedId = first(sortedOpen);

    const content = sortedIds.map(id => (
      <Node
        expanded={id === expandedChecklistId}
        showClosed={showClosed}
        key={id}
        id={id}
        parentNodeId={parentNodeId}
        index={ids.indexOf(id)}
        renderBody={this.renderBody}
        type={CHECKLIST}
        anchorDate={anchorDate}
        renderFooter={this.renderButtons}
        editing={this.props.editing}
        toggleNode={this.toggleNode}
        readOnly={readOnly}
        useExpandedState={useExpandedState}
      />
    ));
    this.toggleCurrentChecklist(selectedId);
    return content;
  };

  toggleCurrentChecklist = id => {
    if (!this.state.opened) return;
    this.props.resaga.setValue({
      expandedChecklistId: id,
    });
    this.setState({ opened: false });
  };

  toggleChecklist = id => e => {
    e.stopPropagation();
    const { isClick, parentNodeId, expandedChecklistId } = this.props;
    LOGIC_HELPERS.ifElse(typeof isClick === 'function' && isClick());

    const expandedId = id === expandedChecklistId ? 0 : id;

    this.props.resaga.setValue({
      expandedChecklistId: expandedId,
      expandedParentChecklistId: parentNodeId,
    });
    return scroller.scrollTo(parentNodeId, scrollOptions);
  };

  renderSortedIcons = (
    {
      expandedChecklistId = [],
      showAsContent = false,
      remainingChecklist = [],
    },
    { showClosed },
  ) => ({ sortedIds }) => {
    const sortedOpen = showClosed
      ? sortedIds
      : sortedIds.filter(id => remainingChecklist.includes(id));
    /*    const selectedId = first(sortedOpen);
    this.toggleCurrentChecklist(selectedId); */
    return (
      <GridContainer direction={LOGIC_HELPERS.ifElse(showAsContent, 'column')}>
        {!!sortedOpen.length &&
          sortedOpen.map(
            (id, index) =>
              id &&
              (showAsContent ? (
                this.renderContentOverview(id, index)
              ) : (
                <Content id={id} variant={VARIANTS.RENDER_PROP}>
                  {this.renderAsIconButton({
                    id,
                    expandedChecklistId,
                  })}
                </Content>
              )),
          )}
        {this.renderAddIconButton(showAsContent)}
      </GridContainer>
    );
  };

  renderBlankslate = () => {
    const { classes, isLayoutView, type } = this.props;
    const action = isLayoutView ? (
      <JText lg italic gray>
        {LOGIC_HELPERS.ifElse(
          type === TEMPLATE,
          'There are no checklists yet',
          'There are no checklists on this day yet',
        )}
        <Can do="create" on={CHECKLIST}>
          <React.Fragment>
            {', '}
            <JText link onClick={this.addChecklist}>
              click to add
            </JText>
          </React.Fragment>
        </Can>
      </JText>
    ) : (
      <Can do="create" on={CHECKLIST}>
        <Button
          color="primary"
          size="xs"
          dense
          onClick={this.addChecklist}
          className={classes.smallText}
        >
          <Hidden xsDown>Add Checklist</Hidden>
          <Hidden smUp>Add</Hidden>
        </Button>
      </Can>
    );
    return (
      <div className={classes.blankslate}>
        {!isLayoutView && (
          <React.Fragment>
            <GridContainer direction="column" alignItems="center" spacing={1}>
              <GridItem className={classes.iconContainer}>
                <GridItem>
                  <Icon icon="ug-post-it-blank-1" size="xl" color="gray" />
                </GridItem>
              </GridItem>
            </GridContainer>
            <H3 className={classes.heading}>There are no Checklists here</H3>
            <H5 className={classes.subheading}>Add a new Checklist</H5>
          </React.Fragment>
        )}
        <GridItem>{action}</GridItem>
      </div>
    );
  };

  renderContent = () => {
    const {
      classes,
      checklists,
      parentNodeId,
      anchorDate,
      expandedChecklistId,
      remainingChecklist,
      renderBlankSlate,
      type,
      readOnly,
      showClosed,
      useExpandedState,
    } = this.props;
    const { showChecklists } = this.state;

    if (!showChecklists) {
      return null;
    }

    if (!checklists.length) {
      if (renderBlankSlate) {
        return (
          <GridItem className={classnames(classes.contentGrid)}>
            {this.renderBlankslate()}
          </GridItem>
        );
      }

      return null;
    }

    const sortedContent = (
      <GridItem className={classnames(classes.contentGrid)}>
        <SortBy parentNodeId={parentNodeId} ids={checklists} type={type}>
          {this.renderSortedChecklists(
            {
              parentNodeId,
              anchorDate,
              expandedChecklistId,
              remainingChecklist,
              readOnly,
              useExpandedState,
            },
            { showClosed },
          )}
        </SortBy>
      </GridItem>
    );
    return sortedContent;
  };

  renderIconButtons = (showAsContent = false) => {
    const {
      className,
      content,
      checklists,
      showEmpty,
      classes,
      parentNodeId,
      expandedChecklistId,
      remainingChecklist,
      type,
      showClosed,
    } = this.props;

    if (!content && !checklists.length && !showEmpty) {
      return null;
    }
    return (
      <GridContainer direction="column" spacing={0} className={className}>
        <GridItem className={classnames(classes.contentGridNoBackground)}>
          <SortBy parentNodeId={parentNodeId} ids={checklists} type={type}>
            {this.renderSortedIcons(
              { expandedChecklistId, showAsContent, remainingChecklist },
              { showClosed },
            )}
          </SortBy>
        </GridItem>
        <GridItem>
          {this.renderClosedButton({ labelClass: classes.toggleSimple })}
        </GridItem>
      </GridContainer>
    );
  };

  renderChecklists = () => {
    const {
      className,
      content,
      checklists,
      showEmpty,
      parentNodeId,
    } = this.props;

    if (!content && !checklists.length && !showEmpty) {
      return null;
    }

    return (
      <Scroll.Element name={parentNodeId}>
        <GridContainer direction="column" spacing={0} className={className}>
          <GridItem>{this.renderHeader()}</GridItem>
          {this.renderContent()}
        </GridContainer>
      </Scroll.Element>
    );
  };

  renderToggleClosedButton = ({ closed }) => {
    const { showClosed, variant, classes } = this.props;

    if (!closed) {
      return null;
    }

    return (
      <InlineButton color="secondary" onClick={this.toggleShowClosed}>
        <Hidden xsDown>
          <span
            className={LOGIC_HELPERS.ifElse(
              variant === ICON_BUTTON,
              classes.closeButton,
              '',
            )}
          >
            {LOGIC_HELPERS.ifElse(
              showClosed,
              `Hide completed (${closed})`,
              `Show completed (${closed})`,
            )}
          </span>
        </Hidden>
        <Hidden smUp>
          <span>
            {LOGIC_HELPERS.ifElse(
              showClosed,
              'Hide completed',
              'Show completed',
            )}
          </span>
        </Hidden>
      </InlineButton>
    );
  };

  renderToggleSortBy = () => {
    const { parentNodeId, checklists } = this.props;
    const { showChecklists } = this.state;

    if (!showChecklists || checklists.length < 2) {
      return null;
    }

    return (
      <GridItem>
        <SortByMenu
          parentNodeId={parentNodeId}
          showList
          isTemplate={this.isTemplate()}
        />
      </GridItem>
    );
  };

  checklistText = count =>
    LOGIC_HELPERS.ifElse(count > 1, 'checklists', 'checklist');

  renderAddIconButton = showAsContent => {
    const { classes } = this.props;
    if (showAsContent) return this.renderAddButton();
    return (
      <Can do="create" on={CHECKLIST}>
        <GridItem>
          <Button
            color="inline"
            size="xs"
            onClick={this.addChecklist}
            buttonTitle="Add Checklist"
            className={classes.addButton}
          >
            <GridContainer alignItems="center" spacing={0}>
              <GridItem>
                <Icon icon="ug-post-it-blank-1" size="extraSmall" />
              </GridItem>
              <div className={classes.plusIcon}>
                <Icon icon="lnr-plus" bold />
              </div>
            </GridContainer>
          </Button>
        </GridItem>
      </Can>
    );
  };

  renderEditButton = () => {
    const { showChecklists } = this.state;
    const { checklists, renderBlankSlate } = this.props;
    if (!showChecklists || (renderBlankSlate && !checklists.length)) {
      return null;
    }
    return (
      <GridItem>
        <InlineButton onClick={this.addChecklist}>
          <Icon size="xsmall" icon="lnr-pencil" />
        </InlineButton>
      </GridItem>
    );
  };

  renderAddButton = simple => {
    const { showChecklists } = this.state;
    const { classes, checklists, renderBlankSlate, readOnly } = this.props;
    if (
      !showChecklists ||
      (renderBlankSlate && !checklists.length) ||
      readOnly
    ) {
      return null;
    }
    if (simple)
      return (
        <GridItem>
          <InlineButton onClick={this.addChecklist} title="Add Checklist">
            <Icon size="xsmall" icon="lnr-plus" />
          </InlineButton>
        </GridItem>
      );
    return (
      <Can do="create" on={CHECKLIST}>
        <GridItem className={classes.addLeftPaddingChecklist}>
          <Button
            color="primary"
            size="xs"
            dense
            onClick={this.addChecklist}
            className={classes.smallText}
          >
            <Hidden xsDown>Add Checklist</Hidden>
            <Hidden smUp>Add</Hidden>
          </Button>
        </GridItem>
      </Can>
    );
  };

  renderEditGroupButton = () => {
    const { parentNodeId, parentParentNodeId } = this.props;
    const { showChecklists } = this.state;
    if (!showChecklists) {
      return null;
    }
    return (
      <AddCheckGroup parentNodeId={parentParentNodeId} id={parentNodeId} />
    );
  };

  renderDeleteButton = () => {
    const { classes } = this.props;
    const { showChecklists } = this.state;

    if (!showChecklists) {
      return null;
    }

    return (
      <GridItem
        className={classnames(
          LOGIC_HELPERS.ifElse(showChecklists, classes.grow),
        )}
      >
        <InlineButton
          onClick={this.confirmDelete}
          title="delete checklist group"
        >
          <Icon size="xsmall" icon="lnr-trash2" />
        </InlineButton>
      </GridItem>
    );
  };

  renderClosedButton = () => {
    const { parentNodeId, showClosed } = this.props;
    const { showChecklists } = this.state;

    if (!showChecklists || !this.isTemplate()) {
      return null;
    }

    return (
      <GridItem>
        <OpenClosed id={parentNodeId} showClosed={showClosed}>
          {this.renderToggleClosedButton}
        </OpenClosed>
      </GridItem>
    );
  };

  renderHeaderMaster = () => {
    const { classes, parentNodeId, iconToggle, checklists } = this.props;
    const { showChecklists } = this.state;

    return (
      <GridContainer spacing={0} direction="column">
        <GridItem>
          <GridContainer
            alignItems="center"
            className={classnames(
              classes.status,
              classes.padding,
              LOGIC_HELPERS.ifElse(
                showChecklists,
                classes.statusExpanded,
                classes.statusCollapsed,
              ),
            )}
            spacing={0}
          >
            <GridItem className={classnames(classes.content, classes.grow)}>
              <GridContainer
                alignItems="left"
                spacing={0}
                wrap="nowrap"
                direction="column"
              >
                <GridItem>
                  <GridContainer alignItems="top" spacing={0} wrap="nowrap">
                    <GridItem>
                      <Icon
                        size="small"
                        icon="lnr-folder"
                        className={classes.folderIcon}
                      />
                    </GridItem>
                    <GridItem
                      className={classes.contentEdit}
                      onClick={iconToggle || this.toggleChecklists}
                    >
                      <GridContainer direction="column" spacing={0}>
                        <GridItem>
                          <Content
                            id={parentNodeId}
                            variant={TITLE}
                            multiline
                            stopPropagation
                            editable={this.canUpdate()}
                          />
                        </GridItem>
                        <GridItem>
                          <Description
                            id={parentNodeId}
                            variant={COMPRESSED}
                            showHeader={false}
                            fullWidth
                            stopPropagation
                          />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <Can do="create" on={CHECKLIST}>
                      <React.Fragment>
                        <GridItem>{this.renderEditGroupButton()}</GridItem>
                        <GridItem>{this.renderDeleteButton()}</GridItem>
                        {this.renderAddButton(true)}
                      </React.Fragment>
                    </Can>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
            {this.renderClosedButton()}
          </GridContainer>
        </GridItem>
        {!!checklists.length && (
          <GridItem className={classes.headerToggleSort}>
            <GridContainer justify="space-between" spacing={0}>
              <Hidden smDown>
                <GridItem className={classes.firtColumnHeaderMaster} />
              </Hidden>
              <GridItem className={classes.taskHeaderMaster}>
                <b>
                  {checklists.length} {this.checklistText(checklists.length)}
                </b>
              </GridItem>
              {this.renderToggleSortBy()}
            </GridContainer>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderHeader = () => {
    const {
      classes,
      content,
      checklists,
      iconToggle,
      isLayoutView,
    } = this.props;
    const { showChecklists } = this.state;

    if (!checklists.length && isLayoutView) return null;

    if (content) {
      return this.renderHeaderMaster();
    }

    return (
      <GridContainer
        alignItems="center"
        className={classnames(
          classes.status,
          classes.padding,
          LOGIC_HELPERS.ifElse(
            showChecklists,
            classes.statusExpanded,
            classes.statusCollapsed,
          ),
        )}
        spacing={0}
        onClick={iconToggle || this.toggleChecklists}
      >
        <GridItem className={classes.grow}>
          <BadgeProgress id={checklists} variant={REMAINING} />
        </GridItem>
        {this.renderClosedButton()}
        {this.renderToggleSortBy()}
        {this.renderAddButton()}
      </GridContainer>
    );
  };

  renderOption = () => {
    const { variant, checklists, parentNodeId } = this.props;

    if (!checklists.length) {
      return null;
    }

    return checklists.map((id, index) => (
      <Node
        variant={variant}
        key={id}
        id={id}
        parentNodeId={parentNodeId}
        index={index}
      />
    ));
  };

  selectoptionValue = id => () => {
    const { selectedId } = this.state;
    const index = selectedId.includes(id);
    let ids = selectedId;
    if (index) {
      ids = selectedId.filter(val => val !== id);
    } else {
      ids = selectedId.concat([id]);
    }
    return this.setState({ selectedId: ids });
  };

  renderMultiOption = () => {
    const { checklists, parentNodeId, classes } = this.props;

    if (!checklists.length) {
      return null;
    }
    const { onChange, selectedChecklists } = this.props;
    return checklists.map((id, index) => {
      const label = (
        <div key={id}>
          <Node
            variant={VARIANTS.TEXT_ONLY}
            key={id}
            id={id}
            parentNodeId={parentNodeId}
            index={index}
          />
        </div>
      );
      const checked = selectedChecklists.some(val => val.id === id);
      return (
        <GridContainer alignItems="top" wrap="nowrap">
          <GridItem>
            <Checkbox
              noMargin
              name={id}
              label={label}
              color="default"
              checked={checked}
              onChange={onChange({
                id,
                label,
                groupId: parentNodeId,
                checklists,
              })}
              className={classes.checkBoxRoot}
              checkedIcon={<Icon size="small" icon="lnr-check-square" />}
              icon={<Icon size="small" icon="lnr-square" />}
              inputProps={{ id, checked }}
            />
          </GridItem>
          <GridItem>{label}</GridItem>
        </GridContainer>
      );
    });
  };

  onScroll = id => () => {
    const {
      expandedChecklistId,
      checklists,
      expandedParentChecklistId,
    } = this.props;
    if (expandedParentChecklistId === id) {
      return scroller.scrollTo(id, scrollOptions);
    }
    if (checklists.length && !checklists.includes(expandedChecklistId)) {
      this.props.resaga.setValue({
        expandedParentChecklistId: id,
        expandedChecklistId: checklists[0],
      });
    } else {
      this.props.resaga.setValue({
        expandedParentChecklistId: id,
      });
    }

    return scroller.scrollTo(id, scrollOptions);
  };

  renderSubDetail = () =>
    // const { checklists } = this.props;
    LOGIC_HELPERS.ifElse(
      /*
      checklists.length,
      <>
        <b>{checklists.length}</b> Checklists
      </> */ null,
      'There are no Checklists here',
    );

  renderList = () => {
    const {
      content,
      checklists,
      showEmpty,
      classes,
      parentNodeId,
      showIconAsContent,
      expandedParentChecklistId,
    } = this.props;
    if (!content && !checklists.length && !showEmpty) {
      return null;
    }
    const isSelected = parentNodeId === expandedParentChecklistId;
    return (
      <GridContainer
        direction="column"
        spacing={0}
        className={classnames(classes.item, isSelected && classes.selected)}
        onClick={this.onScroll(parentNodeId)}
      >
        <GridItem>
          <GridContainer wrap="nowrap" alignItems="center">
            <GridItem>
              <Icon size="xs" icon="lnr-folder" />
            </GridItem>
            <GridItem>
              <JText ellipsis bold className={classes.contentList}>
                {content}
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem className={classes.listPrefix}>
          {this.renderSubDetail()}
        </GridItem>
        <GridItem>{this.renderIconButtons(showIconAsContent)}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [OPTION]: this.renderOption,
      [ADD_CHECKLIST]: this.renderAddIconButton,
      [ICON_BUTTON]: this.renderIconButtons,
      [CHECK_INPUT]: this.renderMultiOption,
      [VARIANTS.LIST_ONLY]: this.renderList,
      [DEFAULT]: this.renderChecklists,
      [VARIANTS.READ_ONLY]: this.renderChecklists,
    });
  };
}

Checklists.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  content: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  anchorDate: PropTypes.string,
  parentNodeId: PropTypes.number,
  parentParentNodeId: PropTypes.number,
  showChecklists: PropTypes.bool,
  showEmpty: PropTypes.bool,
  iconToggle: PropTypes.func,
  editing: PropTypes.bool,
  renderBlankSlate: PropTypes.bool,
  isLayoutView: PropTypes.bool,
  onChange: PropTypes.func,
  selectedChecklists: PropTypes.array,
  showIconAsContent: PropTypes.bool,

  // resaga props
  checklists: PropTypes.array,
  checkItems: PropTypes.array,
  expandedChecklistId: PropTypes.number,
  createdBy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  editingCheckItem: PropTypes.bool,
  me: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  remainingChecklist: PropTypes.array,
  stopPropagation: PropTypes.bool,
  type: PropTypes.string,
  overviewLayout: PropTypes.string,
  isClick: PropTypes.func,
  readOnly: PropTypes.bool,
  showClosed: PropTypes.bool,
  stopPropogateShowClose: PropTypes.bool,
  useExpandedState: PropTypes.bool,
  expandedParentChecklistId: PropTypes.number,
};

Checklists.defaultProps = {
  content: '',
  variant: '',
  className: '',
  anchorDate: '',
  parentNodeId: 0,
  parentParentNodeId: 0,
  showChecklists: false,
  renderBlankSlate: false,

  checklists: [],
  expandedChecklistId: 0,
  createdBy: 0,
  remainingChecklist: [],
  stopPropagation: true,
  isLayoutView: false,
  overviewLayout: '',
  selectedChecklists: [],
  readOnly: false,
  showClosed: false,
  stopPropogateShowClose: false,
  useExpandedState: false,
};

export default compose(
  withStyles(styles, { name: 'Checklists' }),
  resaga(PARENT_CONFIG),
  resaga(CONFIG),
  resaga(CHECKITEMS_CONFIG),
)(Checklists);
