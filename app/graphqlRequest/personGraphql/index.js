import { gql, GraphQLClient } from 'graphql-request';
import useSWR from 'swr';
import { useImmer } from 'use-immer';
import AwsLib from '../../lib/awsLib';
import { sessionErrorHandler } from '../../utils/request';
import { isEmptyString } from '../../utils/stringAdditions';

const URL =
  process.env.ENV === 'production' || process.env.ENV === 'latest'
    ? `${process.env.COORDINATE_BASE_URL}/persongraphql`
    : 'http://localhost:4002/graphql';
export const useFetchPeopleData = () =>
  useImmer({
    gqlQuery: gql`
      query fetchPeople(
        $sort: [PeopleOrderBy!]
        $limit: Int
        $filter: PersonFilter
        $after: Cursor
      ) {
        people(filter: $filter, first: $limit, orderBy: $sort, after: $after) {
          edges {
            node {
              id
              email
              firstname
              gender
              knownas
              lastname
              nodeid
              birthdate
              birthplace
              photosByPersonid {
                nodes {
                  h
                  height
                  id
                  nodeId
                  personid
                  rotate
                  scale
                  w
                  width
                  x
                  type
                  url
                  y
                }
              }
            }
          }
        }
      }
    `,
    filter: {},
    sort: 'NODEID_ASC',
    limited: null,
    after: null,
  });

const fetcher = (q, filter, limit, after, sort, enabled) => {
  if (enabled) {
    return AwsLib.Auth.currentSession()
      .then(session => {
        const fullURL = `${URL}?access_token=${session.idToken.jwtToken}`;
        const graphQLClient = new GraphQLClient(fullURL, {
          mode: 'cors',
        });
        if (!isEmptyString(q) && Object.entries(filter).length > 0) {
          return graphQLClient.request(q, {
            filter,
            limit,
            after,
            sort,
          });
        }
        return null;
      })
      .catch(sessionErrorHandler);
  }
  return null;
};

export function usePersonGraph(query, variables, enabled = true) {
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
