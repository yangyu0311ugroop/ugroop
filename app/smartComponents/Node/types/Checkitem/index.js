import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import {
  INSERT_TEMP_AFTER,
  INSERT_TEMP_BEFORE,
  NODE_API,
  UPDATE_NODE,
} from 'apis/constants';
import {
  AVATAR,
  BADGE,
  COMPRESSED,
  DEFAULT,
  EMPTY_RTE,
  LOGIC,
  NULL,
  OUTSTANDING,
  URL_HELPERS,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Checkbox, Menu, MenuItem } from 'components/material-ui/index';
import { DATASTORE_UTILS } from 'datastore/index';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import AddCheckitem from 'smartComponents/Node/components/Checklists/parts/AddCheckitem';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import CompletedBy from 'smartComponents/Node/parts/CompletedBy';
import Content from 'smartComponents/Node/parts/Content';
import Description from 'smartComponents/Node/parts/Description';
import Notes from 'smartComponents/Node/parts/Notes';
import { NODE_STATUS_HELPERS } from 'smartComponents/Node/parts/Status/helpers';
import { InlineButton } from 'ugcomponents/Buttons/index';
import Icon from 'ugcomponents/Icon/index';
import generateHash from 'utils/helpers/generateHash';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CHECKITEM, CHECKLISTS, TEMPLATE, DAY } from 'utils/modelConstants';
import uuidv4 from 'uuid/v4';
import { VARIANTS } from 'variantsConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { ConvertNextNode } from '../../logics';
import { CHECKITEMS_CONFIG, CONFIG } from './config';
import styles from './styles';

export class Checkitem extends PureComponent {
  state = {
    deleting: false,
    anchorEl: null,
    open: false,
    confirmDeleteDialogId: null,
  };

  componentWillMount = () => {
    this.checkItem = { type: CHECKITEM };
  };

  canDelete = () => {
    const { createdBy, readOnly } = this.props;
    return !readOnly && ability.can('execute', { type: CHECKITEM, createdBy });
  };

  isTemplate = () => [TEMPLATE, DAY].includes(this.props.parentType);

  canMove = () =>
    (this.props.editable || !this.isTemplate()) &&
    !this.props.readOnly &&
    ability.can('move', { type: CHECKITEM });

  confirmDelete = (nodeId, index, parent) => () => {
    const confirmDeleteDialogId = PORTAL_HELPERS.confirmDelete(
      {
        title: 'Delete',
        message: 'Are you sure you want to delete this task?',
        onConfirm: this.deleteNode(nodeId, index, parent),
      },
      this.props,
    );

    this.setState({ confirmDeleteDialogId });
  };

  deleteNode = (nodeId, index, parent) => () => {
    this.setState({ deleting: true });

    return NODE_API_HELPERS.deleteNode(
      {
        nodeId,
        parent,
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

  toggleStatusStoreValue = () => {
    const { me, status } = this.props;

    const node = CHECKLIST_HELPERS.toggleStatus(
      { status, type: CHECKITEM },
      { me },
    );

    this.props.resaga.setValue({ node: DATASTORE_UTILS.upsertObject(node) });

    return node;
  };

  toggleStatus = () => {
    const { debounceMs } = this.props;

    const node = this.toggleStatusStoreValue();

    if (!this.debouncedSetValue) {
      this.debouncedSetValue = debounce(this.updateNode, debounceMs);
    }
    // will debounce 1000 ms
    this.debouncedSetValue(node);
  };

  updateNode = node => {
    const { id } = this.props;

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        manuallySetValue: true, // flag, tell the api component to not apply value to store after success
        nodeId: id,
        node,
      },
    });
  };

  isCompleted = () => {
    const { status } = this.props;

    return NODE_STATUS_HELPERS.isCompleted(status);
  };

  hasNotes = () => this.props.notes && this.props.notes !== EMPTY_RTE;

  hasDescription = () =>
    this.props.description && this.props.description !== EMPTY_RTE;

  hasSomeData = () => {
    const { dueDate, completedBy } = this.props;

    return (
      Boolean(completedBy) ||
      Boolean(dueDate) ||
      this.hasDescription() ||
      this.hasNotes()
    );
  };

  showDetail = () => {
    const { id, parentNodeId } = this.props;
    this.props.resaga.setValue({
      seeDetail: id,
      seeCheckItemParentId: parentNodeId,
    });
  };

