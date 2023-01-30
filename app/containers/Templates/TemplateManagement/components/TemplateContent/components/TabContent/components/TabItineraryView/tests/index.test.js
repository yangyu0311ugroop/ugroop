import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TabItineraryView } from '../index';

describe('<TabItineraryView />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    dayId: 7,
    dayIndex: 1,
  };

  beforeEach(() => {
    rendered = shallow(<TabItineraryView {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabItineraryView).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      instance.renderDays = jest.fn(
        () => 'I found my hope in the One who saves my soul',
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDays()', () => {
    it('should call renderSingleMonth startDate does not exist', () => {
      rendered.setProps({
        tabChildren: [1, 2],
      });
      instance.renderSingleMonth = jest.fn(
        () => 'All my days are counted in the hands of God',
      );
      const snapshot = shallow(<div>{instance.renderDays()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
