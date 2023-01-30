import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withLogout } from 'smartComponents/Authentication/hoc';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
export class LogoutLink extends React.PureComponent {
  render = () => {
    const { children, logout, ...rest } = this.props;
    return (
      <Button onClick={logout} variant={VARIANTS.INLINE} {...rest}>
        {children}
      </Button>
    );
  };
}

LogoutLink.propTypes = {
  // hoc
  logout: PropTypes.func.isRequired,

  // parent
  children: PropTypes.any,
};

LogoutLink.defaultProps = {
  children: 'Logout',
};

export default compose(withLogout)(LogoutLink);
