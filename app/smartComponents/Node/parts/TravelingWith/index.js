import { DEFAULT } from 'appConstants';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';

import EditableTravelingWith from './components/EditableTravelingWith';
import TravelingWithList from './components/TravelingWithList';

export const TravelingWith = memo(props => {
  const { variant, ...rest } = props;

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.LIST_ONLY]: <TravelingWithList {...rest} />,
    [DEFAULT]: <EditableTravelingWith {...rest} />,
  });
});

TravelingWith.propTypes = {
  variant: PropTypes.string,
};

export default TravelingWith;
