import React from 'react';
import PropTypes from 'prop-types';

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { VARIANTS } from 'variantsConstants';
import { H5 } from 'viewComponents/Typography';
import Badge from 'viewComponents/Badge';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export const Filter = ({ children, selected, onClick, count }) => (
  <GridContainer alignItems="center" justify="space-between">
    <GridItem onClick={onClick} clickable>
      <H5 whiteSpace="nowrap" dense weight={selected ? 'bold' : 'light'}>
        {children}
      </H5>
    </GridItem>
    {LOGIC_HELPERS.ifElse(
      count > 0,
      <GridItem>
        <Badge variant={VARIANTS.SQUARE}>{count}</Badge>
      </GridItem>,
      null,
    )}
  </GridContainer>
);

Filter.propTypes = {
  // parent
  children: PropTypes.any,
  selected: PropTypes.bool,
  count: PropTypes.number,
  onClick: PropTypes.func,
};

Filter.defaultProps = {
  children: null,
  selected: false,
  count: 0,
};

export default Filter;
