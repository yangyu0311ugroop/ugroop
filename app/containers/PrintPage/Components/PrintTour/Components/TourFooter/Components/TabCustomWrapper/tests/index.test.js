import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TabCustomWrapper } from '../index';

const resaga = {
  setValue: jest.fn(),
};
const props = {
  classes: {},
  tabIds: [1, 2, 3],
  tabChildIds: [1, 2, 3],
  resaga,
  tabPrintOnly: true,
};

describe('TourFooter', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(<TabCustomWrapper {...props} />);
    instance = component.instance();
  });
  describe('render', () => {
    it('check snapshot', () => {
      expect(
        toJSON(shallow(<div>{instance.isVisible('public')}</div>)),
      ).toMatchSnapshot();
      expect(
        toJSON(shallow(<div>{instance.isVisible('public', 'show')}</div>)),
      ).toMatchSnapshot();
    });
    it('check snapshot', () => {
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('check snapshot', () => {
      component.setProps({
        tabChildIds: [],
      });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
    it('check snapshot if tabChildIds is undefined', () => {
      component.setProps({
        tabChildIds: false,
        tabPrintOnly: false,
      });
      expect(toJSON(shallow(<div>{instance.render()}</div>))).toMatchSnapshot();
    });
  });
});
