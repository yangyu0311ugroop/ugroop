import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TypographyList } from '../index';

describe('<Typography />', () => {
  it('should match snapshot', () => {
    const keys = Object.keys(TypographyList);
    keys.forEach(key => {
      const render = shallow(<div>{TypographyList[key]()}</div>);
      expect(toJSON(render)).toMatchSnapshot();
    });
  });
});
