import React, { useEffect } from 'react';
import _ from 'lodash';
import resaga from 'resaga';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  GET_NODES_VIA_FILTER,
  GET_PUBLISHER_IDS,
  MARKET_API,
  NODE_API,
} from '../../apis/constants';
import GridContainer from '../../components/GridContainer';
import { makeStyles } from '../../components/material-ui';
import { parseQueryParam } from '../../utils/helpers/url';
import ProductLists from './products/productLists';
import GridItem from '../../components/GridItem';
import {
  makeAllProductIdsFromAllCategory,
  makeSelectCategoryLists,
  makeAllPublisherIds,
} from './dataStore/selectors';

const styles = () => ({
  root: {},
  grow: {
    flex: '1',
  },
  gridItem: {
    width: '100%',
  },
});

const useStyles = makeStyles(styles);
function MarketplaceCategoryListContent(props) {
  const classes = useStyles();
  const { categoryLists } = props;
  useEffect(() => {
    const ids = _.flatten(props.productList);
    const filter = {
      where: { id: { inq: ids } },
      include: ['children', 'photos'],
    };
    props.resaga.dispatchTo(NODE_API, GET_NODES_VIA_FILTER, {
      payload: {
        filter: JSON.stringify(filter),
      },
    });
  }, [props.productList]);

  useEffect(() => {
    props.resaga.dispatchTo(MARKET_API, GET_PUBLISHER_IDS, {
      payload: {
        query: JSON.stringify({
          ids: props.orgIds,
          filter: { where: { id: { inq: props.orgIds } }, include: ['photo'] },
        }),
      },
    });
  }, [props.orgIds]);

  const displayAllCategory = () => (
    <GridContainer>
      {categoryLists &&
        categoryLists
          .map(c => (
            <GridItem key={c} className={classes.gridItem}>
              {displaySingleCategory(c)}
            </GridItem>
          ))
          .reverse()}
    </GridContainer>
  );

  const displaySingleCategory = (category, showBreadCrumbs) => (
    <ProductLists
      key={category}
      category={category}
      showBreadcrumbs={showBreadCrumbs}
    />
  );

  if (props.location.search !== '') {
    const parsedQuery = parseQueryParam(props.location.search);
    const category = parsedQuery.category;
    return displaySingleCategory(category, true);
  }
  return displayAllCategory();
}

const mapStateToProps = createStructuredSelector({
  categoryLists: makeSelectCategoryLists,
  productList: makeAllProductIdsFromAllCategory,
  orgIds: makeAllPublisherIds,
});

MarketplaceCategoryListContent.propTypes = {
  categoryLists: PropTypes.array,
  limit: PropTypes.number,
  productList: PropTypes.array,
  orgIds: PropTypes.array,
};

MarketplaceCategoryListContent.defaultProps = {
  limit: 4, // Maximum 4 products per category,
};

export default compose(
  resaga(),
  withRouter,
  connect(
    mapStateToProps,
    null,
  ),
)(React.memo(MarketplaceCategoryListContent));
