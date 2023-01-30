import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ParticipantDeleteConfirmation } from '..';

describe('<ParticipantDeleteConfirmation />', () => {
  it('exists', () => {
    expect(ParticipantDeleteConfirmation).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<ParticipantDeleteConfirmation />)),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if props.lastName', () => {
      expect(
        toJSON(shallow(<ParticipantDeleteConfirmation lastName="lastName" />)),
      ).toMatchSnapshot();
    });
  });
});
