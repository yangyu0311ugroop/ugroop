import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import EditActivityForm from './components/ActivityEditMode/editActivityForm';
import Activity from './components/ActivityViewMode/index';
import { CONFIG } from './defines/renderActivityConfig';

const styles = {
  activityContainer: {
    padding: 16,
    marginTop: 8,
    borderRadius: '4px',
    border: 'solid 1px #e3e9ef',
    backgroundColor: '#fff',
    outline: 'none',
    cursor: 'default',
    transition: 'all 150ms ease-in',
  },
  noMarginTop: {
    marginTop: 0,
  },
  highLight: {
    boxShadow: '0 0px 4px 0 rgba(111, 151, 235, 0.25)',
  },
  checklists: {
    marginTop: 8,
  },
};

export class ActivityWrapper extends PureComponent {
  state = {
    editMode: false,
  };

  onClickSection = () => {
    const { activityId, selected } = this.props;
    if (!selected) {
      this.dispatchSelectRow(activityId);
    }
  };

  resetForm = () => {
    this.setState({
      editMode: false,
    });
  };

  toggleEditMode = e => {
    const { editMode } = this.state;
    e.preventDefault();
    this.setState({
      editMode: !editMode,
    });
  };

  handleRequestClose = () => {
    if (this.state.open) {
      this.setState({ open: false });
    }
  };

  dispatchSelectRow = activityId => {
    this.props.resaga.setValue({
      selectedActivityId: activityId,
    });
  };

  render() {
    const {
      activityId,
      dayId,
      classes,
      photoId,
      attachmentId,
      onDeleteSectionPhoto,
      selected,
      createdBy,
      activityIds,
    } = this.props;
    let activityStyle;
    if (activityIds && activityId === activityIds[0]) {
      activityStyle = [classes.activityContainer, classes.noMarginTop];
    }
    activityStyle = [classes.activityContainer];
    if (selected) {
      activityStyle.push(classes.highLight);
    }
    let activityContent = (
      <div
        key={activityId}
        className={classNames(activityStyle)}
        onFocus={this.onClickSection}
        role="button"
        tabIndex={0}
      >
        <Activity
          id={activityId}
          createdBy={createdBy}
          attachmentId={attachmentId}
          activityId={activityId}
          parentId={dayId}
          photoId={photoId}
          readOnly={this.props.isReadOnly}
          toggleEditMode={this.toggleEditMode}
        />
      </div>
    );
    if (this.state.editMode) {
      activityContent = (
        <div
          key={activityId}
          className={classNames(activityStyle)}
          role="link"
          tabIndex={0}
        >
          <EditActivityForm
            id={activityId}
            photoId={photoId}
            dayId={dayId}
            activityId={activityId}
            attachmentId={attachmentId}
            resetForm={this.resetForm}
            onCancel={this.resetForm}
            onDeleteSectionPhoto={onDeleteSectionPhoto}
          />
        </div>
      );
    }
    return activityContent;
  }
}

ActivityWrapper.propTypes = {
  dayId: PropTypes.number.isRequired,
  activityId: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  isReadOnly: PropTypes.bool,
  onDeleteSectionPhoto: PropTypes.func,
  resaga: PropTypes.object,
  selected: PropTypes.bool,
  // resaga value
  photoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  attachmentId: PropTypes.string,
  createdBy: PropTypes.number,
  activityIds: PropTypes.array,
};

ActivityWrapper.defaultProps = {
  photoId: 0,
  attachmentId: '',
  isReadOnly: false,
  createdBy: 0,
  activityIds: [],
};

export default compose(
  resaga(CONFIG),
  withStyles(styles, { name: 'ActivityWrapper' }),
)(ActivityWrapper);
