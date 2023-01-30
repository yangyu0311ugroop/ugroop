import { requests } from 'utils/request';
import { CONFIG } from '../config';
import {
  GET_PUBLISHER_IDS,
  MARKET_API,
  USE_TEMPLATE,
} from '../../../constants';

jest.mock('datastore/utils', () => ({
  upsertObject: o => o,
}));
test('USE TEMPLATE', () => {
  const request = CONFIG.requests[USE_TEMPLATE];
  requests.fetchWithAuthorisation = jest.fn();
  request({ id: 1, data: 'data' });
  expect(requests.fetchWithAuthorisation).toBeCalledWith(
    'post',
    `/${MARKET_API}/1/useTemplate`,
    'data',
  );
});
test('GET PUBLISHER', () => {
  const request = CONFIG.requests[GET_PUBLISHER_IDS];
  requests.fetchWithAuthorisation = jest.fn();
  request({ query: 'abcd' });
  expect(requests.fetchWithAuthorisation).toBeCalledWith(
    'get',
    `/${MARKET_API}/lists/abcd`,
  );
});
test('processResult', () => {
  const data = [
    {
      name: 'dddddddddddddddddddddddddddddd',
      namekey: 'org-dddddd-ddddd',
      country: 'AUS',
      website: '',
      type: 'Club',
      createdBy: 56,
      lastModifiedBy: 56,
      id: 817,
      typeId: 817,
      photo: {
        organisationId: 817,
        url:
          'FileContainers/com.ugroop.personContainer/download/c87c720e-52a8-4d3d-8dbb-1efe740beaeb.jpeg',
        x: '0',
        y: '0.00000000000000011102230246251565',
        w: null,
        h: null,
        width: '1',
        height: '0.9999999999999998',
        scale: '1',
        rotate: 0,
        id: 1,
      },
      userId: 56,
      rootNodeId: 5949,
    },
  ];
  const func = CONFIG.processResult[GET_PUBLISHER_IDS];
  const result = func(data);
  expect(result).toMatchSnapshot();
});
test('value', () => {
  expect(CONFIG.value.tourOwnerAbilities).toMatchSnapshot();
});
test('setValue', () => {
  expect(CONFIG.setValue.organisations).toMatchSnapshot();
  expect(CONFIG.setValue.photos).toMatchSnapshot();
  expect(CONFIG.setValue.files).toMatchSnapshot();
});
