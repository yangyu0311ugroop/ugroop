import { Hidden } from '@material-ui/core';
import { ability } from 'apis/components/Ability/ability';
import { Can } from 'apis/components/Ability/components/Can';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import {
  CREATE_CHILD,
  CREATE_NEXT_NODE,
  DELETE_CHILDREN,
  NODE_API,
  UPDATE_NODE,
} from 'apis/constants';
import { DO_NOTHING_FUNC, NONE, STARTDATE, WEEK_DAY } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import MenuItemButton from 'containers/Templates/TemplateManagement/components/Event/components/Buttons/components/MenuItemButton';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { DATA_HELPERS } from 'datastore/utils';
import { some } from 'lodash';
import momentjs from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { scroller } from 'react-scroll/modules';
import { compose } from 'redux';
import resaga from 'resaga';
import InsertNode from 'smartComponents/Node/components/InsertNode';
import Dialog from 'ugcomponents/Dialog';
import Icon from 'ugcomponents/Icon';
import { SNACKBAR_HELPER } from 'ugcomponents/SnackBar/helpers';
import { scrollFurtherOptions } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  ACTIVITY,
  CHECKLIST,
  DAY,
  EVENT,
  TEMPLATE,
} from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { CONFIG, TEMPLATE_ID_CONFIG } from './config';
import styles from './styles';

export class ActionButtons extends PureComponent {
  state = {
    deleteDialog: false,
  };

  componentWillMount = () => {
    this.dialogProps = {
      onEscapeKeyDown: this.closeDeleteDialog,
    };
  };

  canExecute = () =>
    some(
      [
        ability.can('create', CHECKLIST),
        ability.can('create', EVENT),
        ability.can('create', ACTIVITY),
      ],
      Boolean,
    );

  openComment = () => {
    const { id, index, dateTitle } = this.props;

    this.props.resaga.setValue({
      nodeId: id,
      nodeStore: 'days',
      nodeData: { index: index + 1, date: dateTitle },
    });
  };

  addNewSection = () => {
    const { id, activityIds } = this.props;

    const length = activityIds.length;
    if (activityIds && length > 0) {
      this.props.resaga.dispatchTo(NODE_API, CREATE_NEXT_NODE, {
        payload: {
          nodeId: activityIds[length - 1],
          templateId: id,
          node: {
            type: ACTIVITY,
            previousNode: activityIds[length - 1],
            nextNodes: [],
          },
        },
        onSuccess: this.addSectionSuccess,
      });
    } else {
      this.props.resaga.dispatchTo(NODE_API, CREATE_CHILD, {
        payload: {
          node: { type: ACTIVITY, parentNodeId: this.props.id },
          nodeId: id,
          nextNodes: [],
          keyPath: `${this.props.id}.children`,
        },
        onSuccess: this.addSectionSuccess,
      });
    }
  };

  addSectionSuccess = ({ node: { id } }) => {
    const { editing } = this.props;

    if (!editing) {
      this.props.resaga.setValue({ editing: true });
    }

    this.scrollTo = setTimeout(this.handleClick(id), 100);

    setTimeout(() => {
      SNACKBAR_HELPER.openSuccessSnackbar(
        'Your section has been added at the end of this day and you can reorder at anytime.',
        this.props.resaga,
      );
    }, 150);
  };

  addNewEvent = () => {
    const { id } = this.props;

    this.props.resaga.setValue({
      eventCreate: EVENT_STORE_HELPERS.setEventCreate(true, id),
    });
  };

  addNewChecklist = () => {
    const { id } = this.props;

    this.props.resaga.setValue({ addChecklistParentId: id });
  };

  handleClick = selectedId => () => {
    scroller.scrollTo(`scroller-node-${selectedId}`, {
      ...scrollFurtherOptions,
      // offset: -50,
    });
  };

  toggleEditing = () => {
    this.props.resaga.setValue({ editing: DATA_HELPERS.toggle });
  };

  handleCreateSuccess = ({ node: { id } }) => {
    this.props.resaga.setValue({ selectedId: id });
    this.scrollTo = setTimeout(this.handleClick(id), 100);
  };

  updateTimes = () => {
    const { tabId } = this.props;

    NODE_API_HELPERS.getTreeAndTimes(
      { id: tabId },
      { resaga: this.props.resaga },
    );
  };

