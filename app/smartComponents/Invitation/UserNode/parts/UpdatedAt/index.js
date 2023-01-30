import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { DateTimeFromNow } from 'viewComponents/DateTime';

export class UpdatedAt extends React.PureComponent {
  renderTextOnly = () => {
    const { value } = this.props;
    return <DateTimeFromNow dateTime={value} />;
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

UpdatedAt.propTypes = {
  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

UpdatedAt.defaultProps = {
  variant: null,

  value: null,
};

export default INVITATION_STORE_HOC.selectUserNodeProp({ path: 'updatedAt' })(
  UpdatedAt,
);
