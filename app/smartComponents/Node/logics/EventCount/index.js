import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG, CONFIG1, CONFIG2, CONFIG3 } from './config';

export class EventCount extends PureComponent {
  render = () => {
    const { children, ...rest } = this.props;
    return children(rest);
  };
}

EventCount.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,
  id: PropTypes.number,

  // resaga props
  eventCounts: PropTypes.object,
};

EventCount.defaultProps = {
  eventCounts: {},
};

export default compose(
  resaga(CONFIG),
  resaga(CONFIG1),
  resaga(CONFIG2),
  resaga(CONFIG3),
)(EventCount);
