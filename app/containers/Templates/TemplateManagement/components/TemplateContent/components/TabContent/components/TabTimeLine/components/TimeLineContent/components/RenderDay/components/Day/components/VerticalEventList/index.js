import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import { EVENT_GROUPINGS } from 'utils/constants/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withEventsOnDay } from 'smartComponents/Node/hoc';
import { TooltipIconButton } from 'containers/Templates/TemplateManagement/components/Event/components/Buttons';
import style from './style';

export class VerticalEventList extends React.PureComponent {
  renderEventIcon = ({ id, position }) => {
    const { classes, id: dayId } = this.props;
    return (
      <GridItem key={`${id}.${position}`} className={classes.item}>
        <TooltipIconButton
          id={id}
          dayId={dayId}
          position={position}
          tooltipPlacement="right-start"
          showSublabel
          showSubIcon
        />
      </GridItem>
    );
  };

  renderEventIcons = eventsByTimeZoneId =>
    eventsByTimeZoneId.map(events => {
      const { id, position } = events[0];
      return (
        <React.Fragment key={`${id}.${position}`}>
          {events.map(this.renderEventIcon)}
        </React.Fragment>
      );
    });

  render = () => {
    const { classes, events, hasChecklist } = this.props;
    const eventsByTimeZoneId = events.reduce(
      EVENT_HELPERS.eventsByTimeZoneIdReducer,
      [],
    );
    const multiRow = eventsByTimeZoneId.length > 1;

    return (
      !!eventsByTimeZoneId.length && (
        <div
          className={classNames(
            classes.root,
            LOGIC_HELPERS.ifElse(
              hasChecklist,
              classes.checkListPadding,
              classes.checkListOffsetTop,
            ),
          )}
        >
          <GridContainer direction="column" spacing={0}>
            {this.renderEventIcons(eventsByTimeZoneId, multiRow)}
          </GridContainer>
        </div>
      )
    );
  };
}

VerticalEventList.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,

  // parent
  id: PropTypes.number.isRequired,
  hasChecklist: PropTypes.bool,
};

VerticalEventList.defaultProps = {
  hasChecklist: false,
};

export default compose(
  withEventsOnDay({ grouping: EVENT_GROUPINGS.nonSingleDayEvents }),
  withStyles(style, {
    name: 'TemplateManagement.TabTimeLine.Day.VerticalEventList',
  }),
)(VerticalEventList);
