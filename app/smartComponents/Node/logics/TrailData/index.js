import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { DAY, TEMPLATE } from 'utils/modelConstants';
import { GET_TRAIL, GET_DATA } from './config';

export class TrailData extends PureComponent {
  dayId = () => {
    const { trail, types } = this.props;

    const id = types.indexOf(DAY);

    return id !== -1 ? trail[id] : null;
  };

  dayIndex = () => {
    const { types } = this.props;

    return types.reduce(
      (accumulate, type) => (type === DAY ? accumulate + 1 : accumulate),
      0,
    );
  };

  templateId = () => {
    const { trail, types } = this.props;

    const id = types.indexOf(TEMPLATE);

    return id !== -1 ? trail[id] : null;
  };

  render = () => {
    const { children } = this.props;

    return children({
      dayId: this.dayId(),
      templateId: this.templateId(),
      dayIndex: this.dayIndex(),
    });
  };
}

TrailData.propTypes = {
  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  trail: PropTypes.array,
  types: PropTypes.array,
};

TrailData.defaultProps = {
  trail: [],
  types: [],
};

export default compose(
  resaga(GET_TRAIL),
  resaga(GET_DATA),
)(TrailData);
