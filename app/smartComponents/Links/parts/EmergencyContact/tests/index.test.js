import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EmergencyContact } from '../index';

describe('<EmergencyContact />', () => {
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
    rendered = shallow(<EmergencyContact {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EmergencyContact).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      instance.getRelationshipOptions = jest.fn(() => []);
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if relationship has value', () => {
      rendered.setProps({
        emergencyContact: 'Yes',
      });
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTextOnly', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTextOnly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('return null', () => {
      expect(instance.onChange(true)).toEqual(null);
    });
    it('return value funtion', () => {
      rendered.setProps({ onChange: jest.fn(() => true) });
      expect(instance.onChange(true)).toEqual(true);
    });
  });

  describe('renderBadge', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderBadge()}</div>);

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
