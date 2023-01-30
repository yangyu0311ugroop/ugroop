import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import _ from 'lodash';
import {
  useFetchNode,
  useTemplateGraph,
} from '../graphqlRequest/templateGraphql';
const defaultSortASC = 'EMAIL_ASC__LASTUPDATE_DESC__LASTNAME_ASC';
const defaultLimitedItems = 5;
/* eslint-disable no-param-reassign */
export function useParticipantSearch(props) {
  const { setQueryLoading, itemsPerPage, queryName } = props;
  const limitedItems = itemsPerPage || defaultLimitedItems;
  const [searchQueryState, setSearchQueryState] = useFetchNode({
    limitedItems,
    sort: defaultSortASC,
  });

  let query = searchQueryState.gqlQuery;
  if (queryName === 'gqlQueryWithTemplateData') {
    query = searchQueryState.gqlQueryWithTemplateData;
  }
  const [searchResultState, setSearchResult] = useImmer({
    peopleData: [],
    searchData: [],
    queryText: '',
  });

  const searchQuery = useTemplateGraph(query, {
    filter: searchQueryState.filter,
    limited: searchQueryState.limited,
    sort: searchQueryState.sort,
  });

  const { data: searchData } = searchQuery || {};

  useEffect(() => {
    if (searchData && searchData.participants.edges.length > 0) {
      const uniqPax = _.uniqBy(
        searchData.participants.edges,
        o => o.node.email,
      );
      setSearchResult(draft => {
        draft.searchData = uniqPax;
      });
      setQueryLoading(false);
    }
    if (searchData && searchData.participants.edges.length === 0) {
      setQueryLoading(false);
    }
  }, [searchData]);
  return {
    searchResultState,
    setSearchResult,
    searchQueryState,
    setSearchQueryState,
  };
}
