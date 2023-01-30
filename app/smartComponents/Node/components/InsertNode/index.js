import { withStyles } from '@material-ui/core/styles';
import { Can } from 'apis/components/Ability/components/Can';
import { TEMPLATE_ID_CONFIG } from 'apis/components/Node/config';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import {
  INSERT_AFTER,
  INSERT_BEFORE,
  NODE_API,
  UPDATE_NODE,
} from 'apis/constants';
import { FLAT_BUTTON, NONE, STARTDATE, WEEK_DAY } from 'appConstants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import momentjs from 'moment';
import IconButton from 'ugcomponents/Buttons/IconButton';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DAY, TEMPLATE } from 'utils/modelConstants';
import { CONFIG } from './config';
import styles from './styles';

export class InsertNode extends PureComponent {
  isLoading = () => {
    const { isInsertBeforeLoading, isInsertAfterLoading } = this.props;

    return isInsertBeforeLoading || isInsertAfterLoading;
  };

  type = () => {
    const { type, insertBeforeType, insertAfterType } = this.props;

    return type || insertBeforeType || insertAfterType;
  };

  typeText = () => NODE_STORE_HELPERS.translateType(this.type());

  startDateChanged = () => {
    const { displayDate, insertBefore, firstChild } = this.props;

    return (
      displayDate !== NONE && this.type() === DAY && insertBefore === firstChild
    );
  };

  insertBefore = () => {
    if (this.isLoading()) return null;

    if (this.startDateChanged()) {
      this.handleChangeStartDate();
    }

    return this.handleInsertBefore(!this.startDateChanged());
  };

  updateTimes = () => {
    const { id } = this.props;
    NODE_API_HELPERS.getTreeAndTimes({ id }, { resaga: this.props.resaga });
  };

  changeStartDate = node => {
    const { id } = this.props;

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
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
      const start = momentjs(startDate).subtract(1, 'day');

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
      const newWeekDay = (weekDay + 6) % 7; // - 1 + 7 to ensure weekday never go negative

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

  handleInsertBefore = shouldGetTimes => {
    const {
      editingAfterCreate,
      type,
      insertBefore,
      insertBeforeType,
      parentId,
    } = this.props;

    return this.props.resaga.dispatchTo(NODE_API, INSERT_BEFORE, {
      payload: {
        id: insertBefore,
        parentId,
        node: { type: type || insertBeforeType },
        insertLocation: 'before',
        keyPath: `${parentId}.children`,
        editingAfterCreate,
      },
      onSuccess: this.updateParentTimes(shouldGetTimes),
    });
  };

  insertAfter = () => {
    const {
      editingAfterCreate,
      type,
      insertAfter,
      insertAfterType,
      parentId,
    } = this.props;

    if (this.isLoading()) return null;

    return this.props.resaga.dispatchTo(NODE_API, INSERT_AFTER, {
      payload: {
        id: insertAfter,
        parentId,
        node: { type: type || insertAfterType },
        insertLocation: 'after',
        keyPath: `${parentId}.children`,
        editingAfterCreate,
      },
      onSuccess: this.updateParentTimes(true),
    });
  };

  handleInsert = () => {
    const { insertAfter } = this.props;

    if (insertAfter) {
      return this.insertAfter();
    }

    return this.insertBefore();
  };

  updateParentTimes = shouldGetTimes => (...params) => {
    const { parentId, onSuccess } = this.props;

    if (shouldGetTimes) {
      NODE_API_HELPERS.getTreeAndTimes({ id: parentId }, this.props);
    }

    LOGIC_HELPERS.ifFunction(onSuccess, params);
  };

  renderInsertButton = () => {
    const { classes, children, renderButton, ...props } = this.props;

    const isLoading = this.isLoading();

    if (children) {
      return LOGIC_HELPERS.ifFunction(
        children,
        [
          {
            ...props,
            onClick: this.handleInsert,
            disabled: isLoading,
          },
        ],
        children,
      );
    }

    if (typeof renderButton === 'function') {
      return renderButton({
        ...props,
        onClick: this.handleInsert,
        type: this.type(),
        typeText: this.typeText(),
        isLoading,
      });
    }

    return (
      <IconButton
        isLoading={isLoading}
        disabled={isLoading}
        color="inherit"
        onClick={this.handleInsert}
        tooltip="Add"
        variant={FLAT_BUTTON}
        className={classes.addButton}
      >
        <Icon icon="lnr-plus-square" size="xsmall" paddingRight /> New{' '}
        {this.typeText()}
      </IconButton>
    );
  };

  render = () => {
    const type = this.type();

    return (
      <Can do="create" on={type}>
        {this.renderInsertButton()}
      </Can>
    );
  };
}

InsertNode.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  insertBefore: PropTypes.number,
  insertAfter: PropTypes.number,
  parentId: PropTypes.number,
  renderButton: PropTypes.func,
  onSuccess: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.any,

  // resaga
  id: PropTypes.number, // template id
  firstChild: PropTypes.number,
  startDate: PropTypes.string,
  displayDate: PropTypes.string,
  weekDay: PropTypes.number,
  insertBeforeType: PropTypes.string,
  insertAfterType: PropTypes.string,
  isInsertAfterLoading: PropTypes.bool,
  isInsertBeforeLoading: PropTypes.bool,

  // customise props
  editingAfterCreate: PropTypes.bool, // set value of node.calculated.editing
};

InsertNode.defaultProps = {
  isInsertAfterLoading: false,
  isInsertBeforeLoading: false,
};

export default compose(
  withStyles(styles, { name: 'InsertNode' }),
  resaga(TEMPLATE_ID_CONFIG),
  resaga(CONFIG),
)(InsertNode);
