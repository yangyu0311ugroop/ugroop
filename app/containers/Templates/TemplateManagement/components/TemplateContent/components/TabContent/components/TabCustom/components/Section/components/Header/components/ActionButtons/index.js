import { withStyles } from '@material-ui/core/styles';
import { Can } from 'apis/components/Ability/components/Can';
import { DELETE_CHILDREN, NODE_API } from 'apis/constants';
import { FLAT_BUTTON, SECTION_ACTION } from 'appConstants';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { isEmptyString } from 'utils/stringAdditions';
import { compose } from 'redux';
import resaga from 'resaga';
import IconButton from 'ugcomponents/Buttons/IconButton/index';
import Icon from 'ugcomponents/Icon/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ACTIVITY } from 'utils/modelConstants';
import Dialog from 'ugcomponents/Dialog/index';
import CopyMove from '../CopyMove';
import { CONFIG } from './config';
import styles from './styles';

export class ActionButtons extends PureComponent {
  state = {
    isOpenDialog: false,
  };

  componentWillMount = () => {
    const { createdBy } = this.props;
    this.activity = { type: ACTIVITY, createdBy };
  };

  finishEdit = () => {
    const { id } = this.props;
    this.props.resaga.setValue({
      editSections: sections.remove(id),
    });
  };

  startEdit = () => {
    const { id, editing } = this.props;

    if (!editing) {
      this.props.resaga.setValue({
        editSections: sections.upsert({ id }, { node: {} }),
      });
    }
  };

  onClickDelete = () => {
    this.setState({
      isOpenDialog: true,
    });
  };

  onCancelDelete = () => {
    this.setState({
      isOpenDialog: false,
    });
  };

  deleteSection = () => {
    const { id, tabId } = this.props;
    this.props.resaga.dispatchTo(NODE_API, DELETE_CHILDREN, {
      payload: {
        nodeId: id,
        keyPath: `${tabId}.children`,
        store: 'sections',
      },
    });

    this.setState({
      isOpenDialog: false,
    });
  };

  isMoving = () => {
    const { movingNodeBefore, movingNodeAfter } = this.props;

    return movingNodeBefore || movingNodeAfter;
  };

  renderViewButtons = () => {
    const { classes, dragHandleProps, ids, tabId } = this.props;
    const extraProps = LOGIC_HELPERS.ifFunction(
      this.isMoving(),
      {},
      dragHandleProps,
    );

    return (
      <React.Fragment>
        {this.renderDialog()}
        <div {...extraProps} className={classes.root}>
          {!this.isMoving() && ids.length > 1 && (
            <Can do="move" on={this.activity}>
              <IconButton
                disabled
                tooltip="Drag and Drop to move this Section"
                className={classes.dragHandle}
                variant={FLAT_BUTTON}
                transparent
              >
                <Icon icon="lnr-move" />
              </IconButton>
            </Can>
          )}
          <Can do="delete" on={this.activity}>
            <React.Fragment>
              <IconButton
                onClick={this.onClickDelete}
                tooltip="Delete"
                variant={FLAT_BUTTON}
                transparent
              >
                <Icon icon="lnr-trash2" />
              </IconButton>
              <CopyMove
                action={SECTION_ACTION.MOVE}
                id={this.props.id}
                ids={ids}
                parentId={tabId}
              />
            </React.Fragment>
          </Can>
        </div>
      </React.Fragment>
    );
  };

  renderEditButtons = () => {
    const { classes, deleteOnDiscard } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <IconButton
            tooltip="Save Changes"
            variant={FLAT_BUTTON}
            type="submit"
            color="primary"
            transparent
          >
            <Icon icon="lnr-check" />
          </IconButton>

          <IconButton
            onClick={deleteOnDiscard ? this.deleteSection : this.finishEdit}
            tooltip="Cancel"
            variant={FLAT_BUTTON}
            transparent
          >
            <Icon icon="lnr-cross2" />
          </IconButton>
        </div>
      </React.Fragment>
    );
  };

  renderDialog = () => {
    const { isOpenDialog } = this.state;
    const { content } = this.props;
    return (
      <Dialog
        template="delete"
        open={isOpenDialog}
        headlineTitle={`Delete ${
          isEmptyString(content) ? 'this section' : content
        }?`}
        dialogTitle="Delete Section"
        headlineText="This action cannot be undone."
        cancelFunc={this.onCancelDelete}
        confirmFunc={this.deleteSection}
      />
    );
  };

  render = () => {
    const { moveMode, editing } = this.props;
    if (moveMode) return <span />;

    return editing ? this.renderEditButtons() : this.renderViewButtons();
  };
}

ActionButtons.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  tabId: PropTypes.number,
  editing: PropTypes.any,
  dirty: PropTypes.bool,
  empty: PropTypes.bool,
  dragHandleProps: PropTypes.object,

  // resaga props
  moveMode: PropTypes.bool,
  deleteOnDiscard: PropTypes.bool,
  createdBy: PropTypes.number,
  content: PropTypes.string,
  editable: PropTypes.bool,

  movingNodeBefore: PropTypes.bool,
  movingNodeAfter: PropTypes.bool,
  ids: PropTypes.array,
  type: PropTypes.string,
};

ActionButtons.defaultProps = {
  dirty: false,
  moveMode: false,
  editing: 0,
  dragHandleProps: {},
  deleteOnDiscard: false,
  createdBy: 0,
  content: '',
  ids: [],
};

export default compose(
  withStyles(styles, { name: 'ActionButtons' }),
  resaga(CONFIG),
)(ActionButtons);
