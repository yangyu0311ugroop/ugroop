import { gql, GraphQLClient } from 'graphql-request';
import useSWR from 'swr';
import { useImmer } from 'use-immer';
import AwsLib from '../../lib/awsLib';
import { sessionErrorHandler } from '../../utils/request';
import { isEmptyString } from '../../utils/stringAdditions';

const URL =
  process.env.ENV === 'production' || process.env.ENV === 'latest'
    ? `${process.env.COORDINATE_BASE_URL}/templategraphql`
    : 'http://localhost:4099/graphql';
const fetcher = (q, filter, limit, after, sort, enabled) => {
  if (enabled) {
    return AwsLib.Auth.currentSession()
      .then(session => {
        const fullURL = `${URL}?access_token=${session.idToken.jwtToken}`;
        const graphQLClient = new GraphQLClient(fullURL, {
          mode: 'cors',
        });
        if (!isEmptyString(q)) {
          if (typeof filter === 'string') {
            const filterArray = JSON.parse(filter);
            let hasFilterValue = false;
            if (filterArray.length > 0) {
              filterArray.forEach(o => {
                hasFilterValue = Object.entries(o).length > 0;
              });
            }
            if (hasFilterValue) {
              const result = filterArray.reduce(function(ac, c, index) {
                // eslint-disable-next-line no-param-reassign
                ac[`filter${index}`] = c;
                return ac;
              }, {});
              return graphQLClient.request(q, result);
            }
          } else if (Object.entries(filter).length > 0) {
            return graphQLClient.request(q, {
              filter,
              limit,
              after,
              sort,
            });
          }
        }
        return null;
      })
      .catch(sessionErrorHandler);
  }
  return null;
};

export const useFetchNode = props =>
  useImmer({
    gqlQuery: gql`
      query fetchParticipants(
        $sort: [ParticipantsOrderBy!]
        $limit: Int
        $filter: ParticipantFilter
        $after: Cursor
      ) {
        participants(
          filter: $filter
          first: $limit
          orderBy: $sort
          after: $after
        ) {
          edges {
            cursor
            node {
              email
              firstname
              lastname
              orgid
              parentnodeid
              id
              lastupdate
              dob
              phone
              phoneid
            }
          }
          totalCount
          pageInfo {
            hasPreviousPage
            startCursor
            hasNextPage
            endCursor
          }
        }
      }
    `,
    gqlQueryWithTemplateData: gql`
      query fetchParticipants(
        $sort: [ParticipantsOrderBy!]
        $limit: Int
        $filter: ParticipantFilter
        $after: Cursor
      ) {
        participants(
          filter: $filter
          first: $limit
          orderBy: $sort
          after: $after
        ) {
          edges {
            cursor
            node {
              email
              firstname
              lastname
              orgid
              parentnodeid
              id
              lastupdate
              dob
              phone
              phoneid
              ugroopnodeByParentnodeid {
                status
                parentnodeid
                ugroopnodeByParentnodeid {
                  content
                  type
                  createdat
                  id
                  templatesByParentnodeid {
                    nodes {
                      subtitle
                      startdate
                      shortdescription
                      parentnodeid
                      organisationid
                      duration
                      displaydate
                      description
                      weekday
                    }
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            hasPreviousPage
            startCursor
            hasNextPage
            endCursor
          }
        }
      }
    `,
    gqlQueryNodes: gql`
      query fetchNode(
        $sort: [UgroopnodesOrderBy!]
        $limit: Int
        $filter: UgroopnodeFilter
        $after: Cursor
      ) {
        ugroopnodes(
          filter: $filter
          first: $limit
          orderBy: $sort
          after: $after
        ) {
          edges {
            node {
              parentnodeid
              id
              status
              type
            }
          }
        }
      }
    `,
    gqlQueryParticipantRoomTravelGroup: gql`
      query fetchParticipantRoom(
        $filter0: UgroopnodeFilter
        $filter1: LinkFilter
        $filter2: LinkFilter
        $filter3: LinkFilter
      ) {
        ugroopnodes(filter: $filter0) {
          edges {
            node {
              id
              type
              linksByPrevnodeid(filter: $filter1) {
                nodes {
                  type
                  id
                  ugroopnodeByNextnodeid {
                    groupsByParentnodeid {
                      nodes {
                        type
                        id
                        parentnodeid
                        ugroopnodeByParentnodeid {
                          content
                          linksByNextnodeid(filter: $filter2) {
                            nodes {
                              id
                              nextnodeid
                              prevnodeid
                              ugroopnodeByPrevnodeid {
                                type
                                participantsByParentnodeid {
                                  nodes {
                                    roomtype
                                    lastname
                                    email
                                    firstname
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              linksByNextnodeid(filter: $filter3) {
                nodes {
                  createdat
                  id
                  type
                  occupantsByLinkid {
                    nodes {
                      linkByLinkid {
                        ugroopnodeByPrevnodeid {
                          type
                          id
                          roomsByParentnodeid {
                            nodes {
                              roomtype
                              parentnodeid
                              id
                              guestcount
                              description
                              bedcount
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    filter: {},
    limited: props && props.limitedItems,
    endCursor: null,
    sort: props && props.sort,
    loading: true,
    loadingMore: false,
  });

export function useTemplateGraph(query, variables, enabled = true) {
  return useSWR(
    [
      query,
      variables.filter,
      variables.limited,
      variables.after,
      variables.sort,
      enabled,
    ],
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
      refreshWhenHidden: true,
    },
  );
}
