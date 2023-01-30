import { THE_BIG_DOT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import withDayIds from 'smartComponents/Node/types/Template/hocs/withDayIds';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

const FULL_DATE_FORMAT = 'MMMM YYYY';
const SHORT_DATE_FORMAT = 'MMM, ddd';

export class DayDate extends PureComponent {
  state = {};

  baseStartDate = () => {
    const { displayDate, startDate: tourStartDate, weekDay } = this.props;

    if (displayDate === 'startDate') {
      return moment(tourStartDate);
    }

    const date = moment('1/1/2020');

    if (!weekDay) {
      return date;
    }

    return date.weekday(weekDay);
  };

  startDate = () => {
    const { offset = 'P0D' } = this.props;

    return this.baseStartDate().add(moment.duration(offset));
  };

  dayIndex = id => {
    const { dayIds, offset = 'P0D' } = this.props;

    const dayIndex = dayIds.indexOf(id);
    const offsetIndex = EVENT_DATA_HELPERS.durationToDays(offset);

    return dayIndex + offsetIndex;
  };

  renderNoDay = () => {
    const { offset, unplannedText } = this.props;

    const days = EVENT_DATA_HELPERS.durationToDays(offset);

    let relativeText = 'Same day';

    if (days > 0) {
      relativeText = `${days} day${LOGIC_HELPERS.ifElse(
        days > 0,
        's',
        '',
      )} later`;
    }

    return LOGIC_HELPERS.ifElse(offset, relativeText, unplannedText);
  };

  calcDayId = id => {
    if (typeof id !== 'number') {
      return Number.parseInt(id, 10);
    }

    return id;
  };

  renderDayDate = dayId => {
    const { displayDate, dayIds, showDayIndex } = this.props;

    const id = this.calcDayId(dayId);

    if (!id) return '';

    const startDate = this.startDate();
    let dayIndex = dayIds.indexOf(id);

    if (dayIndex === -1) {
      return this.renderNoDay();
    }

    const date = startDate.add(dayIndex, 'd');
    dayIndex = this.dayIndex(id);

    if (displayDate === 'startDate') {
      return `${LOGIC_HELPERS.ifElse(
        showDayIndex,
        `Day ${dayIndex + 1}, `,
        '',
      )}${date.format('D MMM, dddd')}`;
    }

    if (displayDate === 'weekDay') {
      return `Day ${dayIndex + 1}, ${date.format('dddd')}`;
    }

    return `Day ${dayIndex + 1}`;
  };

  dayDate = () => {
    const { id } = this.props;

    if (Array.isArray(id)) {
      return id.map(this.renderDayDate);
    }

    return this.renderDayDate(id);
  };

  renderButton = () => {
    const { button } = this.props;

    if (!button) return null;

    return (
      <>
        <GridItem xs />
        <GridItem>{button}</GridItem>
      </>
    );
  };

  renderUnanchored = () => {
    const { offset } = this.props;

    const days = EVENT_DATA_HELPERS.durationToDays(offset);

    if (!days)
      return (
        <JText gray bold>
          Day not set yet
        </JText>
      );

    return (
      <JText gray bold>
        {days} day{LOGIC_HELPERS.ifElse(days > 1, 's')} later
      </JText>
    );
  };

  renderEventSchedule = () => {
    const {
      displayDate,
      id,
      className,
      dayIds,
      showDayIndex,
      showToday,
      fullDate,
    } = this.props;

    const startDate = this.startDate();
    let dayIndex = dayIds.indexOf(id);

    const isAnchored = dayIds.indexOf(id) !== -1;

    if (!isAnchored) {
      return this.renderUnanchored();
    }

    const date = startDate.add(dayIndex, 'd');
    dayIndex = this.dayIndex(id);

    if (displayDate === 'startDate') {
      const isToday = date.isSame(moment(), 'day');

      return (
        <GridContainer alignItems="baseline" className={className} noWrap>
          {LOGIC_HELPERS.ifElse(
            showDayIndex,
            <>
              <GridItem>
                <JText gray sm uppercase>
                  Day {dayIndex + 1}
                </JText>
              </GridItem>

              <GridItem>{THE_BIG_DOT}</GridItem>
            </>,
          )}
          {LOGIC_HELPERS.ifElse(
            [showToday, isToday],
            <>
              <GridItem>
                <JText danger sm uppercase>
                  Today
                </JText>
              </GridItem>

              <GridItem>{THE_BIG_DOT}</GridItem>
            </>,
          )}
          <GridItem>
            <GridContainer alignItems="baseline" wrap="nowrap">
              {fullDate && (
                <GridItem>
                  <JText gray sm uppercase>
                    {date.format(
                      LOGIC_HELPERS.ifElse([showToday, isToday], 'ddd', 'dddd'),
                    )}
                  </JText>
                </GridItem>
              )}
              <GridItem>
                <JText black sm>
                  {date.format('D')}
                </JText>
              </GridItem>
              <GridItem>
                <JText gray sm uppercase>
                  {date.format(
                    LOGIC_HELPERS.ifElse(
                      fullDate,
                      FULL_DATE_FORMAT,
                      SHORT_DATE_FORMAT,
                    ),
                  )}
                </JText>
              </GridItem>
              {/* <Hidden smUp>
                <GridItem>
                  <JText gray sm uppercase>
                    {date.format(
                      LOGIC_HELPERS.ifElse(
                        this.props.fullDate,
                        'MMMM, YYYY ddd',
                        'MMM, ddd',
                      ),
                    )}
                  </JText>
                </GridItem>
              </Hidden>
              <Hidden xsDown>
                <GridItem>
                  <JText gray sm uppercase>
                    {date.format(
                      LOGIC_HELPERS.ifElse(
                        this.props.fullDate,
                        'MMMM, YYYY dddd',
                        'MMM, ddd',
                      ),
                    )}
                  </JText>
                </GridItem>
              </Hidden> */}
            </GridContainer>
          </GridItem>

          {this.renderButton()}
        </GridContainer>
      );
    }

    if (displayDate === 'weekDay') {
      return (
        <GridContainer alignItems="baseline" className={className}>
          <GridItem>
            <JText bold gray sm uppercase>
              Day
            </JText>
          </GridItem>
          <GridItem>
            <JText black xl>
              {dayIndex + 1}
            </JText>
          </GridItem>
          <GridItem>
            <JText bold gray sm uppercase>
              {date.format('dddd')}
            </JText>
          </GridItem>

          <GridItem xs />
          {this.renderButton()}
        </GridContainer>
      );
    }

    return (
      <GridContainer alignItems="baseline" className={className}>
        <GridItem>
          <JText bold gray sm uppercase>
            Day
          </JText>
        </GridItem>
        <GridItem>
          <JText black xl>
            {dayIndex + 1}
          </JText>
        </GridItem>

        <GridItem xs />
        {this.renderButton()}
      </GridContainer>
    );
  };

  renderEventHeader = () => {
    const { classes, displayDate, id, dayIds } = this.props;

    const dayIndex = dayIds.indexOf(id);

    if (dayIndex === -1) return null;

    const date = this.startDate().add(dayIndex, 'd');

    if (displayDate === 'startDate') {
      return (
        <GridItem>
          <GridContainer alignItems="center" direction="column" spacing={0}>
            <GridItem>
              <JText uppercase spacing2 danger>
                {date.format('MMM')}
              </JText>
            </GridItem>
            <GridItem className={classes.offsetTop}>
              <JText black xxl>
                {date.format('D')}
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }

    return null;
  };

  render = () => {
    const { children, eventSchedule, eventHeader } = this.props;

    if (eventHeader) {
      return this.renderEventHeader();
    }

    if (eventSchedule) {
      return this.renderEventSchedule();
    }

    const dayDate = this.dayDate();

    return LOGIC_HELPERS.ifFunction(children, [dayDate], dayDate);
  };
}

DayDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // day id
  unplannedText: PropTypes.string,
  offset: PropTypes.string, // moment duration
  showDayIndex: PropTypes.bool,
  showToday: PropTypes.bool,
  className: PropTypes.string,
  button: PropTypes.node,
  children: PropTypes.node,
  eventSchedule: PropTypes.bool,
  eventHeader: PropTypes.bool,
  fullDate: PropTypes.bool,

  // resaga props
  displayDate: PropTypes.string,
  startDate: PropTypes.string,
  weekDay: PropTypes.number,
  dayIds: PropTypes.array,
};

DayDate.defaultProps = {
  unplannedText: 'No day',
  dayIds: [],
  weekDay: 0,
};

export default compose(
  withStyles(styles, { name: 'DayDate' }),
  withDayIds,
  resaga(CONFIG),
)(DayDate);
