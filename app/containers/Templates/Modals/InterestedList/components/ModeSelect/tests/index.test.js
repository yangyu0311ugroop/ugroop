import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { InterestedListModeSelect } from '../index';

describe('<InterestedListModeSelect />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<InterestedListModeSelect />);
    instance = rendered.instance();
  });

  describe('render', () => {
    it('should match snapshot', () => {
      const snap = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
