import { RANGE_FILTERS } from 'appConstants';
import { API } from '@aws-amplify/api';
import { TEMPLATE_VIEWSTORE_RESELECTORS } from 'datastore/templateManagementStore/selectorsViaConnect';
import { LOGS_GRAPHQL } from 'graphql/logsQueries';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import get from 'lodash/get';
import MOMENT_HELPERS from 'utils/helpers/moment';

const fetcher = (query, rawVariables) => {
  const variables = JSON.parse(rawVariables);
  const hashkey = get(variables, 'filter.path.contains');
  if (!hashkey) throw new Error('No hashkey provided');
  return API.graphql({ query, variables });
};

export const useStandardFetchLogs = ({
  hashkey,
  filters = {},
  hasDateFilter = true,
}) => {
  const dateFilter = hasDateFilter ? LOGS_HOOKS.useDateRangeFilterer() : {};

  const variables = JSON.stringify({
    filter: {
      path: {
        contains: hashkey,
      },
      method: {
        notContains: 'HEAD',
      },
      browser: {
        notContains: 'Bot',
      },
      ...dateFilter,
      ...filters,
    },
    limit: 1000,
  });
  return LOGS_HOOKS.useFetchLogs({
    query: LOGS_GRAPHQL.generateLogsListQuery([
      'country_name',
      'os',
      'referer',
      'date',
    ]),
    variables,
  });
};

export const useFetchLogs = (args = {}) => {
  const { variables, query } = args;
  const ONE_MINUTE = 60 * 1000;
  const { data: result, error } = useSWR([query, variables], fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: ONE_MINUTE,
  });
  const isLoading = !result && !error;
  if (!result && !error) return { data: result, isLoading, error };

  const fetchResult = get(
    result,
    'data.listUGroopPublicPageViewLogsLatests',
    [],
  );
  const items = get(fetchResult, 'items', []);
  const filteredItems = items.filter(
    item => item.browser.indexOf('bot') === -1,
  );
  fetchResult.items = filteredItems;

  return {
    data: fetchResult,
    isLoading,
    error,
  };
};

export const useDateRangeFilterer = () => {
  const statsDateRangeFilter = useSelector(state =>
    TEMPLATE_VIEWSTORE_RESELECTORS.getStatsDateRangeFilter(state),
  );

  switch (statsDateRangeFilter) {
    case RANGE_FILTERS.THIS_YEAR: {
      return {
        date: {
          ge: MOMENT_HELPERS.getStartOf(undefined, 'year'),
          le: MOMENT_HELPERS.getEndOf(undefined, 'year'),
        },
      };
    }
    case RANGE_FILTERS.THIS_WEEK: {
      return {
        date: {
          ge: MOMENT_HELPERS.getStartOf(undefined, 'week'),
          le: MOMENT_HELPERS.getEndOf(undefined, 'week'),
        },
      };
    }
    default: {
      return {
        date: {
          ge: MOMENT_HELPERS.getStartOf(),
          le: MOMENT_HELPERS.getEndOf(),
        },
      };
    }
  }
};

export const LOGS_HOOKS = {
  useFetchLogs,
  useDateRangeFilterer,
  useStandardFetchLogs,
};
