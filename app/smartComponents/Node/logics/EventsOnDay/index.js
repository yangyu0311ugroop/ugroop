import React from 'react';
import PropTypes from 'prop-types';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { withEventsOnDay } from 'smartComponents/Node/hoc';

export class EventsOnDay extends React.PureComponent {
  render = () => {
    const { children, grouping, ...props } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [props]);
  };
}

EventsOnDay.propTypes = {
  // hoc
  events: PropTypes.array,

  // parent
  children: PropTypes.func,

  // parent for hoc (note: defaultProps won't be passed to hoc)
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  grouping: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // eslint-disable-line react/no-unused-prop-types
  hasTime: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

EventsOnDay.defaultProps = {
  events: [],

  children: null,
};

export default withEventsOnDay()(EventsOnDay);
