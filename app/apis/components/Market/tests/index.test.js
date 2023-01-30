import React from 'react';
import Market from '../index';
import {
  dispatchSetValue,
  dispatchRequestSuccessAction,
  renderWithReduxWithRouter,
} from '../../../../utils/testUtility';
import {
  GET_PUBLISHER_IDS,
  MARKET_API,
  USE_TEMPLATE,
} from '../../../constants';
import { sleep } from '../../../../utils/timeUtility';
test('Market', async () => {
  const { store } = renderWithReduxWithRouter(
    <>
      <Market />
    </>,
    {},
  );
  dispatchSetValue(store, 'abilityDataStore', 'definitions', {
    tour: {
      tour_owner: [
        {
          actions: 'read',
          subject: 'template',
        },
        {
          actions: 'update',
          subject: 'template',
        },
        {
          actions: 'delete',
          subject: 'template',
          conditions: {
            createdBy: 56,
          },
        },
        {
          actions: 'execute',
          subject: [
            'nodeshares',
            'hashkey',
            'link',
            'day',
            'event',
            'activity',
            'feedback',
            'checklist',
            'checkitem',
            'participant',
            'templatesetting',
            'interestedperson',
            'route',
            'photo',
            'tabtimeline',
            'tabgallery',
            'tabother',
            'risk',
            'hazard',
          ],
        },
        {
          actions: 'execute',
          subject: 'feedback',
          conditions: {
            createdBy: 56,
          },
        },
        {
          actions: 'execute',
          subject: 'comment',
          conditions: {
            createdBy: 56,
          },
        },
        {
          actions: 'execute',
          subject: 'tabother',
          conditions: {
            private: true,
          },
        },
        {
          actions: 'execute',
          subject: 'tabother',
          conditions: {
            private: false,
          },
        },
        {
          actions: 'execute',
          subject: 'tabother',
          conditions: {
            createdBy: 56,
          },
        },
        {
          actions: 'execute',
          subject: 'tabother',
          conditions: {
            role: {
              $in: ['admin', 'owner', 'tour_organizer'],
            },
          },
        },
        {
          actions: 'execute',
          subject: 'clone',
          conditions: {
            createdBy: 56,
          },
        },
      ],
    },
  });
  dispatchRequestSuccessAction(store, MARKET_API, USE_TEMPLATE, {
    cloneId: 11,
  });
  await sleep(5);
  expect(
    store
      .getState()
      .get('abilityDataStore')
      .get('tours')['11'],
  ).not.toBeNull();
  dispatchRequestSuccessAction(store, MARKET_API, GET_PUBLISHER_IDS, {
    organisations: {
      817: 'data',
    },
  });
  await sleep(5);
  expect(
    store
      .getState()
      .get('organisationDataStore')
      .get('organisations')['817'],
  ).not.toBeNull();
});
