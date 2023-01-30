import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class Children extends PureComponent {
  render = () => {
    const { children, ids } = this.props;

    if (typeof children === 'function') {
      return children({ ids });
    }

    return null;
  };
}

Children.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.any,

  // resaga props
  ids: PropTypes.array,
};

Children.defaultProps = {
  ids: [],
};

export default compose(resaga(CONFIG))(Children);
