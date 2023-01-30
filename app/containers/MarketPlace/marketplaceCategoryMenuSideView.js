import classNames from 'classnames';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridContainer from '../../components/GridContainer';
import GridItem from '../../components/GridItem';
import Icon from '../../ugcomponents/Icon';
import { useMarketplaceContext } from './context/marketPlaceStateContext';
import { makeStyles } from '../../components/material-ui';
import { styles } from './style';
import MarketPlaceCategoryMenuList from './menu/marketplaceCategoryMenuList';
import { makeSelectCategoryLists } from './dataStore/selectors';

const useStyles = makeStyles(styles);
function MarketplaceCategoryMenuSideView(props) {
  const classes = useStyles();
  const { categoryLists } = props;
  const [mouseIn, setMouseIn] = useState(false);
  const [active, setActive] = useState(false);
  const [state, dispatch] = useMarketplaceContext();

  useEffect(() => {
    if (
      props.location.pathname &&
      props.location.pathname.includes('/marketplace')
    ) {
      dispatch.toggleTemplateCollapseValue(true);
      if (
        props.location.pathname === '/marketplace' &&
        props.location.search === ''
      ) {
        setActive(true);
      } else {
        setActive(false);
      }
    } else {
      dispatch.toggleTemplateCollapseValue(false);
      setActive(false);
    }
  }, [props.location]);

  const isMouseIn = () => {
    if (mouseIn && !active) {
      return true;
    }
    return false;
  };

  const expandTemplateList = () => {
    props.history.push('/marketplace');
  };

  const CategoryList = () => (
    <List className={classes.listContainer}>
      {categoryLists
        .map(name => <MarketPlaceCategoryMenuList key={name} name={name} />)
        .reverse()}
    </List>
  );

  const handleMouseOver = () => {
    setMouseIn(true);
  };

  const handleMouseOut = () => {
    setMouseIn(false);
  };

  const showCategory = () => {
    if (state.templateCollapseValue) {
      return (
        <GridItem>
          <Collapse in={state.templateCollapseValue} unmountOnExit>
            {CategoryList()}
          </Collapse>
        </GridItem>
      );
    }
    return null;
  };
  const DisplayHeader = () => (
    <GridContainer
      className={classNames(
        classes.headerRoot,
        active ? classes.active : null,
        isMouseIn() ? classes.hoverOver : null,
      )}
      alignItems="center"
      onClick={expandTemplateList}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      noWrap
      data-testid="marketplaceHeader"
    >
      <GridItem>
        <Icon color="blue" size="normal" icon="lnr-store" />
      </GridItem>
      <GridItem className={classes.linkText}>Template library</GridItem>
    </GridContainer>
  );
  return (
    <GridContainer direction="column" spacing={1}>
      <GridItem>{DisplayHeader()}</GridItem>
      {showCategory()}
    </GridContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  categoryLists: makeSelectCategoryLists,
});

MarketplaceCategoryMenuSideView.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  categoryLists: PropTypes.array,
};

MarketplaceCategoryMenuSideView.defaultProps = {};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null,
  ),
)(React.memo(MarketplaceCategoryMenuSideView));
