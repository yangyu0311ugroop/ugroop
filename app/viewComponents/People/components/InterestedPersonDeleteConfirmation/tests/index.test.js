import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { InterestedPersonDeleteConfirmation } from '..';

describe('<InterestedPersonDeleteConfirmation />', () => {
  it('exists', () => {
    expect(InterestedPersonDeleteConfirmation).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<InterestedPersonDeleteConfirmation />)),
      ).toMatchSnapshot();
    });

    it('still matches snapshot if props.lastName', () => {
      expect(
        toJSON(
          shallow(<InterestedPersonDeleteConfirmation lastName="lastName" />),
        ),
      ).toMatchSnapshot();
    });
  });
});
