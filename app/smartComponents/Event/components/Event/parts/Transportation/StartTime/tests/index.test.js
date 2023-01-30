import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { StartTime } from '../index';

describe('<StartTime />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<StartTime {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(StartTime).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderLabel', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderLabel()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLabelPrefix', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderLabelPrefix()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if hasLabelPrefix is false', () => {
      rendered.setProps({
        hasLabelPrefix: false,
      });
      const snapshot = shallow(<div>{instance.renderLabelPrefix()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
