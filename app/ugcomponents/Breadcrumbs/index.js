import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Ul from 'components/Ul';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import stylesheet from './styles';
import Item from './components/BreadcrumbItem';
import Dropdown from './components/BreadcrumbDropdown';

const MAX_ITEMS = 4;

export const UGBreadcrumbs = ({
  classes,
  items,
  showLastItem,
  showAllActive,
  onlyDisplayRoot,
  isLoading,
  renderText,
  showOneItem,
  darkMode,
}) => {
  let breadcrumbList = items;
  let leftovers = [];
  let popover = '';

  if (isLoading) {
    return <Ul className={classes.root}>Loading...</Ul>;
  }

  if (items.length === 1 && showOneItem) {
    return (
      <Ul
        className={classnames(
          classes.root,
          LOGIC_HELPERS.ifElse(darkMode, classes.darkMode),
        )}
      />
    );
  }

  if (onlyDisplayRoot) {
    breadcrumbList = items.slice(0, 1);
  } else if (breadcrumbList.length > MAX_ITEMS) {
    const start = breadcrumbList.length - MAX_ITEMS;
    breadcrumbList = items.slice(
      start,
      showLastItem ? items.length : items.length - 1,
    );
    leftovers = items.slice(0, start).reverse();

    popover = <Dropdown items={leftovers} renderText={renderText} />;
  }

  if (!showLastItem && !onlyDisplayRoot) {
    breadcrumbList = breadcrumbList.slice(0, items.length - 1);
  }

  const linkList = breadcrumbList.map((item, index) => (
    <Item
      darkMode={darkMode}
      key={`${item.label}-${item.url}`}
      isFirst={index === 0}
      name={LOGIC_HELPERS.ifFunction(renderText, [item], item.label)}
      isLast={index === breadcrumbList.length - 1}
      url={item.url}
      showAllActive={showAllActive}
      onlyItem={breadcrumbList.length === 1}
      showLastItem={showLastItem}
    />
  ));
  return (
    <Ul className={classes.root}>
      {popover}
      {linkList}
    </Ul>
  );
};

UGBreadcrumbs.propTypes = {
  items: PropTypes.array,
  classes: PropTypes.object.isRequired,
  showLastItem: PropTypes.bool,
  showAllActive: PropTypes.bool,
  onlyDisplayRoot: PropTypes.bool,
  isLoading: PropTypes.bool,
  showOneItem: PropTypes.bool,
  darkMode: PropTypes.bool,
  renderText: PropTypes.func,
};
UGBreadcrumbs.defaultProps = {
  items: [],
  showLastItem: false,
  showAllActive: false,
  onlyDisplayRoot: false,
  showOneItem: false,
  isLoading: false,
};

export default withStyles(stylesheet, { name: 'UGBreadcrumbs' })(UGBreadcrumbs);
