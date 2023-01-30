/**
 * Created by stephenkarpinskyj on 25/5/18.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import moment from 'moment';
import classNames from 'classnames';
import resaga from 'resaga';
import { THE_DOT } from 'appConstants';
import { dateDisplay } from 'utils/constant';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { H4 } from 'viewComponents/Typography';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { CONFIG_IDS, CONFIG } from './config';

const FONT_SIZE = 23;
const style = ({ breakpoints }) => ({
  day: {
    margin: 'unset',
    fontWeight: 600,
    [breakpoints.up('md')]: {
      fontSize: FONT_SIZE,
    },
  },
  dot: {
    margin: '0 8px',
    fontWeight: 800,
    fontSize: 15,
    color: '#86A6EB',
    maxHeight: 20,
  },
  date: {
    margin: 'unset',
    [breakpoints.up('md')]: {
      fontSize: FONT_SIZE,
    },
  },
  grow: {
    flex: 1,
  },
});

export class DayDateDisplay extends PureComponent {
  calculateDate = () => {
    const { startTime } = this.props;
    return moment.utc(startTime);
  };

  renderDayOnly = (classes, day) => {
    const { customClass } = this.props;
    const { day: dayClass } = customClass;
    return (
      <GridContainer spacing={0}>
        <GridItem>
          <H4 className={classNames(classes.day, dayClass)}>{day}</H4>
        </GridItem>
      </GridContainer>
    );
  };

  renderDayAndDate = (classes, day, date) => {
    const { displayInfo } = this.props;
    const {
      day: dayClass,
      date: dateClass,
      container: dayContainer,
      dot: dayDot,
    } = this.props.customClass;

    return (
      <GridContainer
        spacing={0}
        alignItems="center"
        className={classNames(dayContainer)}
      >
        <GridItem>
          <H4 className={classNames(classes.day, dayClass)}>{day}</H4>
        </GridItem>
        <GridItem>
          <div className={classNames(classes.dot, dayDot)}>{THE_DOT}</div>
        </GridItem>
        <GridItem className={classes.grow}>
          <H4 className={classNames(classes.date, dateClass)}>{date}</H4>
          {displayInfo || ''}
        </GridItem>
      </GridContainer>
    );
  };

  renderDayAndInfo = (classes, day) => {
    const { displayInfo, customClass } = this.props;
    const { day: dayClass, container: dayContainer, dot: dayDot } = customClass;

    return (
      <GridContainer
        spacing={0}
        alignItems="center"
        className={classNames(dayContainer)}
      >
        <GridItem>
          <H4 className={classNames(classes.day, dayClass)}>{day}</H4>
        </GridItem>
        <GridItem>
          <div className={classNames(classes.dot, dayDot)}>{THE_DOT}</div>
        </GridItem>
        <GridItem>{displayInfo}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const {
      classes,
      index,
      displayDate,
      displayInfo,
      startTime,
      dayDateFormat,
    } = this.props;

    const day = NODE_HELPERS.renderDayIndex(index);
    const date = NODE_HELPERS.renderDate(
      this.calculateDate(),
      displayDate,
      dayDateFormat,
    );

    switch (displayDate) {
      case dateDisplay.startDate:
      case dateDisplay.weekDay: {
        if (startTime) {
          return this.renderDayAndDate(classes, day, date);
        }
        return this.renderDayOnly(classes, day);
      }
      case dateDisplay.none: {
        if (displayInfo) {
          return this.renderDayAndInfo(classes, day);
        }
        return this.renderDayOnly(classes, day);
      }

      default:
        return this.renderDayOnly(classes, day);
    }
  };
}

DayDateDisplay.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  index: PropTypes.number,
  customClass: PropTypes.object,
  dayDateFormat: PropTypes.string,
  displayInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  // resaga value
  displayDate: PropTypes.string,
  startTime: PropTypes.string,
};

DayDateDisplay.defaultProps = {
  id: 0,
  index: 0,
  customClass: { day: '', date: '' },

  displayDate: null,
  startTime: null,
};

export default compose(
  withStyles(style, { name: 'DayDateDisplay' }),
  resaga(CONFIG_IDS),
  resaga(CONFIG),
)(DayDateDisplay);
