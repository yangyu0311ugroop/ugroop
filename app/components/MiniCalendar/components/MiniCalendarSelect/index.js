import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import MiniCalendar from 'components/MiniCalendar/index';
import { DATA_HELPERS } from 'datastore/utils';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class MiniCalendarSelect extends PureComponent {
  state = {
    startDate: this.props.startDate,
    endDate: this.props.endDate,
    dates: this.props.dates,
  };

  formatDay = day => MOMENT_HELPERS.normaliseDate(day);

  handleClick = day => () => {
    const { range, multiple } = this.props;
    const { startDate, endDate, dates } = this.state;

    if (multiple) {
      const dayString = this.formatDay(day);

      if (dates.indexOf(dayString) !== -1) {
        return this.setState(
          { dates: DATA_HELPERS.arrayRemove(dayString)(dates) },
          this.handleDatesChange,
        );
      }

      return this.setState(
        { dates: DATA_HELPERS.arrayAdd(dayString)(dates) },
        this.handleDatesChange,
      );
    }

    if (!range) {
      return this.setState({ startDate: day }, this.handleDatesChange);
    }

    if (startDate && !endDate && startDate.isBefore(day)) {
      return this.setState({ endDate: day }, this.handleDatesChange);
    }

    return this.setState(
      { startDate: day, endDate: null },
      this.handleDatesChange,
    );
  };

  handleDatesChange = () => {
    const { onDatesChange } = this.props;
    const { startDate, endDate, dates } = this.state;

    LOGIC_HELPERS.ifFunction(onDatesChange, [{ startDate, endDate, dates }]);
  };

  isInSelectedRange = ({ startDate, endDate, day }) =>
    startDate &&
    endDate &&
    !MOMENT_HELPERS.isOutsideRange(
      startDate,
      endDate && endDate.diff(startDate, 'day') + 1,
    )(day);

  renderDay = ({ startDate, endDate } = {}) => (
    day,
    dayOfWeek,
    { classes: calendarClasses = {}, isOutsideRange, renderDayContent } = {},
  ) => {
    const { classes } = this.props;
    const { dates } = this.state;

    const isInSelectedRange = this.isInSelectedRange({
      startDate,
      endDate,
      day,
    });

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
      <td
        key={dayOfWeek}
        className={classnames(
          calendarClasses.cell,
          classes.cell,
          LOGIC_HELPERS.ifElse(!isOutsideRange, classes.cellInRange),
          LOGIC_HELPERS.ifElse(isInSelectedRange, classes.inRange),
          LOGIC_HELPERS.ifElse(
            dates.indexOf(this.formatDay(day)) !== -1,
            classes.inRange,
          ),
          LOGIC_HELPERS.ifElse(
            startDate && startDate.isSame(day, 'day'),
            classes.startDate,
          ),
          LOGIC_HELPERS.ifElse(
            endDate && endDate.isSame(day, 'day'),
            classes.startDate,
          ),
        )}
        onClick={!isOutsideRange && this.handleClick(day, dayOfWeek)}
      >
        {!isOutsideRange &&
          LOGIC_HELPERS.ifFunction(renderDayContent, [day, dayOfWeek])}
      </td>
    );
  };

  renderSubtitle = () => {
    const { range, multiple } = this.props;
    const { startDate, endDate, dates } = this.state;

    if (multiple) {
      if (!dates.length) {
        return (
          <GridItem>
            <JText gray>Select dates</JText>
          </GridItem>
        );
      }

      return (
        <GridItem>
          <JText dark>
            {dates.length} date{dates.length > 1 && 's'} selected
          </JText>
        </GridItem>
      );
    }

    if (!range) {
      if (!startDate) {
        return (
          <GridItem>
            <JText gray>Select date</JText>
          </GridItem>
        );
      }

      return <JText dark>{startDate.format('ddd, D MMM')}</JText>;
    }

    if (!startDate) {
      return (
        <GridItem>
          <JText gray>Select check in date</JText>
        </GridItem>
      );
    }

    if (!endDate) {
      return (
        <GridItem>
          <JText gray>Select check out date</JText>
        </GridItem>
      );
    }

    const nights = endDate.diff(startDate, 'day');

    return (
      <GridItem>
        <JText dark>
          {startDate.format('ddd, D MMM')} - {endDate.format('ddd, D MMM')} (
          {nights} night
          {LOGIC_HELPERS.ifElse(nights > 1, 's')})
        </JText>
      </GridItem>
    );
  };

  render = () => {
    const { tourStartDate, duration, onClose } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <GridContainer alignItems="center" direction="column" spacing={2}>
        <GridItem>
          <MiniCalendar
            startDate={tourStartDate}
            duration={duration}
            hideCellStyle
            renderDay={this.renderDay({ startDate, endDate })}
          />
        </GridItem>

        <GridItem>
          <GridContainer alignItems="center" direction="column">
            {this.renderSubtitle()}

            <GridItem>
              <Button dialog color="primary" onClick={onClose}>
                Done
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

MiniCalendarSelect.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  tourStartDate: PropTypes.any,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  onDatesChange: PropTypes.func,
  onClose: PropTypes.func,
  duration: PropTypes.number,
  range: PropTypes.bool,
  multiple: PropTypes.bool,
  dates: PropTypes.array,

  // resaga props
};

MiniCalendarSelect.defaultProps = {
  dates: [],
};

export default compose(
  withStyles(styles, { name: 'MiniCalendarSelect' }),
  resaga(CONFIG),
)(MiniCalendarSelect);
