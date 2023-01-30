import JText from 'components/JText';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import { LOGS_HOOKS } from 'hooks/logs';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import MOMENT_HELPERS from 'utils/helpers/moment';
import get from 'lodash/get';

const useViewsThisWeekCount = id => {
  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, id),
  );
  const filters = {
    date: {
      ge: MOMENT_HELPERS.getStartOf(undefined, 'week'),
      le: MOMENT_HELPERS.getEndOf(undefined, 'week'),
    },
  };

  const { data, isLoading, error } = LOGS_HOOKS.useStandardFetchLogs({
    hashkey,
    filters,
  });

  if (isLoading) return { data: [], isLoading, error };

  const items = get(data, 'items', []);

  return { data: items, isLoading };
};

export const ViewsThisWeekCount = memo(props => {
  const { data, isLoading } = useViewsThisWeekCount(props.id);
  const content = isLoading ? 'Loading...' : data.length;
  return (
    <>
      <JText component="div" sm gray bold>
        Visits this week
      </JText>
      <JText component="div" xxl bold>
        {content}
      </JText>
    </>
  );
});

ViewsThisWeekCount.propTypes = {
  id: PropTypes.number,
};

export default ViewsThisWeekCount;
