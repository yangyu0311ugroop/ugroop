import { HEADING, THE_LONG_DASH } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import HomeTimeLabel from 'viewComponents/Event/components/HomeTimeLabel';
import { CONFIG } from './config';
import styles from './styles';

export class HeaderTime extends PureComponent {
  formatTime = time => {
    const { variant } = this.props;

    if (!time) return null;

    if (variant === HEADING) {
      return MOMENT_HELPERS.renderRelativeTime(time);
    }

    return time.format(
      LOGIC_HELPERS.ifElse(
        MOMENT_HELPERS.isYearThisYear(time),
        `ddd, D MMM`,
        `ddd, D MMM [']YY`,
      ),
    );
  };

  duration = () => {
    const {
      startTimeMoment,
      startTimeMode,
      endTimeMoment,
      endTimeMode,
    } = this.props;

    if (NODE_HELPERS.hasDuration(startTimeMode, endTimeMode)) {
      const duration = NODE_HELPERS.calculateDuration(
        startTimeMoment,
        endTimeMoment,
      );
      return MOMENT_HELPERS.renderDurationHoursMinutes(duration);
    }
    return null;
  };

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

  renderDateTime = () => {
    const {
      startTimeMode,
      startTimeMoment,
      startTimeValue,
      endTimeMode,
      endTimeMoment,
      endTimeValue,
    } = this.props;

    if (startTimeMoment && NODE_HELPERS.withTime(startTimeMode)) {
      if (endTimeMoment && NODE_HELPERS.withTime(endTimeMode)) {
        const days = NODE_HELPERS.calculateDayDuration(
          startTimeValue,
          endTimeValue,
        ).asDays();

        return (
          <>
            &nbsp;at {startTimeMoment.format('H:mm')} {THE_LONG_DASH}{' '}
            {endTimeMoment.format('H:mm')}
            {LOGIC_HELPERS.ifElse(days > 0, <JText sm> +{days}</JText>)}
          </>
        );
      }

      return <>&nbsp;at {startTimeMoment.format('H:mm')}</>;
    }

    return null;
  };

  renderHeading = () => {
    const { startTimeMoment } = this.props;

    const time = this.renderDateTime();

    return (
      <GridItem>
        <JText danger uppercase>
          {this.formatTime(startTimeMoment)}
          {time}
        </JText>
      </GridItem>
    );
  };

  render = () => {
    const { startTimeMoment, variant } = this.props;

    if (variant === HEADING) {
      return this.renderHeading();
    }

    const time = this.renderDateTime();

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={2} wrap="nowrap">
          <GridItem>
            <Icon icon="lnr-clock3" size="small" color="gray" />
          </GridItem>
          <GridItem>
            <JText black ellipsis>
              {this.formatTime(startTimeMoment)}
              {time}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

HeaderTime.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  startTimeMode: PropTypes.string,
  endTimeMode: PropTypes.string,
  startTimeValue: PropTypes.string,
  endTimeValue: PropTypes.string,

  // resaga props
  startTimeMoment: PropTypes.object,
  endTimeMoment: PropTypes.object,
};

HeaderTime.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'HeaderTime' }),
  resaga(CONFIG),
)(HeaderTime);
