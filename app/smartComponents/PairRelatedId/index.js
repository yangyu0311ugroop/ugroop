import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class PairRelatedId extends PureComponent {
  render = () => {
    const { children, relatedIds } = this.props;

    return children(relatedIds);
  };
}

PairRelatedId.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  relatedIds: PropTypes.array,
};

PairRelatedId.defaultProps = {
  relatedIds: [],
};

export default compose(resaga(CONFIG))(PairRelatedId);
