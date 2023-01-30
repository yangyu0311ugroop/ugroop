import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import ChangeDueDatePopper from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/components/ChangeDueDatePopper';
import { InlineButton } from 'ugcomponents/Buttons';
import Icon from 'ugcomponents/Icon';
import ModeInput from './components/ModeInput';
import { CONFIG } from './config';
import styles from './styles';

export class ChangeDueDate extends PureComponent {
  state = {};

  stopPropagation = event =>
    event && event.stopPropagation && event.stopPropagation();

  handleShowHelp = () => {
    alert(`Due date modes:
// TODO: Modal UI + wordings
    `);
  };

  renderBody = ({ closeOnClickAway }) => {
    const {
      classes,
      id,
      parentNodeId,
      onClose,
      anchorDate,
      onUpdateSuccess,
    } = this.props;

    return (
      <GridItem onClick={this.stopPropagation} className={classes.grow}>
        <ModeInput
          id={id}
          anchorDate={anchorDate}
          parentNodeId={parentNodeId}
          onClose={onClose}
          closeOnClickAway={closeOnClickAway}
          onUpdateSuccess={onUpdateSuccess}
        />
      </GridItem>
    );
  };

  renderHeader = () => (
    <GridItem>
      Change due date
      <InlineButton onClick={this.handleShowHelp}>
        <Icon size="xsmall" icon="lnr-question-circle" />
      </InlineButton>
    </GridItem>
  );

  render = () => {
    const { onClose, anchorEl } = this.props;
    return (
      <ChangeDueDatePopper
        heading={this.renderHeader()}
        body={this.renderBody}
        anchorEl={anchorEl}
        onClose={onClose}
      />
    );
  };
}

ChangeDueDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  anchorEl: PropTypes.object,
  parentNodeId: PropTypes.number,
  onClose: PropTypes.func,
  anchorDate: PropTypes.string,
  onUpdateSuccess: PropTypes.func,

  // resaga props
};

ChangeDueDate.defaultProps = {
  id: 0,
  anchorDate: '',
};

export default compose(
  withStyles(styles, { name: 'ChangeDueDate' }),
  resaga(CONFIG),
)(ChangeDueDate);
