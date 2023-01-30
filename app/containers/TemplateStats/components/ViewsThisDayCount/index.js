import JText from 'components/JText';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import { LOGS_HOOKS } from 'hooks/logs';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import MOMENT_HELPERS from 'utils/helpers/moment';
import get from 'lodash/get';

const useViewsThisDayCount = id => {
  const hashkey = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeHashkey(state, id),
  );
  const filters = {
    date: {
      ge: `${MOMENT_HELPERS.startOf(new Date().toISOString(), 'date').format(
        FORMATS_DATE_TIME.FORMAT_STANDARD_DATE,
      )}T00:00:00Z`,
      le: `${MOMENT_HELPERS.getEndOf(new Date().toISOString(), 'date').format(
        FORMATS_DATE_TIME.FORMAT_STANDARD_DATE,
      )}T23:59:59Z`,
    },
  };

  const { data, isLoading, error } = LOGS_HOOKS.useStandardFetchLogs({
    hashkey,
    filters,
    hasDateFilter: false,
  });

  if (isLoading) return { data: [], isLoading, error };

  const items = get(data, 'items', []);

  return { data: items, isLoading };
};

export const ViewsThisDayCount = memo(props => {
  const { data, isLoading } = useViewsThisDayCount(props.id);

  const content = isLoading ? 'Loading...' : data.length;

  return (
    <>
      <JText component="div" sm gray bold>
        Visits last 24 hours
      </JText>
      <JText component="div" xxl bold>
        {content}
      </JText>
    </>
  );
});

ViewsThisDayCount.propTypes = {
  id: PropTypes.number,
};

export default ViewsThisDayCount;
