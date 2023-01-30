/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUGroopPublicPageViewLogsLatest = /* GraphQL */ `
  query GetUGroopPublicPageViewLogsLatest($service: String!, $_id: String!) {
    getUGroopPublicPageViewLogsLatest(service: $service, _id: $_id) {
      _id
      service
      country
      country_name
      date
      device
      host
      os
      path
      region_name
      source
      referer
      browser
      attributes
    }
  }
`;
export const listUGroopPublicPageViewLogsLatests = /* GraphQL */ `
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
        _id
        service
        country
        country_name
        date
        device
        host
        os
        path
        region_name
        source
        referer
        browser
        attributes
      }
      nextToken
    }
  }
`;
export const listPlatformsPublicPageViewLatest = /* GraphQL */ `
  query ListPlatformsPublicPageViewLatest(
    $filter: TableUGroopPublicPageViewLogsLatestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlatformsPublicPageViewLatest(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        _id
        os
      }
      nextToken
    }
  }
`;
