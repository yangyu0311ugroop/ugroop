import React from 'react';
import { compose } from 'redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  makeSelectMarketPlaceProductIds,
  makeAllPublisherIds,
} from 'containers/MarketPlace/dataStore/selectors';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Helmet } from 'react-helmet';
import Node from '../../../smartComponents/Node';
import { Category, DOUBLE_CARD, PAGE_HELMETS } from '../../../appConstants';
import GridItem from '../../../components/GridItem';
import GridContainer from '../../../components/GridContainer';
import { LOGIC_HELPERS } from '../../../utils/helpers/logic';
import { makeStyles } from '../../../components/material-ui';
import { H3, Span } from '../../../viewComponents/Typography';
import Icon from '../../../ugcomponents/Icon';

import Breadcrumb from '../../../ugcomponents/Breadcrumbs';
import { useMarketBreadCrumbs } from '../hooks/useMarketBreadCrumbs';
import { convertCategoryName } from '../utils/categoryNameConvert';

const styles = theme => ({
  root: {},
  grow: {
    flex: '1',
  },
  width100: {
    width: '100%',
  },
  orgNameContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '84%',
    },
  },
  heading: {
    height: 40,
    '& a': {
      color: 'unset',
    },
  },
  firstHeading: {
    paddingTop: 0,
  },
  breadCrumbs: {
    paddingTop: '12px !important',
  },
});

const useStyles = makeStyles(styles);
function ProductLists(props) {
  const classes = useStyles();
  const { showBreadcrumbs } = props;
  const renderText = item => <Span class>{item.label}</Span>;

  const breadcrumbsItems = useMarketBreadCrumbs(props.category);
  const renderBreadCrumbs = () => {
    if (showBreadcrumbs) {
      return (
        <GridItem className={classes.breadCrumbs}>
          <Breadcrumb
            showAllActive
            showLastItem
            renderText={renderText}
            items={breadcrumbsItems}
          />
        </GridItem>
      );
    }
    return null;
  };

  const displayIcon = () => {
    let icon = '';
    switch (props.category) {
      case Category.CheckList:
        icon = 'lnr-list3';
        break;
      case Category.FeaturedTours:
        icon = 'lnr-earth';
        break;
      default:
        icon = '';
    }
    return icon;
  };

  const renderTitle = () => (
    <GridContainer
      alignItems="center"
      className={classnames(isMobile ? classes.heading : null)}
    >
      <GridItem>
        <Icon color="blue" size="medium" icon={displayIcon()} />
      </GridItem>
      <GridItem className={classes.orgNameContainer}>
        <H3 weight="bolder" noMargin={!!isMobile}>
          {convertCategoryName(props.category)}
        </H3>
      </GridItem>
    </GridContainer>
  );

  const renderProducts = (id, index) => (
    <Node
      shouldFilter
      recent={false}
      showOrganisation={false}
      id={id}
      key={index}
      variant={DOUBLE_CARD}
      minimise={false}
      showPublish
    />
  );
  const minimise = false;

  return (
    <GridContainer direction="column">
      <Helmet
        title={
          props.showBreadcrumbs
            ? `${props.category} | ${PAGE_HELMETS.TEMPLATE_LIBRARY}`
            : PAGE_HELMETS.TEMPLATE_LIBRARY
        }
        meta={[
          {
            name: 'description',
            content: props.showBreadcrumbs
              ? `Description of ${props.category}`
              : `All ${PAGE_HELMETS.TEMPLATES}`,
          },
        ]}
      />
      {renderBreadCrumbs()}
      <GridItem>{renderTitle()}</GridItem>
      <GridItem>
        <GridContainer spacing={LOGIC_HELPERS.ifElse(minimise, 0, 2)}>
          {props.productList && props.productList.map(renderProducts)}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  productList: makeSelectMarketPlaceProductIds,
  publisherIds: makeAllPublisherIds,
});

ProductLists.propTypes = {
  productList: PropTypes.array,
  category: PropTypes.string,
  showBreadcrumbs: PropTypes.bool,
};

ProductLists.defaultProps = {
  showBreadcrumbs: false,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null,
  ),
)(React.memo(ProductLists));
