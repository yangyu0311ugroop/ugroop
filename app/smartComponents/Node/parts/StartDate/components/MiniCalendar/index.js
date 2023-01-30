/* eslint-disable react/no-array-index-key */
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import StyleMiniCalendar from 'components/MiniCalendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { scroller } from 'react-scroll/modules';
import { compose } from 'redux';
import resaga from 'resaga';
import { scrollOptions } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG, CONFIG_TAB_ID } from './config';
import styles from './styles';

export class MiniCalendar extends PureComponent {
  onClickCell = (selectedId, day) => () => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      return onClick(selectedId, day);
    }

    this.props.resaga.setValue({ selectedId });
    return scroller.scrollTo(`scroller-node-${selectedId}`, scrollOptions);
  };

  renderDayDate = (day, dayId) => {
    const { displayDate, dayIds } = this.props;

    return displayDate === 'startDate'
      ? LOGIC_HELPERS.ifElse(
          day.date() === 1,
          day.format('D MMM'),
          day.format('D'),
        )
      : dayIds.indexOf(dayId) + 1;
  };

  renderDayContent = (day, dayId) => {
    const { classes, selectedId } = this.props;

    if (!day) return null;

    const isToday = day.isSame(moment(), 'day');

    const active = LOGIC_HELPERS.ifElse(selectedId, selectedId === dayId);
    const enabled = true;

    return (
      <div // eslint-disable-line
        className={classnames(
          classes.dayContent,
          LOGIC_HELPERS.ifElse(enabled, classes.dayContentEnabled),
          LOGIC_HELPERS.ifElse(enabled && isToday, classes.today),
          LOGIC_HELPERS.ifElse(active, classes.cellActive),
          LOGIC_HELPERS.ifElse([active, isToday], classes.cellTodayActive),
        )}
        onClick={LOGIC_HELPERS.ifElse(enabled, this.onClickCell(dayId, day))}
      >
        <GridContainer
          alignItems="center"
          spacing={0}
          wrap="nowrap"
          className={classes.fullHeight}
        >
          <GridItem className={classes.fullHeight} xs>
            &nbsp;
          </GridItem>
          <GridItem>
            <JText>{enabled && this.renderDayDate(day, dayId)}</JText>
          </GridItem>
          <GridItem className={classes.fullHeight} xs>
            &nbsp;
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  renderDay = day => {
    const { dayIds } = this.props;

    const startDate = this.startDate();

    const dayIndex = day ? day.diff(startDate, 'day') : 0;
    const dayId = dayIds[dayIndex];

    return this.renderDayContent(day, dayId);
  };

  startDate = () => {
    const { displayDate, startDate: tourStartDate, weekDay } = this.props;

    let startDate = moment(tourStartDate);

    if (displayDate === 'weekDay') {
      startDate = moment('1/1/2020').weekday(weekDay);
    } else if (displayDate !== 'startDate') {
      startDate = moment('1/1/2020').weekday(0);
    }

    return startDate;
  };

  render = () => {
    const { displayDate, duration, card, selectedId, dayIds } = this.props;

    const startDate = this.startDate();
    const selectedDay =
      selectedId && moment.utc(startDate).add(dayIds.indexOf(selectedId), 'd');

    const renderMiniCalendar = (
      <StyleMiniCalendar
        displayDate={displayDate}
        startDate={startDate}
        duration={duration}
        renderDayContent={this.renderDay}
        selectedDay={selectedDay}
      />
    );

    if (!card) {
      return renderMiniCalendar;
    }

    return (
      <GridItem>
        <GridContainer card direction="column">
          <GridItem>{renderMiniCalendar}</GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

MiniCalendar.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  startDate: PropTypes.string,
  displayDate: PropTypes.string,
  duration: PropTypes.number,
  selectedId: PropTypes.number,
  weekDay: PropTypes.number,
  card: PropTypes.bool,
  onClick: PropTypes.func,

  // resaga props
  dayIds: PropTypes.array,
};

MiniCalendar.defaultProps = {
  dayIds: [],
};

export default compose(
  withStyles(styles, { name: 'MiniCalendar' }),
  resaga(CONFIG_TAB_ID),
  resaga(CONFIG),
)(MiniCalendar);
