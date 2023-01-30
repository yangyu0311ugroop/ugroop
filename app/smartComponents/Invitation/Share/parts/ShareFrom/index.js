import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT, LINK } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import Name from 'ugcomponents/Person/Name';

export class ShareFrom extends React.PureComponent {
  renderLink = () => {
    const { value } = this.props;
    return <Name id={value} variant={LINK} bold={false} />;
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderLink,
    });
  };
}

ShareFrom.propTypes = {
  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.number,
};

ShareFrom.defaultProps = {
  variant: null,

  value: 0,
};

export default INVITATION_STORE_HOC.selectShareProp({ path: 'shareFrom' })(
  ShareFrom,
);