  disabled = () => {
    const { id, creating } = this.props;
    const { deleting } = this.state;

    return !id || deleting || !this.canDelete() || creating;
  };

  tooltipText = fullName => `Completed by ${fullName}`;

  showAddItemOption = e => {
    e.preventDefault();
    if (!this.state.open) {
      this.setState({ open: true, anchorEl: e.currentTarget });
    }
  };

  handleRequestClose = () => {
    if (this.state.open) {
      this.setState({ open: false });
    }
  };

  generateHashkey = () => {
    const hashData = `${this.props.id}:${Date.now()}:${uuidv4()}`;
    const hashName = `${generateHash(hashData)}`;
    return hashName;
  };

  insertBefore = () => {
    this.props.resaga.dispatchTo(NODE_API, INSERT_TEMP_BEFORE, {
      payload: {
        id: this.props.id,
        hashkey: this.generateHashkey(),
        node: {
          type: 'checkitem',
          status: 'new',
          content: 'Checklist Item',
        },
        parentId: this.props.parentNodeId,
        insertLocation: 'before',
        type: CHECKLISTS,
      },
      onSuccess: this.handleRequestClose(),
    });
  };

  insertAfter = () => {
    this.props.resaga.dispatchTo(NODE_API, INSERT_TEMP_AFTER, {
      payload: {
        id: this.props.id,
        hashkey: this.generateHashkey(),
        node: {
          type: 'checkitem',
          status: 'new',
          content: 'Checklist Item',
        },
        parentId: this.props.parentNodeId,
        insertLocation: 'after',
        type: CHECKLISTS,
      },
      onSuccess: this.handleRequestClose(),
    });
  };

  onClickDescription = event => event.stopPropagation();

