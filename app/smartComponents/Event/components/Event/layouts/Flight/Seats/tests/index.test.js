import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Seats } from '../index';

describe('<Seats />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 1122,
    value: [1, 2],
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Seats {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Seats).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderEmptyList', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEmptyList()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderUpperRightButton', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderUpperRightButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if value array is empty', () => {
      rendered.setProps({
        value: [],
      });
      const snapshot = shallow(<div>{instance.renderUpperRightButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSeat', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderSeat(1)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      ability.can = jest.fn(() => true);
      instance.renderUpperRightButton = jest.fn(() => 'renderUpperRightButton');
      instance.renderSeat = jest.fn(() => 'renderSeat');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
