import { withStyles } from '@material-ui/core/styles';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { INSERT_AFTER, NODE_API } from 'apis/constants';
import { FLAT_BUTTON } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import IconButton from 'ugcomponents/Buttons/IconButton';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DAY } from 'utils/modelConstants';
import Icon from 'ugcomponents/Icon';
import { CONFIG } from './config';
import styles from './styles';

export class InsertDay extends PureComponent {
  insertBefore = () => {
    const { insertBefore, parentId } = this.props;

    this.props.resaga.dispatchTo(NODE_API, INSERT_AFTER, {
      payload: {
        id: insertBefore,
        parentId,
        node: { type: DAY },
        insertLocation: 'before',
        keyPath: `${parentId}.children`,
      },
      onSuccess: this.updateTimes,
    });
  };

  insertAfter = () => {
    const { insertAfter, parentId } = this.props;

    this.props.resaga.dispatchTo(NODE_API, INSERT_AFTER, {
      payload: {
        id: insertAfter,
        parentId,
        node: { type: DAY },
        insertLocation: 'after',
        keyPath: `${parentId}.children`,
      },
      onSuccess: this.updateTimes,
    });
  };

  handleInsert = () => {
    const { insertAfter } = this.props;

    if (insertAfter) {
      return this.insertAfter();
    }

    return this.insertBefore();
  };

  updateTimes = () => {
    const { parentId } = this.props;
    NODE_API_HELPERS.getTreeAndTimes({ id: parentId }, this.props);
  };

  render = () => {
    const {
      classes,
      isInsertBeforeLoading,
      isInsertAfterLoading,
      children,
    } = this.props;

    if (children) {
      return LOGIC_HELPERS.ifFunction(
        children,
        [
          {
            onClick: this.handleInsert,
            disabled: isInsertAfterLoading || isInsertBeforeLoading,
          },
        ],
        children,
      );
    }

    return (
      <IconButton
        isLoading={isInsertAfterLoading}
        disabled={isInsertAfterLoading}
        color="inherit"
        onClick={this.handleInsert}
        tooltip="Add"
        variant={FLAT_BUTTON}
        className={classes.addButton}
      >
        <Icon icon="lnr-plus-square" size="xsmall" paddingRight /> Insert Day
      </IconButton>
    );
  };
}
InsertDay.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  insertBefore: PropTypes.number,
  insertAfter: PropTypes.number,
  parentId: PropTypes.number,
  children: PropTypes.any,

  // resaga
  isInsertBeforeLoading: PropTypes.bool,
  isInsertAfterLoading: PropTypes.bool,
};

InsertDay.defaultProps = {
  isInsertAfterLoading: false,
};

export default compose(
  withStyles(styles, { name: 'InsertDay' }),
  resaga(CONFIG),
)(InsertDay);
