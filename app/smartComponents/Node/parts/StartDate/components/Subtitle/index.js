import { ACTIVE, DEFAULT, PAST, UPCOMING } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import momentjs from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import UGIcon from 'viewComponents/Icon';
import styles from './styles';

export class Subtitle extends PureComponent {
  startOf = date =>
    momentjs(date)
      .hour(0)
      .minute(0)
      .second(0);

  endOf = date =>
    momentjs(date)
      .hour(23)
      .minute(59)
      .second(59);

  status = (now = momentjs()) => {
    const { startDate: date, duration } = this.props;

    const startDate = momentjs(date)
      .hour(0)
      .minute(0)
      .second(0);

    const endDate = momentjs(startDate)
      .add(duration - 1, 'day')
      .hour(23)
      .minute(59)
      .second(59);

    const past = now.isAfter(endDate);
    if (past) return PAST;

    const active = now.isBetween(startDate, endDate);
    if (active) return ACTIVE;

    // const upcoming = now.isBefore(startDate);
    return UPCOMING;
  };

  renderIcon = status => {
    const { classes } = this.props;

    switch (status) {
      case PAST:
        return <UGIcon size="xxxs" icon="ug-arrival3" paddingRight />;

      case ACTIVE:
        return (
          <GridItem>
            <div className={classes.live}>LIVE</div>
          </GridItem>
        );

      default:
        return <UGIcon size="xxxs" icon="ug-departure3" paddingRight />;
    }
  };

  renderPast = ({ daysFromEnd, endDateFromTomorrow }) =>
    LOGIC_HELPERS.switchCase(daysFromEnd, {
      0: 'Finished yesterday',
      [DEFAULT]: `Finished ${momentjs(endDateFromTomorrow).fromNow()}`,
    });

  renderActive = ({ daysFromStart, daysFromEnd, endDate, endOfToday }) => {
    const { classes } = this.props;

    const ends = LOGIC_HELPERS.switchCase(daysFromEnd, {
      0: 'Last day',
      1: 'Finishes tomorrow',
      [DEFAULT]: `Finishes ${momentjs(endDate).from(endOfToday)}`,
    });

    return (
      <span className={classes.ongoing}>
        Day {daysFromStart} ({ends})
      </span>
    );
  };

  renderUpcoming = ({ daysFromStart, startDate, startOfToday }) =>
    LOGIC_HELPERS.switchCase(daysFromStart, {
      1: 'Starts tomorrow',
      [DEFAULT]: `Starts ${startDate.from(startOfToday)}`,
    });

  renderText = (status, now = momentjs()) => {
    const { startDate: date, duration } = this.props;

    const startDate = this.startOf(date);

    const startOfToday = this.startOf();
    const endOfToday = this.endOf();
    const endDate = this.endOf(startDate).add(duration - 1, 'day');

    const daysFromStart = now.diff(startDate, 'day') + 1;
    const daysFromEnd = endDate.diff(now, 'day');
    const endDateFromTomorrow = this.startOf(endDate).add(1, 'day');

    switch (status) {
      case PAST:
        return this.renderPast({ daysFromEnd, endDateFromTomorrow });

      case ACTIVE:
        return this.renderActive({
          daysFromStart,
          daysFromEnd,
          endDate,
          endOfToday,
        });

      default:
        return this.renderUpcoming({ daysFromStart, startDate, startOfToday });
    }
  };

  render = () => {
    const {
      component: Component,
      className,
      startDate,
      displayDate,
    } = this.props;

    if (!startDate || displayDate !== 'startDate') {
      return null;
    }

    const status = this.status();

    return (
      <Component>
        <GridContainer
          alignItems="center"
          className={className}
          wrap="nowrap"
          spacing={0}
        >
          <GridItem>{this.renderIcon(status)}</GridItem>
          <GridItem>{this.renderText(status)}</GridItem>
        </GridContainer>
      </Component>
    );
  };
}

Subtitle.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  displayDate: PropTypes.string,
  startDate: PropTypes.string,
  duration: PropTypes.number,
  component: PropTypes.any,
  className: PropTypes.string,

  // resaga props
};

Subtitle.defaultProps = {};

export default compose(withStyles(styles, { name: 'Subtitle' }))(Subtitle);
