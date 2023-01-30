import React from 'react';
import _ from 'lodash';

const withPropFilter = ({ filter }) => WrappedComponent => {
  class PropFilter extends React.PureComponent {
    render = () => <WrappedComponent {..._.omit(this.props, filter)} />;
  }

  PropFilter.propTypes = {};

  PropFilter.defaultProps = {};

  return PropFilter;
};

export default withPropFilter;
