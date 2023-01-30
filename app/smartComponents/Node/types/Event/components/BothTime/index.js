import { THE_LONG_DASH } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import moment from 'moment';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { CONFIG } from './config';
import styles from './styles';

export class BothTime extends PureComponent {
  index = () => {
    const { startTimeMoment, dayDate } = this.props;

    const currentDate = moment(dayDate);

    const date = moment(startTimeMoment)
      .year(currentDate.year())
      .month(currentDate.month())
      .date(currentDate.date());

    return (
      NODE_HELPERS.calculateDayDuration(startTimeMoment, date).asDays() + 1
    );
  };

  dayCount = () => {
    const { startTimeMoment, endTimeMoment } = this.props;

    return MOMENT_HELPERS.dayCount(startTimeMoment, endTimeMoment);
  };

  label = () => {
    const { position, labelStart, labelMiddle, labelEnd } = this.props;

    if (position === 'start') return labelStart;
    if (position === 'middle') return labelMiddle;
    if (position === 'end') return labelEnd;

    return null;
    // if (position === 'start') return 'DEPARTING';
    // if (position === 'end') return 'ARRIVING';
    //
    // return 'EN-ROUTE';
  };

  renderIndex = () => {
    const { smDown, withoutDay } = this.props;

    const dayCount = this.dayCount();

    if (!dayCount || withoutDay) return null;

    const label = this.label();
    const dayIndex = this.renderDayIndex();

    return (
      <GridItem>
        <JText gray xs>
          {label}
          {label && smDown && dayIndex && <>{THE_LONG_DASH}</>}
          {smDown && dayIndex}
        </JText>
      </GridItem>
    );
  };

  renderDayIndex = () => {
    const { withoutDay } = this.props;

    const dayCount = this.dayCount();

    if (!dayCount || withoutDay) return null;

    const index = this.index();

    return (
      dayCount > 0 && (
        <JText gray xs uppercase>
          {' '}
          Day {index}/{dayCount + 1}
        </JText>
      )
    );
  };

  renderStartTime = (
    time = this.props.startTimeMoment,
    mode = this.props.startTimeMode,
  ) => {
    const { smDown } = this.props;

    if (!time || !NODE_HELPERS.withTime(mode)) return null;

    return (
      <GridItem>
        <JText danger sm={smDown}>
          {time.format('H:mm')}
        </JText>
      </GridItem>
    );
  };

  renderEndTime = () => {
    const { endTimeMoment, endTimeMode, smDown, hideEndTime } = this.props;

    if (!endTimeMoment || !NODE_HELPERS.withTime(endTimeMode) || hideEndTime)
      return null;

    const days = this.dayCount();

    return (
      <>
        {smDown && (
          <GridItem>
            <JText danger sm>
              {THE_LONG_DASH}
            </JText>
          </GridItem>
        )}
        <GridItem>
          <JText gray={!smDown} danger={smDown} sm>
            {endTimeMoment.format('H:mm')}
            {days > 0 && <>+{days}</>}
          </JText>
        </GridItem>
      </>
    );
  };

  render = () => {
    const {
      className,
      smDown,
      position,
      startTimeMode,
      endTimeMoment,
      endTimeMode,
      withoutDay,
      accommodation,
    } = this.props;

    const days = this.dayCount();

    if (
      !NODE_HELPERS.withTime(startTimeMode) &&
      !NODE_HELPERS.withTime(endTimeMode) &&
      !days
    ) {
      return null;
    }

    const renderStartTime = this.renderStartTime();
    const renderEndTime = this.renderEndTime();
    const renderIndex = this.renderIndex();

    let time = (
      <>
        {renderStartTime}
        {renderEndTime}
      </>
    );

    if (days > 0) {
      if (withoutDay) {
        if (
          !NODE_HELPERS.withTime(startTimeMode) &&
          !NODE_HELPERS.withTime(endTimeMode)
        ) {
          const daysCount = LOGIC_HELPERS.ifElse(accommodation, days, days + 1);
          const text = LOGIC_HELPERS.ifElse(accommodation, 'night', 'day');

          time = (
            <GridItem>
              <JText gray sm>
                {daysCount} {text}
                {daysCount > 1 && 's'}
              </JText>
            </GridItem>
          );
        }
      } else if (position === 'start') {
        time = renderStartTime;
      } else if (position === 'end') {
        time = this.renderStartTime(endTimeMoment, endTimeMode);
      } else if (position === 'middle') {
        time = null;
      }
    }

    const gridProps = smDown
      ? { alignItems: 'baseline', wrap: 'nowrap' }
      : { direction: 'column', spacing: 0 };

    return (
      <GridItem>
        <div className={className}>
          <GridContainer {...gridProps}>
            {!smDown && renderIndex}
            {time}
            {smDown && renderIndex}
            {!smDown && this.renderDayIndex()}
          </GridContainer>
        </div>
      </GridItem>
    );
  };
}

BothTime.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  className: PropTypes.string,
  position: PropTypes.string,
  startTimeMode: PropTypes.string,
  endTimeMode: PropTypes.string,
  dayDate: PropTypes.string,
  hideEndTime: PropTypes.bool,
  withoutDay: PropTypes.bool,
  accommodation: PropTypes.bool,
  labelStart: PropTypes.string,
  labelMiddle: PropTypes.string,
  labelEnd: PropTypes.string,

  // resaga props
  startTimeMoment: PropTypes.object,
  endTimeMoment: PropTypes.object,
};

BothTime.defaultProps = {
  labelStart: 'STARTING',
  labelMiddle: '',
  labelEnd: 'ENDING',
};

export default compose(
  withStyles(styles, { name: 'BothTime' }),
  resaga(CONFIG),
)(BothTime);
