import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import _ from 'lodash';
import {
  useFetchNode,
  useTemplateGraph,
} from '../graphqlRequest/templateGraphql';
import {
  useFetchPeopleData,
  usePersonGraph,
} from '../graphqlRequest/personGraphql';
import { isEmptyString } from '../utils/stringAdditions';
/* eslint-disable no-param-reassign */
const defaultLimitedItems = 5;
const defaultSortASC = 'EMAIL_ASC__LASTUPDATE_DESC__LASTNAME_ASC';
const timeOut = 1000;
export function useParticipantRequest(props) {
  const [timer, setTimer] = useImmer({
    list: [],
  });
  const { orgId, itemsPerPage, queryName } = props;
  const limitedItems = itemsPerPage || defaultLimitedItems;
  const [state, setState] = useFetchNode({
    limitedItems,
    sort: defaultSortASC,
  });
  const [result, setResult] = useImmer({
    loadedResult: [],
    expectedResult: [],
    participants: [],
    readIndex: 0,
    pageIndexTrack: 1,
  });
  let query = state.gqlQuery;
  if (!isEmptyString(queryName) && queryName === 'gqlQueryWithTemplateData') {
    query = state.gqlQueryWithTemplateData;
  }
  const [personQueryResult, setPersonQueryResult] = useImmer({
    peopleData: [],
    requestPeopleId: [],
  });
  const [personQueryState, setPersonQueryState] = useFetchPeopleData();
  // eslint-disable-next-line no-unused-vars

  const templateGraphQuery = useTemplateGraph(query, {
    filter: state.filter,
    limited: state.limited,
    after: state.endCursor,
    sort: state.sort,
  });
  const personGraphQuery = usePersonGraph(personQueryState.gqlQuery, {
    filter: personQueryState.filter,
    limited: personQueryState.limited,
    after: personQueryState.endCursor,
    sort: personQueryState.sort,
  });

  const { data, error } = templateGraphQuery || {};
  const edges = data && data.participants.edges;
  const pageInfo = data && data.participants.pageInfo;

  useEffect(() => {
    if (orgId) {
      setState(draft => {
        draft.filter = { orgid: { equalTo: orgId } };
      });
    }
  }, [orgId]);

  useEffect(() => {
    if (edges && edges.length > 0) {
      const uniqPax = _.uniqWith(edges, (a, b) => {
        if (b.node.email && a.node.email) {
          return b.node.email === a.node.email;
        }
        return false;
      });
      const array = [];
      setResult(draft => {
        for (let i = 0; i < uniqPax.length; i += 1) {
          const p = uniqPax[i];
          if (isEmptyString(p.node.email)) {
            array.push(p);
          } else {
            const index = draft.loadedResult.findIndex(
              o => o.node.email === p.node.email,
            );
            if (index < 0) {
              array.push(p);
            }
          }
        }
        if (array.length > 0) {
          draft.loadedResult.push(...array);
        } else if (array.length === 0) {
          if (pageInfo && pageInfo.endCursor) {
            // eslint-disable-next-line no-shadow
            setState(draft => {
              draft.endCursor = pageInfo.endCursor;
            });
          }
        }
      });
    } else if (pageInfo) {
      if (pageInfo.endCursor) {
        setState(draft => {
          draft.endCursor = pageInfo.endCursor;
        });
      }
    }
  }, [edges]);

  useEffect(() => {
    setResult(draft => {
      const length = draft.loadedResult.length;
      const lists = draft.loadedResult.slice(draft.readIndex, length);
      const newPax = lists.filter(
        o =>
          draft.expectedResult.findIndex(e => e.node.email === o.node.email) ===
            -1 ||
          (isEmptyString(o.node.email) &&
            draft.expectedResult.findIndex(e => e.node.id === o.node.id) ===
              -1),
      );
      const newIndex = draft.readIndex + newPax.length;
      if (newPax && newPax.length > 0) {
        draft.expectedResult.push(...newPax);
        draft.readIndex = newIndex;
      }
      if (newIndex <= limitedItems * result.pageIndexTrack) {
        if (pageInfo && pageInfo.endCursor) {
          setState(statedraft => {
            statedraft.endCursor = pageInfo.endCursor;
            statedraft.loadingMore = true;
          });
        }
      } else {
        setState(statedraft => {
          statedraft.loadingMore = false;
        });
      }
    });
  }, [result.loadedResult.length]);

  useEffect(() => {
    if (result.expectedResult && result.expectedResult.length > 0) {
      if (result.expectedResult.length >= limitedItems) {
        // strip the data
        const readyParticipant = result.expectedResult.slice(0, limitedItems);

        setPersonQueryState(draft => {
          if (readyParticipant && readyParticipant.length > 0) {
            draft.filter = {
              nodeid: { in: readyParticipant.map(o => o.node.parentnodeid) },
            };
          }
        });
        setState(draft => {
          draft.loadingMore = false;
        });
        setResult(draft => {
          const rparticipant = draft.expectedResult.slice(0, limitedItems);
          const pending = draft.expectedResult.slice(
            limitedItems,
            draft.expectedResult.length,
          );
          draft.participants.push(...rparticipant);
          draft.expectedResult = pending;
        });
        setState(draft => {
          draft.loading = false;
        });
      } else if (pageInfo) {
        if (pageInfo.hasNextPage) {
          setState(draft => {
            draft.loadingMore = false;
            draft.loading = false;
          });
        }
      }
    }
  }, [result.expectedResult]); // mutate the expected result

  const { data: PersonData } = personGraphQuery || {};
  useEffect(() => {
    if (PersonData && PersonData.people.edges.length > 0) {
      const array = PersonData.people.edges.map(o => o.node);
      setPersonQueryResult(draft => {
        const peopleData = [];
        for (let i = 0; i < array.length; i += 1) {
          const p = array[i];
          const index = draft.peopleData.findIndex(o => o.id === p.id);
          if (index < 0) {
            peopleData.push(p);
          }
        }
        // draft.peopleData.
        draft.peopleData.push(...peopleData);
      });
    }
  }, [PersonData]);

  useEffect(() => {
    if (pageInfo && !pageInfo.hasNextPage) {
      const t = setTimeout(() => {
        setResult(draft => {
          const pending = draft.expectedResult.slice(
            draft.readIndex,
            draft.expectedResult.length,
          );
          draft.participants.push(...draft.expectedResult);
          draft.expectedResult = pending;
        });
        setState(draft => {
          draft.loadingMore = false;
          draft.loading = false;
        });
        setPersonQueryState(draft => {
          if (result.expectedResult && result.expectedResult.length > 0) {
            draft.filter = {
              nodeid: {
                in: result.expectedResult.map(o => o.node.parentnodeid),
              },
            };
          }
        });
      }, timeOut);
      setTimer(draft => {
        draft.list.push(t);
      });
    }
  }, [pageInfo]);

  useEffect(
    () =>
      function cleanup() {
        const list = timer.list;
        for (let i = 0; i < list.length; i += 1) {
          clearTimeout(list[i]);
        }
      },
    [],
  );

  return {
    state,
    setState,
    result,
    setResult,
    personQueryResult,
    setPersonQueryResult,
    error,
    pageInfo,
    setPersonQueryState,
  };
}
