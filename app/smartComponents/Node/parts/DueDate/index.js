import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { DEFAULT, READ_ONLY } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import momentjs from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import InlineButton from 'ugcomponents/Buttons/InlineButton';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { set, get } from 'lodash';
import { DATASTORE_UTILS } from 'datastore';
import BadgeDueDate from './components/BadgeDueDate';
import ChangeDueDate from './components/ChangeDueDate';
import { CONFIG, CONFIG2 } from './config';
import styles from './styles';

export class DueDate extends PureComponent {
  state = {
    anchorEl: null,
    blockOpening: false,
  };

  componentWillMount = () => {
    this.popoverProps = {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    };
  };

  componentDidMount = () => {
    this.oldValue = this.props.startTime;
  };

  componentWillUnmount = () => {
    clearTimeout(this.blockOpening);
  };

  stopPropagation = event =>
    event && event.stopPropagation && event.stopPropagation();

  openDueDate = event => {
    const { blockOpening } = this.state;

    this.stopPropagation(event);
    if (!blockOpening) {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  upsertTime = dueDate => store => {
    const data = DATASTORE_UTILS.upsertArray('', dueDate)(store);
    return data && data.sort();
  };

  removedIdInArray = (path, id) => storeData => {
    const dataArr = get(storeData, [path], []);
    const filtered = dataArr.filter(idVal => idVal !== (id && id.toString()));
    if (!filtered || filtered.length === 0) {
      return DATASTORE_UTILS.removeObjectById([path])(storeData);
    }
    set(storeData, [path], filtered);
    return storeData;
  };

  removedTimes = storeData => {
    const { timeNodesCount } = this.props;
    return timeNodesCount > 1
      ? storeData
      : DATASTORE_UTILS.removeItemsInArray(this.oldValue)(storeData);
  };

  updateTimes = result => {
    const { id, calculateTimes } = this.props;
    if (!calculateTimes) return;
    const dueDate = get(result, `${id}.calculated.time.start.value`);
    if (!dueDate) return;
    this.props.resaga.setValue({
      timeNodes: compose(
        DATASTORE_UTILS.upsertArray([`${dueDate}`], id.toString()),
        this.removedIdInArray(`${this.oldValue}`, id),
      ),
      times: compose(
        this.removedTimes,
        this.upsertTime(dueDate),
      ),
    });

    this.oldValue = dueDate;
  };

  updateOnSuccess = event => {
    this.updateTimes();
    this.closeDueDate(event);
  };

  closeDueDate = event => {
    this.stopPropagation(event);
    this.setState({ anchorEl: null, blockOpening: true });
    this.blockOpening = setTimeout(
      () => this.setState({ blockOpening: false }),
      100,
    );
  };

  contentClassName = variantClassName => {
    const { classes, className, offsetLeft } = this.props;

    return classnames(
      classes.hover,
      LOGIC_HELPERS.ifElse(offsetLeft, classes.offsetLeft),
      variantClassName,
      className,
    );
  };

  dueDateSubmit = ({ dueDate, dueTime }) => {
    let newDueDate = null;
    if (dueDate) {
      newDueDate = momentjs(`${dueDate} ${dueTime}`).toISOString();
    }

    this.changeDueDate(newDueDate);
  };

  unsetDueDate = () => {
    this.changeDueDate(null);
  };

  changeDueDate = dueDate => {
    const { id, type } = this.props;

    return this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        node: {
          customData: { dueDate },
          type,
        },
      },
      onSuccess: this.updateOnSuccess,
      onError: this.closeDueDate,
    });
  };

  // TODO: proper reusable date picker popover
  renderChangeDueDate = () => {
    const { id, parentNodeId, anchorDate } = this.props;
    const { anchorEl } = this.state;

    if (!anchorEl) {
      return null;
    }

    return (
      <ChangeDueDate
        id={id}
        parentNodeId={parentNodeId}
        anchorDate={anchorDate}
        anchorEl={anchorEl}
        onClose={this.closeDueDate}
        onUpdateSuccess={this.updateTimes}
      />
    );
  };

  renderDueDate = () => {
    const { classes } = this.props;

    return (
      <span className={classes.content}>
        <InlineButton onClick={this.openDueDate} offsetRight>
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>{this.renderReadOnly()}</GridItem>
            <GridItem>
              <Icon
                className={classes.iconHidden}
                size="xsmall"
                icon="lnr-pencil3"
              />
            </GridItem>
          </GridContainer>
        </InlineButton>
      </span>
    );
  };

  renderDefault = () => {
    const { classes, dueDate, showEmpty, component: Component } = this.props;

    if (!dueDate && !showEmpty) {
      return null;
    }

    return (
      <div>
        <Component className={this.contentClassName(classes.default)}>
          {this.renderDueDate()}
        </Component>
        {this.renderChangeDueDate()}
      </div>
    );
  };

  renderReadOnly = () => {
    const {
      id,
      parentNodeId,
      showTime,
      anchorDate,
      startTime,
      hideHumaniseDuration,
      component: Component,
    } = this.props;

    return (
      <Component>
        <BadgeDueDate
          id={id}
          parentNodeId={parentNodeId}
          showTime={showTime}
          anchorDate={anchorDate}
          startTime={startTime}
          hideHumaniseDuration={hideHumaniseDuration}
        />
      </Component>
    );
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [READ_ONLY]: this.renderReadOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

DueDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  parentNodeId: PropTypes.number,
  variant: PropTypes.node,
  className: PropTypes.string,
  showEmpty: PropTypes.bool,
  showTime: PropTypes.bool,
  hideHumaniseDuration: PropTypes.bool,
  offsetLeft: PropTypes.bool,
  anchorDate: PropTypes.string,
  calculateTimes: PropTypes.bool,

  // resaga props
  dueDate: PropTypes.object,
  startTime: PropTypes.string,
  type: PropTypes.string,
  timeNodesCount: PropTypes.number,
  // customisable props
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

DueDate.defaultProps = {
  id: 0,
  parentNodeId: 0,
  variant: '',
  className: '',
  anchorDate: '',

  dueDate: {},
  type: '',
  showEmpty: true,
  showTime: false,
  offsetLeft: false,
  timeNodesCount: 0,
  calculateTimes: false,
  // customisable props
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'DueDate' }),
  resaga(CONFIG),
  resaga(CONFIG2),
)(DueDate);
