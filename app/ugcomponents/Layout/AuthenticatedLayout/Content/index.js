import PropTypes from 'prop-types';
/**
 * Created by quando on 29/6/17.
 */
import React from 'react';
import AdminContainer from './UGAdminContainer/index';
import AdminContentWrapper from './UGAdminContentWrapper/index';
import AdminContent from './UGAdminContentWrapper/AdminContent/index';

const Content = ({ children }) => (
  <AdminContainer>
    <AdminContentWrapper>
      <AdminContent>{children}</AdminContent>
    </AdminContentWrapper>
  </AdminContainer>
);

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;
