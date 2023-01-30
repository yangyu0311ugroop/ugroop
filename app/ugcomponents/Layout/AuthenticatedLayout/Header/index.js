import PropTypes from 'prop-types';
/**
 * Created by quando on 29/6/17.
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import AdminHeader from '../../../NaviBar/AdminNavBar/index';
import { menuData } from './menuData';

export const Header = props => (
  <div>
    <AdminHeader menuData={menuData} {...props} />
  </div>
);

Header.propTypes = {
  location: PropTypes.object.isRequired,
};

Header.defaultProps = {};

export default compose(withRouter)(Header);
