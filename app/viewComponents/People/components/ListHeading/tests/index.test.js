import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ListHeading } from '..';

describe('<ListHeading />', () => {
  it('exists', () => {
    expect(ListHeading).toBeDefined();
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(
        toJSON(
          shallow(
            <ListHeading classes={{ item: 'item' }} link>
              Children
            </ListHeading>,
          ),
        ),
      ).toMatchSnapshot();
    });
  });
});
