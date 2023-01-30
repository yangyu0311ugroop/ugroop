import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ALL_VALUES } from './config';

export class GroupBy extends PureComponent {
  render = () => {
    const { children, values } = this.props;
    const { groupIds, groupData } = values;

    return children({ groupIds, groupData });
  };
}

GroupBy.propTypes = {
  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  values: PropTypes.object,
};

GroupBy.defaultProps = {
  values: {},
};

export default compose(resaga(ALL_VALUES))(GroupBy);