  renderSub = () => {
    const { classes, id, showSecondary } = this.props;

    if (!this.hasSomeData() || !showSecondary) {
      return null;
    }

    const renderCompletedBy = (
      <CompletedBy id={id} variant={COMPRESSED} component={GridItem} />
    );

    return (
      <GridItem>
        <GridContainer
          className={classnames(
            classes.checkDescription,
            LOGIC_HELPERS.ifElse(this.isCompleted(), classes.done),
          )}
          onClick={this.showDetail}
          spacing={0}
        >
          {renderCompletedBy}
          {this.hasDescription() && (
            <GridItem xs={12}>
              <GridContainer alignItems="top" spacing={0}>
                <Description
                  id={id}
                  variant={BADGE}
                  component={GridItem}
                  useEditableRTE
                  componentProps={{ className: classes.badge }}
                  renderSeeMore
                  isCollapeSeeMore
                />
                <GridItem
                  onClick={this.onClickDescription}
                  className={classnames(classes.grow, classes.checkLabel)}
                >
                  <Description
                    id={id}
                    variant={BADGE}
                    component="span"
                    noPaddingBottom
                    renderSeeMore
                    isCollapeSeeMore
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          )}
          {this.hasNotes() && (
            <GridItem xs={12}>
              <GridContainer alignItems="top" spacing={0}>
                <Notes
                  id={id}
                  variant={BADGE}
                  component={GridItem}
                  componentProps={{ className: classes.badge }}
                />
                <GridItem
                  onClick={this.onClickDescription}
                  className={classnames(classes.grow, classes.checkLabel)}
                >
                  <Notes
                    id={id}
                    variant={BADGE}
                    component="span"
                    useEditableRTE={false}
                    noPaddingBottom
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  renderCompletedList = () => {
    const { id, showCompletedList } = this.props;

    if (!showCompletedList || !id) {
      return null;
    }

    return (
      <GridItem>
        <CompletedBy
          id={id}
          variant={AVATAR}
          tooltipText={this.tooltipText}
          bold
        />
      </GridItem>
    );
  };

  renderContentOnly = () => {
    const {
      classes,
      id,
      status,
      parentNodeId,
      deleting,
      showDelete,
      editingCheckItem,
      creating,
    } = this.props;

    const completed = this.isCompleted();

    return (
      <GridItem className={classes.checkItem}>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <GridContainer alignItems="top" spacing={0}>
              <GridItem>
                <Checkbox
                  disabled={this.disabled()}
                  onChange={this.toggleStatus}
                  checked={completed}
                  color="default"
                  checkedIcon={
                    <Icon
                      size="small"
                      icon="lnr-check-square"
                      className={classnames(
                        LOGIC_HELPERS.ifElse(
                          this.isCompleted(),
                          classes.checkDone,
                        ),
                      )}
                    />
                  }
                  icon={<Icon size="small" icon="lnr-square" />}
                  className={classes.checkBoxRoot}
                />
              </GridItem>
              <GridItem
                className={classnames(classes.grow, classes.checkLabel)}
                onClick={this.showDetail}
              >
                <Content id={id} disabled={this.disabled()} variant={status} />
              </GridItem>
              {this.renderCompletedList()}
              {showDelete && status !== 'completed' && this.canDelete() && (
                <GridItem>
                  <InlineButton
                    color="secondary"
                    onClick={this.showAddItemOption}
                    disabled={editingCheckItem || creating}
                  >
                    <Icon size="xsmall" icon="lnr-plus" />
                  </InlineButton>
                </GridItem>
              )}
              {showDelete && this.canDelete() && (
                <GridItem>
                  <InlineButton
                    color="secondary"
                    disabled={editingCheckItem || deleting || this.disabled()}
                    onClick={this.confirmDelete(id, parentNodeId)}
                  >
                    <Icon size="xsmall" icon="lnr-trash2" />
                  </InlineButton>
                </GridItem>
              )}
            </GridContainer>
          </GridItem>
          {this.renderSub()}
        </GridContainer>

        <Menu
          id="add-checkitem-options"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClick={this.handleRequestClose}
          onClose={this.handleRequestClose}
        >
          <MenuItem disableRipple className={classes.menuItemHeader}>
            <div className={classes.menuHeader}>Add..</div>
          </MenuItem>
          <MenuItem onClick={this.insertBefore}>
            Add a task before this one
          </MenuItem>
          <MenuItem onClick={this.insertAfter}>
            Add a task after this one
          </MenuItem>
        </Menu>
      </GridItem>
    );
  };

  renderContentDraggable = () => provided => {
    const {
      classes,
      id,
      parentNodeId,
      deleting,
      status,
      showDelete,
      editingCheckItem,
      index,
      checkitems,
      showOutstanding,
      showCompleted,
      creating,
    } = this.props;
    const completed = this.isCompleted();

    const action = this.isTemplate() ? (
      <GridItem>
        <Checkbox
          disabled={this.disabled()}
          onChange={this.toggleStatus}
          checked={completed}
          color="default"
          checkedIcon={
            <Icon
              size="small"
              icon="lnr-check-square"
              className={classnames(
                LOGIC_HELPERS.ifElse(this.isCompleted(), classes.checkDone),
              )}
            />
          }
          icon={<Icon size="small" icon="lnr-square" />}
          className={classes.checkBoxRoot}
        />
      </GridItem>
    ) : (
      <GridItem
        className={classes.badgeItem}
        onClick={this.showDetail}
      >{`${index + 1}. `}</GridItem>
    );

    let hideClass = '';
    if ((completed && !showCompleted) || (!completed && !showOutstanding)) {
      hideClass = classes.hidden;
    }

    const hideDragItem = LOGIC_HELPERS.ifElse(
      this.canMove() && checkitems.length,
      '',
      classes.hidden,
    );

    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        className={hideClass}
      >
        <GridItem className={classes.checkItem}>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <GridContainer alignItems="top" spacing={0}>
                {action}
                <GridItem
                  className={classnames(classes.grow, classes.checkLabel)}
                  onClick={this.showDetail}
                >
                  <Content
                    id={id}
                    disabled={this.disabled()}
                    variant={status}
                  />
                </GridItem>
                {this.renderCompletedList()}
                {showDelete && status !== 'completed' && this.canDelete() && (
                  <GridItem>
                    <InlineButton
                      color="secondary"
                      onClick={this.showAddItemOption}
                      disabled={editingCheckItem || creating}
                    >
                      <Icon size="xsmall" icon="lnr-plus" />
                    </InlineButton>
                  </GridItem>
                )}
                {showDelete && this.canDelete() && (
                  <GridItem>
                    <InlineButton
                      color="secondary"
                      disabled={editingCheckItem || deleting || this.disabled()}
                      onClick={this.confirmDelete(id, parentNodeId)}
                    >
                      <Icon size="xsmall" icon="lnr-trash2" />
                    </InlineButton>
                  </GridItem>
                )}
                <div
                  className={classnames(
                    classes.dragHandle,
                    classes.move,
                    hideDragItem,
                  )}
                  {...provided.dragHandleProps}
                >
                  <GridItem>
                    <Icon
                      size="small"
                      icon="lnr-move"
                      bold={!this.disabled()}
                      color={LOGIC_HELPERS.ifElse(
                        this.disabled(),
                        'disabled',
                        'grey',
                      )}
                    />
                  </GridItem>
                </div>
              </GridContainer>
            </GridItem>
            {this.renderSub()}
          </GridContainer>

          <Menu
            id="add-checkitem-options"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onClick={this.handleRequestClose}
            onClose={this.handleRequestClose}
          >
            <MenuItem disableRipple className={classes.menuItemHeader}>
              <div className={classes.menuHeader}>Add..</div>
            </MenuItem>
            <MenuItem onClick={this.insertBefore}>
              Add a task before this one
            </MenuItem>
            <MenuItem onClick={this.insertAfter}>
              Add a task after this one
            </MenuItem>
          </Menu>
        </GridItem>
      </div>
    );
  };

  renderDefault = () => {
    const {
      id,
      // showCompleted,
      // showOutstanding,
      index,
      parentId,
      lastNodeId,
      insertLocation,
      history,
      creating,
    } = this.props;

    // const completed = this.isCompleted();

    /* if (completed && !showCompleted) {
      return null;
    }
    if (!completed && !showOutstanding) {
      return null;
    } */

    if (typeof id === 'string') {
      return (
        <AddCheckitem
          parentNodeId={parentId}
          lastNodeId={lastNodeId}
          insertLocation={insertLocation}
          hashkey={id}
        />
      );
    }

    if (history.location.pathname === URL_HELPERS.index()) {
      return <React.Fragment>{this.renderContentOnly()}</React.Fragment>;
    }

    return (
      <Draggable
        draggableId={id}
        type="CHECKITEM"
        index={index}
        isDragDisabled={LOGIC_HELPERS.ifElse(
          this.isTemplate(),
          !this.props.editable,
          creating,
        )}
      >
        {this.renderContentDraggable()}
      </Draggable>
    );
  };

  // does not render anything, but the lifecycle logic still works
  renderNull = () => null;

  renderLogic = () => {
    const { id, parentNodeId } = this.props;
    return (
      <Fragment>
        <ConvertNextNode id={id} parentNodeId={parentNodeId} />
      </Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [LOGIC]: this.renderLogic,
      [VARIANTS.TABLE]: this.renderNull,
      [NULL]: this.renderNull,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Checkitem.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  parentNodeId: PropTypes.number,
  showCompleted: PropTypes.bool,
  showOutstanding: PropTypes.bool,
  showDelete: PropTypes.bool,
  showSecondary: PropTypes.bool,
  showCompletedList: PropTypes.bool,
  debounceMs: PropTypes.number,
  index: PropTypes.number,

  // resaga props
  status: PropTypes.string,
  dueDate: PropTypes.object,
  description: PropTypes.string,
  notes: PropTypes.string,
  completedBy: PropTypes.number,
  me: PropTypes.number,
  createdBy: PropTypes.number,
  parentId: PropTypes.number,
  lastNodeId: PropTypes.number,
  insertLocation: PropTypes.string,
  editingCheckItem: PropTypes.bool,
  editable: PropTypes.bool,
  checkitems: PropTypes.array,
  parentType: PropTypes.string,
  readOnly: PropTypes.bool,
  // isLoading
  deleting: PropTypes.bool,
  creating: PropTypes.bool,
};

Checkitem.defaultProps = {
  variant: '',
  parentNodeId: 0,
  id: 0,
  showCompleted: false,
  showCompletedList: false,
  showDelete: true,
  showOutstanding: true,
  showSecondary: true,
  debounceMs: 1000,

  status: OUTSTANDING,
  description: '',
  notes: '',
  completedBy: 0,
  me: 0,
  createdBy: 0,
  editingCheckItem: false,

  deleting: false,
  creating: false,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'Checkitem' }),
  resaga(CONFIG),
  resaga(CHECKITEMS_CONFIG),
)(Checkitem);
