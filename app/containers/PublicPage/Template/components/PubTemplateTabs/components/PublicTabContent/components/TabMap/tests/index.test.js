import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TabMap } from '../index';

describe('<TabMap />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<TabMap classes={{}} tabId={1} />);
    instance = rendered.instance();
  });

  describe('TabMap', () => {
    it('should match snapshot', () => {
      const snap = instance.render();
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
