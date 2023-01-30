import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';

export class Status extends React.PureComponent {
  renderTextOnly = () => {
    const { value } = this.props;
    return value;
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

Status.propTypes = {
  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

Status.defaultProps = {
  variant: null,

  value: null,
};

export default INVITATION_STORE_HOC.selectShareProp({ path: 'status' })(Status);
