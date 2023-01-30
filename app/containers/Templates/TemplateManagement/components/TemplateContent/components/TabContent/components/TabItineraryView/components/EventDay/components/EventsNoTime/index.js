import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_GROUPINGS } from 'utils/constants/events';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withEventsOnDay } from 'smartComponents/Node/hoc';
import EventIcon from 'containers/Templates/TemplateManagement/components/Event/components/Buttons/components/TooltipIconButton';
import {
  EVENT_ICON_MARGIN,
  EVENT_ICON_SIZE,
} from 'containers/Templates/TemplateManagement/components/Event/constants';
import { NODE_HAS_TIMES } from 'utils/constants/nodes';
import styles from './styles';
import m from '../../messages';

const PropperProps = {
  style: { top: EVENT_ICON_SIZE - EVENT_ICON_MARGIN },
};

export class EventsNoTime extends PureComponent {
  renderEventIcon = ({ id, position, dayCount }) => {
    const { classes, id: dayId } = this.props;
    return (
      <GridItem key={`${id}.${position}`} xs={6} sm={3} md={2}>
        <div className={classes.btns}>
          <EventIcon
            id={id}
            dayId={dayId}
            position={position}
            PopperProps={PropperProps}
            showLabel
            showSubIcon={dayCount > 0}
          />
        </div>
      </GridItem>
    );
  };

  render = () => {
    const { classes, events } = this.props;
    return (
      !!events.length && (
        <GridItem className={classes.root}>
          <div className={classes.noTimeContainerPadding}>
            <p className={classes.text}>
              <M {...m.noTimeDayEvent} />
            </p>
            <GridContainer className={classes.container}>
              {events.map(this.renderEventIcon)}
            </GridContainer>
          </div>
        </GridItem>
      )
    );
  };
}

EventsNoTime.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  events: PropTypes.array,

  // parent for hoc (note: defaultProps won't be passed to hoc)
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  hasTime: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
};

EventsNoTime.defaultProps = {};

export default compose(
  withEventsOnDay({
    grouping: EVENT_GROUPINGS.singleDayAndPinnedEvents,
    hasTime: NODE_HAS_TIMES.withoutTime,
    hideCancelled: true,
  }),
  withStyles(styles, { name: 'EventsNoTime' }),
)(EventsNoTime);
