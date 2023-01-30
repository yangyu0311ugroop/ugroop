import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ListRow } from '..';

describe('<ListRow />', () => {
  it('exists', () => {
    expect(ListRow).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(shallow(<ListRow classes={{ root: 'root' }}>Children</ListRow>)),
      ).toMatchSnapshot();
    });
  });
});
