import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import DataField from 'ugcomponents/Inputs/DataField';
import { CONFIG } from './config';

export class RootNodeId extends PureComponent {
  render = () => {
    const { name, rootNodeId } = this.props;

    return (
      <DataField name={name} value={rootNodeId} currentValue={rootNodeId} />
    );
  };
}

RootNodeId.propTypes = {
  // hoc props

  // parent props
  name: PropTypes.string,

  // resaga props
  rootNodeId: PropTypes.number,
};

RootNodeId.defaultProps = {
  rootNodeId: -1,
  name: 'rootNodeId',
};

export default compose(resaga(CONFIG))(RootNodeId);
