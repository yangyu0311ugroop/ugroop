import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import GridItem from 'components/GridItem';
import UserNodeList from '../UserNodeList';
import { CONFIG } from './config';

export class UserNodeListByOwner extends React.PureComponent {
  handleRenderContributor = () => <GridItem />;

  render = () => {
    const { id, userId } = this.props;
    return (
      <UserNodeList
        userId={userId}
        nodeId={id}
        onRenderContributor={this.handleRenderContributor}
      />
    );
  };
}

UserNodeListByOwner.propTypes = {
  // parent
  id: PropTypes.number,

  // resaga value
  userId: PropTypes.number,
};

UserNodeListByOwner.defaultProps = {
  id: null,

  userId: null,
};

export default resaga(CONFIG)(UserNodeListByOwner);
