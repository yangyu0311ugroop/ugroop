import JText from 'components/JText';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { LOGS_HOOKS } from 'hooks/logs';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { VARIANTS } from 'variantsConstants';

const useViewsSinceCreationCount = id => {
  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, id),
  );

  const { data, isLoading, error } = LOGS_HOOKS.useStandardFetchLogs({
    hashkey,
    hasDateFilter: false,
  });

  if (isLoading) return { data: [], isLoading, error };

  const { items } = data;

  return { data: items, isLoading };
};

export const ViewsSinceCreationCount = memo(props => {
  const { data = [], isLoading } = useViewsSinceCreationCount(props.id);

  if (isLoading)
    return LOGIC_HELPERS.ifElse(
      props.variant === VARIANTS.VALUE_ONLY,
      data.length,
      'Loading...',
    );

  switch (props.variant) {
    case VARIANTS.VALUE_ONLY: {
      return data.length;
    }
    default: {
      return (
        <>
          <JText component="div" sm gray bold>
            Visits since creation
          </JText>
          <JText component="div" xxl bold>
            {data.length}
          </JText>
        </>
      );
    }
  }
});

ViewsSinceCreationCount.propTypes = {
  id: PropTypes.number,
  variant: PropTypes.string,
};

export default ViewsSinceCreationCount;
