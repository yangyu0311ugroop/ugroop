/* eslint-disable react/no-array-index-key */
import { DO_NOTHING } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import getCalendarMonthWeeks from 'smartComponents/Node/parts/StartDate/components/MiniCalendar/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import styles from './styles';

export const defaultWeeks = props => {
  const { startDate, duration, firstDayOfWeek } = props;

  return getCalendarMonthWeeks(
    startDate,
    duration,
    firstDayOfWeek || moment.localeData().firstDayOfWeek(),
  );
};

export class MiniCalendar extends PureComponent {
  state = {
    month: moment(this.props.startDate),
    weeks: defaultWeeks(this.props),
  };

  componentDidUpdate = prevProps => {
    const { startDate, duration, firstDayOfWeek } = this.props;

    if (
      startDate !== prevProps.startDate ||
      duration !== prevProps.duration ||
      firstDayOfWeek !== prevProps.firstDayOfWeek
    ) {
      return this.setState({
        month: moment(startDate),
        weeks: defaultWeeks(this.props),
      });
    }

    return DO_NOTHING;
  };

  getFirstDayOfWeek = (props = this.props) => {
    const { firstDayOfWeek } = props;

    // default to moment firstDayOfWeek
    return firstDayOfWeek || moment.localeData().firstDayOfWeek();
  };

  getWeekHeaders = () => {
    const { weekDayFormat } = this.props;
    const { month } = this.state;

    const firstDayOfWeek = this.getFirstDayOfWeek();

    const weekHeaders = [];
    for (let i = 0; i < 7; i += 1) {
      weekHeaders.push(
        month
          .clone()
          .day((i + firstDayOfWeek) % 7)
          .format(weekDayFormat),
      );
    }

    return weekHeaders;
  };

  renderWeekHeaders = () => {
    const { classes } = this.props;

    return this.getWeekHeaders().map(day => (
      <td key={day} className={classnames(classes.weekHeader)}>
        {day}
      </td>
    ));
  };

  renderMonthHeader = () => {
    const { startDate, duration } = this.props;

    const start = MOMENT_HELPERS.getMoment(startDate);
    const end = MOMENT_HELPERS.getStartBasedOnDuration(startDate, duration);

    // different year, render both month and year
    if (start.year() !== end.year()) {
      return `${start.format('MMM YYYY')} - ${end.format('MMM YYYY')}`;
    }

    // same year, different month, render year once
    if (start.month() !== end.month()) {
      return `${start.format('MMMM')} - ${end.format('MMMM YYYY')}`;
    }

    // same month, render month and year once
    return `${start.format('MMMM YYYY')}`;
  };

  renderDate = day => {
    const { displayDate } = this.props;

    if (!day) return null;

    return (
      displayDate === 'startDate' &&
      (day.date() === 1 ? day.format('D[/]M') : day.format('D'))
    );
  };

  renderDayContent = (day, dayOfWeek) => {
    const { classes, renderDayContent } = this.props;

    if (typeof renderDayContent === 'function')
      return renderDayContent(day, dayOfWeek, { classes });

    let isToday;

    if (day) {
      isToday = day.isSame(moment(), 'day');
    }

    return (
      <div
        className={classnames(
          classes.dayContent,
          LOGIC_HELPERS.ifElse(isToday, classes.today),
        )}
      >
        {this.renderDate(day)}
      </div>
    );
  };

  renderDay = (day, dayOfWeek) => {
    const { classes, startDate, duration, renderDay, selectedDay } = this.props;

    const isOutsideRange = MOMENT_HELPERS.isOutsideRange(startDate, duration)(
      day,
    );

    if (typeof renderDay === 'function') {
      return renderDay(day, dayOfWeek, {
        classes,
        isOutsideRange,
        renderDayContent: this.renderDayContent,
      });
    }

    return (
      <td
        key={dayOfWeek}
        className={classnames(
          classes.cell,
          LOGIC_HELPERS.ifElse(
            selectedDay && selectedDay.isSame(day, 'day'),
            classes.cellActive,
          ),
          LOGIC_HELPERS.ifElse(!day, classes.emptyCell),
          LOGIC_HELPERS.ifElse(isOutsideRange, classes.emptyCell),
        )}
      >
        {!isOutsideRange && this.renderDayContent(day, dayOfWeek)}
      </td>
    );
  };

  renderWeek = (week, weekIndex) => {
    const { startDate, duration } = this.props;

    let isStartDateInThisWeek = true;

    // do not render if start date is not in this week
    for (let j = 0; j < week.length; j += 1) {
      if (
        week[j] &&
        !MOMENT_HELPERS.isOutsideRange(startDate, duration)(week[j])
      ) {
        isStartDateInThisWeek = false;
        break;
      }
    }

    if (isStartDateInThisWeek) return null;

    return <tr key={weekIndex}>{week.map(this.renderDay)}</tr>;
  };

  render = () => {
    const { classes, displayDate } = this.props;
    const { weeks } = this.state;

    return (
      <table className={classes.table}>
        {displayDate === 'startDate' && (
          <tr>
            <td colSpan="7" className={classes.month}>
              {this.renderMonthHeader()}
            </td>
          </tr>
        )}
        {displayDate === 'weekDay' && (
          <tr>
            <td colSpan="7" className={classes.month}>
              Weekdays
            </td>
          </tr>
        )}
        {displayDate === 'none' && (
          <tr>
            <td colSpan="7" className={classes.month}>
              Days
            </td>
          </tr>
        )}
        {displayDate !== 'none' && <tr>{this.renderWeekHeaders()}</tr>}
        <tbody>{weeks.map(this.renderWeek)}</tbody>
      </table>
    );
  };
}

MiniCalendar.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  startDate: PropTypes.string,
  duration: PropTypes.number,
  renderDay: PropTypes.func,
  selectedDay: PropTypes.any,
  displayDate: PropTypes.string,

  // custom props
  firstDayOfWeek: PropTypes.number,
  weekDayFormat: PropTypes.string,
  renderDayContent: PropTypes.func,
};

MiniCalendar.defaultProps = {
  weekDayFormat: 'dd',
  firstDayOfWeek: 0, // Sunday
};

export default compose(withStyles(styles, { name: 'MiniCalendar' }))(
  MiniCalendar,
);
