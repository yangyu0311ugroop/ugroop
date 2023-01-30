import { CLOSED, COMPLETED, DEFAULT } from 'appConstants';
import classnames from 'classnames';
import { Hidden, withStyles } from 'components/material-ui';
import momentjs from 'moment/moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  DUE_DATE_HELPERS,
  DUE_DATE_RELATIVE_OPTIONS,
} from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';
import Icon from 'ugcomponents/Icon/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { moment } from 'utils/index';
import { CONFIG } from './config';
import styles from './styles';

export class BadgeDueDate extends PureComponent {
  componentDidMount = () => {
    const { calculatedDate } = this.props;

    this.updateCalculatedDate(calculatedDate);
  };

  componentWillReceiveProps = nextProps => {
    const { calculatedDate } = this.props;

    if (!momentjs(calculatedDate).isSame(nextProps.calculatedDate)) {
      this.updateCalculatedDate(nextProps.calculatedDate);
    }
  };

  updateCalculatedDate = calculatedStartTimeValue => {
    this.props.resaga.setValue({ calculatedStartTimeValue });
  };

  showPastDueDueSoon = () => {
    const { status } = this.props;

    return status !== COMPLETED && status !== CLOSED;
  };

  status = () => {
    const { calculatedDate } = this.props;

    if (!this.showPastDueDueSoon()) {
      return {
        pastDue: false,
        dueSoon: false,
      };
    }

    const now = momentjs();
    const due = momentjs(calculatedDate);

    const pastDue = due.isBefore(now);
    const dueSoon = !pastDue && moment.isSameDay(due, now);

    return {
      pastDue,
      dueSoon,
    };
  };

  hideText = () => {
    const { showTime, status } = this.props;

    return status === COMPLETED && !showTime;
  };

  icon = () => {
    const { pastDue, dueSoon } = this.status();

    if (dueSoon || pastDue) {
      return 'lnr-warning';
    }

    return 'lnr-calendar-full';
  };

  statusClassName = () => {
    const { classes } = this.props;
    const { pastDue, dueSoon } = this.status();

    return classnames(pastDue && classes.pastDue, dueSoon && classes.dueSoon);
  };

  renderDate = () => {
    const { dueDate, calculatedDate } = this.props;

    const { pastDue, dueSoon } = this.status();
    const fromNow = moment.renderCalendarDueDate(calculatedDate);

    if (this.hideText()) {
      return '';
    }
    if (pastDue) {
      return `${fromNow}`;
    }
    if (dueSoon) {
      return `${fromNow}`;
    }

    if (!dueDate) {
      return null;
    }

    const { mode, value } = dueDate;

    if (DUE_DATE_HELPERS.isUnset(mode)) {
      return null;
    }
    if (DUE_DATE_HELPERS.isFixedWithTime(mode)) {
      return `${moment.renderCalendarDateShort(value)}`;
    }
    if (DUE_DATE_HELPERS.isFixedNoTime(mode)) {
      return `${moment.renderCalendarDateShort(value)}`;
    }

    return this.renderDateDuration();
  };

  renderDateDuration = (humanizeOnly = false) => {
    const {
      classes,
      dueDate,
      parentType,
      translateType,
      calculatedDate,
      hideHumaniseDuration,
    } = this.props;
    const { value } = dueDate;
    const useActual =
      parentType &&
      dueDate &&
      DUE_DATE_RELATIVE_OPTIONS[parentType].indexOf(dueDate.value) === -1;

    const renderCalculatedDate =
      calculatedDate &&
      DUE_DATE_HELPERS.renderCalculatedDate({
        value,
        parentType,
        calculatedDate,
      });
    let renderHumaniseDuration = DUE_DATE_HELPERS.humaniseDuration({
      value,
      parentType,
      translateType,
      useActual,
    });

    if (humanizeOnly) return renderHumaniseDuration;
    if (renderCalculatedDate) {
      renderHumaniseDuration = (
        <span className={classnames(classes.secondary)}>
          ({renderHumaniseDuration})
        </span>
      );
    }

    return (
      <span>
        {renderCalculatedDate}
        {!hideHumaniseDuration && (
          <Hidden smDown>{renderHumaniseDuration}</Hidden>
        )}
      </span>
    );
  };

  renderEmpty = () => (
    <span>
      <Icon size="xsmall" icon="lnr-calendar-empty" paddingRight />
      No due date
    </span>
  );

  renderTitle = () => {
    const { dueDate, calculatedDate } = this.props;

    if (!dueDate) {
      return null;
    }

    const { mode } = dueDate;

    if (DUE_DATE_HELPERS.isFixedWithTime(mode)) {
      return moment.renderDayDateTimeZone(calculatedDate);
    }

    if (DUE_DATE_HELPERS.isFixedNoTime(mode)) {
      return moment.renderCalendarDate(calculatedDate);
    }

    return this.renderDateDuration(true);
  };

  renderDefault = () => {
    const { classes, dueDate, className } = this.props;

    if (!dueDate || DUE_DATE_HELPERS.isUnset(dueDate.mode)) {
      return this.renderEmpty();
    }

    const content = (
      <span
        className={classnames(classes.badge, this.statusClassName(), className)}
      >
        <Icon
          size="xsmall"
          icon={this.icon()}
          paddingRight={!this.hideText()}
        />
        {this.renderDate()}
      </span>
    );

    // only render tooltip when we're rendering short date time format
    return (
      <div title={`This checklist is due ${this.renderTitle()}`}>{content}</div>
    );
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

BadgeDueDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  className: PropTypes.string,
  parentType: PropTypes.string,
  translateType: PropTypes.string,
  showTime: PropTypes.bool,
  hideHumaniseDuration: PropTypes.bool,

  // resaga props
  calculatedDate: PropTypes.any,
  dueDate: PropTypes.object,
  status: PropTypes.string,
};

BadgeDueDate.defaultProps = {
  variant: '',
  className: '',
  parentType: '',
  translateType: '',
  showTime: false,
  calculatedDate: {},
  dueDate: {},
  status: '',
};

export default compose(
  withStyles(styles, { name: 'BadgeDueDate' }),
  resaga(CONFIG),
)(BadgeDueDate);
