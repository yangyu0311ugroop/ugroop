export const generateLogsListQuery = items => `
    query ListUGroopPublicPageViewLogsLatests(
    $filter: TableUGroopPublicPageViewLogsLatestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUGroopPublicPageViewLogsLatests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        browser
        ${items.toString()}
      }
    }
  }
  `;

export const LOGS_GRAPHQL = {
  generateLogsListQuery,
};
