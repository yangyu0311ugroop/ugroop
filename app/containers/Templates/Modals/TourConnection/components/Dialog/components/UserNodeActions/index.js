import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import GridItem from 'components/GridItem';
import RemoveUser from 'containers/Templates/Modals/ShareList/components/RemoveUser';
import { DEFAULT } from 'appConstants';
import { CONFIG } from './config';

export class UserNodeActions extends React.PureComponent {
  render = () => {
    const {
      nodeId,
      userId,
      onRemoveUser,
      variant,
      role,
      removeAll,
    } = this.props;
    return (
      <GridItem>
        <RemoveUser
          nodeId={nodeId}
          shareToUserId={userId}
          removeAll={removeAll}
          variant={variant}
          handleParentSuccess={onRemoveUser}
          role={role}
        />
      </GridItem>
    );
  };
}

UserNodeActions.propTypes = {
  // parent
  onRemoveUser: PropTypes.func,
  variant: PropTypes.string,
  removeAll: PropTypes.bool,

  // resaga value
  userId: PropTypes.number,
  nodeId: PropTypes.number,
  role: PropTypes.string,
};

UserNodeActions.defaultProps = {
  onRemoveUser: null,

  userId: null,
  nodeId: null,
  variant: DEFAULT,
  removeAll: true,
};

export default compose(resaga(CONFIG))(UserNodeActions);
