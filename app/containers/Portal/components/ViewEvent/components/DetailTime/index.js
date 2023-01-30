import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import HomeTimeLabel from 'viewComponents/Event/components/HomeTimeLabel';
import { CONFIG } from './config';
import styles from './styles';

export class DetailTime extends PureComponent {
  formatTime = time =>
    time &&
    time.format(
      LOGIC_HELPERS.ifElse(
        MOMENT_HELPERS.isYearThisYear(time),
        `ddd, D MMM`,
        `ddd, D MMM [']YY`,
      ),
    );

  renderEndTime = (time, mode) =>
    NODE_HELPERS.withTime(mode) && (
      <GridItem>
        <JText danger xl>
          {time.format('H:mm')}
        </JText>
        <JText gray sm>
          {MOMENT_HELPERS.appendZone(time, '')}
        </JText>
      </GridItem>
    );

  renderTime = (time, mode) =>
    time && (
      <GridItem>
        <GridContainer
          direction="column"
          spacing={0}
          title={MOMENT_HELPERS.renderDayDateTimeZone(time)}
        >
          <GridItem>
            <JText black>{this.formatTime(time)}</JText>
          </GridItem>
          {this.renderEndTime(time, mode)}
          <GridItem>
            <JText gray>
              <HomeTimeLabel calculatedTime={time} calculatedMode={mode} />
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );

  renderDayCount = () => {
    const { startTimeMoment, endTimeMoment, unitLabel } = this.props;

    const dayCount =
      MOMENT_HELPERS.dayCount(startTimeMoment, endTimeMoment) + 1;

    return (
      dayCount > 1 && (
        <GridItem>
          <GridContainer spacing={0} alignItems="center" direction="column">
            <GridItem>
              <JText black xxl>
                {dayCount}
              </JText>
            </GridItem>
            <GridItem>
              <JText sm uppercase gray>
                {unitLabel}
                {LOGIC_HELPERS.ifElse(dayCount > 1, 's')}
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
      )
    );
  };

  render = () => {
    const {
      classes,
      startLabel,
      startTimeMode,
      startTimeMoment,
      endLabel,
      endTimeMode,
      endTimeMoment,
      hideEndDate,
    } = this.props;

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem xs>
          <GridContainer direction="column" className={classes.borderRight}>
            <GridItem>
              <JText gray sm>
                {startLabel}
              </JText>
            </GridItem>

            {this.renderTime(startTimeMoment, startTimeMode)}
          </GridContainer>
        </GridItem>

        <GridItem xs>
          {!hideEndDate && (
            <GridContainer direction="column">
              <GridItem>
                <JText gray sm>
                  {endLabel}
                </JText>
              </GridItem>

              {this.renderTime(endTimeMoment, endTimeMode)}
            </GridContainer>
          )}
        </GridItem>

        {this.renderDayCount()}
      </GridContainer>
    );
  };
}

DetailTime.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startTimeMode: PropTypes.string,
  endTimeMode: PropTypes.string,
  unitLabel: PropTypes.string,
  hideEndDate: PropTypes.bool,

  // resaga props
  startTimeMoment: PropTypes.object,
  endTimeMoment: PropTypes.object,
};

DetailTime.defaultProps = {
  startLabel: 'Starting',
  endLabel: 'Ending',
  unitLabel: 'Day',
};

export default compose(
  withStyles(styles, { name: 'DetailTime' }),
  resaga(CONFIG),
)(DetailTime);
