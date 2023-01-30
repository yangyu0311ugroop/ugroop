import Box from '@material-ui/core/Box';
import { RANGE_FILTERS, RANGE_FILTERS_LABEL_MAPPING } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { TEMPLATE_VIEWSTORE_RESELECTORS } from 'datastore/templateManagementStore/selectorsViaConnect';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Icon from 'viewComponents/Icon';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import withResaga from 'resaga';

export const RangeFilter = memo(props => {
  const { resaga } = props;
  const rangeFilter =
    useSelector(state =>
      TEMPLATE_VIEWSTORE_RESELECTORS.getStatsDateRangeFilter(state),
    ) || RANGE_FILTERS.THIS_MONTH;

  // eslint-disable-next-line react/prop-types
  const renderUpdateInfoButton = ({ openMenu }) => (
    <Button
      dense
      size="extraSmall"
      onClick={openMenu}
      verySquare
      color="inline"
      variant={VARIANTS.INLINE}
    >
      {RANGE_FILTERS_LABEL_MAPPING[rangeFilter]}
      <Box ml={1}>
        <Icon size="extraSmall" icon="chevron-down" />
      </Box>
    </Button>
  );

  const handleMenuItemClick = statsDateRangeFilter => () => {
    resaga.setValue({ statsDateRangeFilter });
  };

  // eslint-disable-next-line react/prop-types
  const renderModeMenu = ({ value, closeMenu }) => (
    <GridContainer direction="column" spacing={0} wrap="nowrap">
      <GridItem>
        <MenuItem
          selected={value === 'this_week'}
          alignItems="baseline"
          closeMenu={closeMenu}
          onClick={handleMenuItemClick(RANGE_FILTERS.THIS_WEEK)}
        >
          This Week
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={value === 'this_month'}
          alignItems="baseline"
          closeMenu={closeMenu}
          onClick={handleMenuItemClick(RANGE_FILTERS.THIS_MONTH)}
        >
          This Month
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={value === 'this_year'}
          alignItems="baseline"
          closeMenu={closeMenu}
          onClick={handleMenuItemClick(RANGE_FILTERS.THIS_YEAR)}
        >
          This Year
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  return (
    <Popper
      placement="bottom-end"
      noPadding
      renderButton={renderUpdateInfoButton}
      value={rangeFilter}
    >
      {renderModeMenu}
    </Popper>
  );
});

RangeFilter.propTypes = {
  resaga: PropTypes.object.isRequired,
};

export default withResaga({
  setValue: {
    statsDateRangeFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.statsDateRangeFilter,
  },
})(RangeFilter);
