import { FOLDER_QUERY_PARAM } from 'containers/Templates/constants';
import { getQueryParamForRoute } from '../query';

describe('getQueryParamForRoute', () => {
  it('should return query param for folder if current route is my tours', () => {
    const queryString = getQueryParamForRoute(FOLDER_QUERY_PARAM.MY_TOURS);
    expect(queryString).toBe(`folder=${FOLDER_QUERY_PARAM.MY_TOURS}`);
  });

  it('should return query param for folder if current route is org tours', () => {
    const queryString = getQueryParamForRoute(FOLDER_QUERY_PARAM.ORG_TOURS);
    expect(queryString).toBe(`folder=${FOLDER_QUERY_PARAM.ORG_TOURS}`);
  });

  it('should return query param for folder if current route is shared tours', () => {
    const queryString = getQueryParamForRoute(FOLDER_QUERY_PARAM.SHARED_TOURS);
    expect(queryString).toBe(`folder=${FOLDER_QUERY_PARAM.SHARED_TOURS}`);
  });

  it('should empty string if current route is not my tours, org tours or shared tours', () => {
    const queryString = getQueryParamForRoute('another_tour');
    expect(queryString).toBe('');
  });
});
