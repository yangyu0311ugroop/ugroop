import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MedicalIcon } from '..';

describe('<MedicalIcon />', () => {
  it('exists', () => {
    expect(MedicalIcon).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<MedicalIcon classes={{}} noMedical />)),
      ).toMatchSnapshot();
    });
  });
});
