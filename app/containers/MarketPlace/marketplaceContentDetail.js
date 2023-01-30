import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductDetail from './products/productDetail';

export function MarketplaceContentDetail(props) {
  const { match } = props;
  const category = match.params.category;
  const id = parseInt(match.params.id, 10);
  return <ProductDetail category={category} id={id} />;
}

MarketplaceContentDetail.propTypes = {
  match: PropTypes.object,
};

MarketplaceContentDetail.defaultProps = {};

export default compose(withRouter)(React.memo(MarketplaceContentDetail));
