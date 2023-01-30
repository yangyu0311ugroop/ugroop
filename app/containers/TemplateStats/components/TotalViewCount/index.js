import JText from 'components/JText';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import { LOGS_HOOKS } from 'hooks/logs';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const useTotalViewCount = id => {
  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, id),
  );
  const { data, isLoading, error } = LOGS_HOOKS.useStandardFetchLogs({
    hashkey,
  });

  if (isLoading) return { data: [], isLoading, error };

  const { items = [] } = data;

  return { data: items, isLoading };
};

export const TotalViewCount = memo(props => {
  const { data, isLoading } = useTotalViewCount(props.id);

  const content = isLoading ? 'Loading...' : data.length;

  return (
    <>
      <JText component="div" sm gray bold>
        Total Views
      </JText>
      <JText component="div" xxl bold>
        {content}
      </JText>
    </>
  );
});

TotalViewCount.propTypes = {
  id: PropTypes.number,
};

export default TotalViewCount;
