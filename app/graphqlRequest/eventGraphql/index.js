import { gql, GraphQLClient } from 'graphql-request';
import useSWR from 'swr';
import AwsLib from '../../lib/awsLib';
import { sessionErrorHandler } from '../../utils/request';
import { isEmptyString } from '../../utils/stringAdditions';

const URL =
  process.env.ENV === 'production' || process.env.ENV === 'latest'
    ? `${process.env.COORDINATE_BASE_URL}/eventgraphql`
    : 'https://eventgraphql-test.ugroop.com/graphql';

export const FetchEventAmountsQuery = gql`
  query FetchEventAmounts($filter: CostFilter) {
    costs(filter: $filter) {
      edges {
        node {
          actualAmount
          budgetAmount
          currency
          event {
            type
            id
            activity {
              type
            }
          }

          flightBooking {
            bookingNumber
            name
            passengerCount
            supplier
            id
          }
        }
      }
    }
  }
`;

const fetcher = (q, templateId, amountLastUpdated, enabled) => {
  if (enabled) {
    return AwsLib.Auth.currentSession()
      .then(session => {
        const filter = {
          or: [
            {
              flightBooking: {
                costsExist: true,
                templateId: { equalTo: templateId },
              },
            },
            {
              event: {
                isDeleted: { equalTo: false },
                costsExist: true,
                templateId: { equalTo: templateId },
              },
            },
          ],
        };
        const fullURL = `${URL}?access_token=${session.idToken.jwtToken}`;
        const graphQLClient = new GraphQLClient(fullURL, {
          mode: 'cors',
        });
        if (!isEmptyString(q) && Object.entries(filter).length > 0) {
          return graphQLClient.request(q, {
            filter,
          });
        }
        return null;
      })
      .catch(sessionErrorHandler);
  }
  return null;
};

export function useEventGraph(
  query,
  templateId,
  amountLastUpdated,
  enabled = true,
) {
  return useSWR([query, templateId, amountLastUpdated, enabled], fetcher);
}
