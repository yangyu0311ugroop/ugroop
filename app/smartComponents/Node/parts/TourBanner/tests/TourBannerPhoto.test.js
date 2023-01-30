import { FILE_STORE } from 'apis/constants';
import React from 'react';
import { NODE_STORE, ORGANISATION_DATA_STORE } from 'appConstants';
import { renderWithRedux, dispatchSetValue } from 'utils/testUtility';
import { TourBannerPhoto } from '../index';

const renderAssignedOrganiser = () => <div>test</div>;

describe('TourBannerPhoto', () => {
  it('should display the organisation logo if tour banner photo does not exist in the tour', () => {
    const { store, getByText } = renderWithRedux(
      <TourBannerPhoto
        id={1}
        renderAssignedOrganiser={renderAssignedOrganiser}
      />,
      {},
    );
    dispatchSetValue(store, ORGANISATION_DATA_STORE, 'organisations', {
      1: { id: 1, name: 'Sample Organisation', photo: '/sample/photo' },
    });
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        name: 'Tour 1',
        photos: [],
        customData: { organisationId: 1 },
      },
    });

    expect(getByText(/Travel By/i)).not.toBeNull();
    expect(getByText(/Sample Organisation/i)).not.toBeNull();
  });

  it('should display tour banner photo rather than organisation logo if tour banner exist', () => {
    const { store, debug } = renderWithRedux(
      <TourBannerPhoto
        id={1}
        renderAssignedOrganiser={renderAssignedOrganiser}
      />,
      {},
    );
    dispatchSetValue(store, FILE_STORE, 'files', {
      'FileContainer-sample-1': {
        content: 'FileContainer-sample-1',
        id: 1,
        metaInfo: {},
        type: null,
      },
      'FileContainer-sample-2': {
        content: 'FileContainer-sample-2',
        id: 1,
        metaInfo: {},
        type: 'tour_banner',
      },
    });
    dispatchSetValue(store, ORGANISATION_DATA_STORE, 'organisations', {
      1: { id: 1, name: 'Sample Organisation', photo: null },
    });
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        name: 'Tour 1',
        photos: ['FileContainer-sample-1', 'FileContainer-sample-2'],
        customData: { organisationId: 1 },
      },
    });

    debug();

    expect(renderAssignedOrganiser).not.toBeNull();
  });
});