  changeStartDate = node => {
    const { templateId } = this.props;

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: templateId,
        node,
      },
      onSuccess: this.updateTimes,
    });
  };

  handleChangeStartDate = () => {
    const { startDate, displayDate, weekDay } = this.props;

    if (displayDate === NONE) {
      return null;
    }

    if (displayDate === STARTDATE) {
      const start = momentjs(startDate).add(1, 'day');

      const node = {
        type: TEMPLATE,
        customData: {
          startDate: start.toISOString(),
          weekDay: null,
          displayDate: STARTDATE,
        },
      };

      return this.changeStartDate(node);
    }

    if (displayDate === WEEK_DAY) {
      const newWeekDay = (weekDay + 1) % 7;

      const node = {
        type: TEMPLATE,
        customData: {
          startDate: null,
          weekDay: newWeekDay,
          displayDate: WEEK_DAY,
        },
      };

      return this.changeStartDate(node);
    }

    return false;
  };

  handleDeleteDay = () => {
    const {
      id,
      tabId,
      index,
      firstChild,
      prevSelectedId,
      nextSelectedId,
    } = this.props;

    if (id === firstChild) {
      // deleting first day, move the start date forward 1 day
      this.handleChangeStartDate();
    }

    this.props.resaga.dispatchTo(NODE_API, DELETE_CHILDREN, {
      payload: {
        nodeId: id,
        keyPath: `${tabId}.children`,
        selectedId: nextSelectedId || prevSelectedId,
      },
      onSuccess: this.handleDeleteDaySuccess(index > 0),
    });
  };

  handleDeleteDaySuccess = shouldGetTimes => (_, { selectedId }) => {
    const { tabId } = this.props;
    this.closeDeleteDialog();

    if (selectedId) {
      this.props.resaga.setValue({ selectedId });
    }

    if (shouldGetTimes) {
      NODE_API_HELPERS.getTreeAndTimes({ id: tabId }, this.props);
    }
  };

  openDeleteDialog = () => this.setState({ deleteDialog: true });

  closeDeleteDialog = () => this.setState({ deleteDialog: false });

  canInlineEdit = () =>
    ability.can('update', DAY) || ability.can('update', ACTIVITY);

  renderDeleteDayDialog = () => {
    const { title } = this.props;
    const { deleteDialog } = this.state;

    return (
      <Dialog
        template="delete"
        open={deleteDialog}
        confirmFunc={this.handleDeleteDay}
        cancelFunc={this.closeDeleteDialog}
        headlineTitle={title || 'Delete Day'}
        dialogTitle="Delete Day"
        muiDialogProps={this.dialogProps}
      />
    );
  };

  renderUpdateInfoButton = ({ openMenu, open }) => {
    const { classes } = this.props;

    return (
      <Button
        noMargin
        dense
        size="extraSmall"
        variant={VARIANTS.OUTLINE}
        onClick={openMenu}
        className={classes.actionButton}
        buttonTitle="Insert a day or add new content to this day"
      >
        <Icon
          icon="lnr-plus"
          size="small"
          className={classnames(
            classes.icon,
            LOGIC_HELPERS.ifElse(open, classes.rotate45),
          )}
        />
      </Button>
    );
  };

  renderInsertAbove = props => (
    <MenuItem {...props}>Insert a day above</MenuItem>
  );

  renderInsertBelow = props => (
    <MenuItem {...props}>Insert a day below</MenuItem>
  );

  openAddEvent = ({ type, subtype } = {}) => () => {
    const { templateId, tabId, id, index } = this.props;

    PORTAL_HELPERS.openAddEvent(
      {
        id: templateId,
        tabId,
        dayId: id,
        index,
        eventType: type,
        subtype,
      },
      this.props,
    );
  };

  renderUpdateInfoMenu = ({ closeMenu }) => {
    const { id, tabId, classes, smDown } = this.props;

    return (
      <GridContainer
        direction="column"
        className={
          smDown ? classes.updateInfoMenuMobile : classes.updateInfoMenu
        }
        spacing={0}
      >
        <Can do="create" on={EVENT}>
          <GridItem>
            <MenuItem closeMenu={closeMenu} onClick={this.openAddEvent()}>
              Add new events & activities
            </MenuItem>
          </GridItem>
        </Can>
        <Can do="create" on={EVENT}>
          <GridItem>
            <GridContainer alignItems="center" spacing={0}>
              <GridItem xs={6}>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <MenuItemButton
                      id={id}
                      type="ACCOMMODATIONS"
                      subtype="HOTEL"
                      closeMenu={closeMenu}
                      onClick={this.openAddEvent({
                        type: 'Accommodation',
                        subtype: 'Hotel',
                      })}
                    />
                  </GridItem>
                  <GridItem>
                    <MenuItemButton
                      id={id}
                      type="TRANSPORTATIONS"
                      subtype="FLIGHT"
                      closeMenu={closeMenu}
                      onClick={this.openAddEvent({
                        type: 'Transportation',
                        subtype: 'Flight',
                      })}
                    />
                  </GridItem>
                  <GridItem>
                    <MenuItemButton
                      id={id}
                      type="ACTIVITIES"
                      subtype="FOOD"
                      closeMenu={closeMenu}
                      onClick={this.openAddEvent({
                        type: 'Activity',
                        subtype: 'Food',
                      })}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={6}>
                <MenuItem closeMenu={closeMenu} onClick={this.openAddEvent()}>
                  <JText dark sm>
                    +45 more
                  </JText>
                </MenuItem>
              </GridItem>
            </GridContainer>
          </GridItem>
        </Can>
        <Can do="create" on={ACTIVITY}>
          <GridItem
            className={classnames(
              LOGIC_HELPERS.ifElse(
                ability.can('create', EVENT),
                classes.separator,
              ),
            )}
          >
            <MenuItem closeMenu={closeMenu} onClick={this.addNewSection}>
              Add new section
            </MenuItem>
          </GridItem>
        </Can>
        <Can do="create" on={CHECKLIST}>
          <GridItem>
            <MenuItem closeMenu={closeMenu} onClick={this.addNewChecklist}>
              Add new checklist
            </MenuItem>
          </GridItem>
        </Can>

        <Can do="create" on={DAY}>
          <GridItem
            className={classnames(
              LOGIC_HELPERS.ifElse(
                ability.can('create', ACTIVITY),
                classes.separator,
              ),
            )}
          >
            <InsertNode
              editingAfterCreate
              parentId={tabId}
              insertBefore={id}
              onSuccess={this.handleCreateSuccess}
              closeMenu={closeMenu}
            >
              {this.renderInsertAbove}
            </InsertNode>
          </GridItem>
        </Can>
        <Can do="create" on={DAY}>
          <GridItem>
            <InsertNode
              editingAfterCreate
              parentId={tabId}
              insertAfter={id}
              onSuccess={this.handleCreateSuccess}
              closeMenu={closeMenu}
            >
              {this.renderInsertBelow}
            </InsertNode>
          </GridItem>
        </Can>
      </GridContainer>
    );
  };

  renderUpdateInfo = () => (
    <Fragment>
      <Popper renderButton={this.renderUpdateInfoButton}>
        {this.renderUpdateInfoMenu}
      </Popper>
      {this.renderDeleteDayDialog()}
    </Fragment>
  );

  render = () => {
    const { classes, isPublic, editing, editable, noWrap } = this.props;

    if (isPublic) return null;

    return (
      <div className={classes.root}>
        <GridContainer
          spacing={0}
          className={classnames(classes.actionButtons)}
          noWrap={noWrap}
        >
          {!editable && this.canInlineEdit() && (
            <GridItem>
              <Button
                noMargin
                dense
                size="extraSmall"
                variant={VARIANTS.OUTLINE}
                onClick={this.toggleEditing}
                className={classnames(
                  classes.actionButton,
                  LOGIC_HELPERS.ifElse(editing, classes.editingButton),
                )}
                buttonTitle={LOGIC_HELPERS.ifElse(
                  editing,
                  'Finish editing',
                  'Start editing this day',
                )}
              >
                <GridContainer alignItems="center">
                  <GridItem>
                    <Icon
                      icon={LOGIC_HELPERS.ifElse(
                        editing,
                        'lnr-check',
                        'lnr-pencil',
                      )}
                      size="small"
                    />
                  </GridItem>
                  {editing && (
                    <Hidden smDown>
                      <GridItem>Finish Editing</GridItem>
                    </Hidden>
                  )}
                </GridContainer>
              </Button>
            </GridItem>
          )}
          {this.canExecute() && <GridItem>{this.renderUpdateInfo()}</GridItem>}
          {(editing || editable) && (
            <Can do="delete" on={DAY}>
              <Button
                noMargin
                dense
                size="extraSmall"
                variant={VARIANTS.OUTLINE}
                onClick={this.openDeleteDialog}
                className={classnames(this.props.classes.actionButton)}
              >
                <Icon icon="lnr-trash2" size="small" />
              </Button>
            </Can>
          )}
        </GridContainer>
      </div>
    );
  };
}

ActionButtons.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number,
  templateId: PropTypes.number,
  firstChild: PropTypes.number, // first day id
  prevSelectedId: PropTypes.number,
  nextSelectedId: PropTypes.number,
  tabId: PropTypes.number,
  index: PropTypes.number,
  toggleEdit: PropTypes.func,

  // resaga props
  title: PropTypes.string,
  startDate: PropTypes.string,
  displayDate: PropTypes.string,
  weekDay: PropTypes.number,
  isPublic: PropTypes.bool,
  editable: PropTypes.bool,
  editing: PropTypes.bool,
  noWrap: PropTypes.bool,

  // resaga props
  dateTitle: PropTypes.string,
  activityIds: PropTypes.array,
};

ActionButtons.defaultProps = {
  activityIds: [],
  toggleEdit: DO_NOTHING_FUNC,
};

export default compose(
  withStyles(styles, { name: 'ActionButtons' }),
  withRouter,
  resaga(TEMPLATE_ID_CONFIG),
  resaga(CONFIG),
  withSMDown,
)(ActionButtons);
