import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG, CONFIG_2, CONFIG_3 } from './config';

export class SelectActivityDetail extends PureComponent {
  render = () => {
    const { dataId, children } = this.props;

    return children(dataId);
  };
}

SelectActivityDetail.propTypes = {
  // parent props
  children: PropTypes.func,

  // resaga props
  dataId: PropTypes.number,
};

SelectActivityDetail.defaultProps = {
  dataId: 0,
};

export default compose(
  resaga(CONFIG),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
)(SelectActivityDetail);
