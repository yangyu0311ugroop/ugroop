import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TOUR_ROLES } from 'datastore/invitationStore/constants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';

export class Role extends React.PureComponent {
  renderTextOnly = () => {
    const { value } = this.props;
    return TOUR_ROLES[value];
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

Role.propTypes = {
  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

Role.defaultProps = {
  variant: null,

  value: null,
};

export default INVITATION_STORE_HOC.selectUserNodeProp({ path: 'role' })(Role);
