import React from 'react';
import user from '@testing-library/user-event';
import { renderWithRedux } from 'utils/testUtility';
import { TourBannerUploader } from '../index';

// TODO: Need help to properly simulate upload action
describe('TourBannerUploader', () => {
  it('should display the organisation logo if tour banner photo does not exist in the tour', () => {
    const { getByTestId } = renderWithRedux(<TourBannerUploader id={1} />, {});
    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    });
    const inputEl = getByTestId(/image-input/i);
    user.upload(inputEl, file);
  });
});
