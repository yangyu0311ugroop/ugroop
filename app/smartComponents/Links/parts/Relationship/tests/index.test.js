import { RELATIONSHIPS } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Relationship } from '../index';

describe('<Relationship />', () => {
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
    rendered = shallow(<Relationship {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Relationship).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onChange', () => {
    it('should make showOther state to true if value is other', () => {
      const value = RELATIONSHIPS.OTHER;
      instance.onChange(value);

      expect(rendered.state().showOther).toBe(true);
    });

    it('should make showOther state to false if value is not other', () => {
      const value = RELATIONSHIPS.FATHER;
      instance.onChange(value);

      expect(rendered.state().showOther).toBe(false);
    });
  });

  describe('getRelationshipOptions', () => {
    it('should return set of options to be used by select', () => {
      const options = instance.getRelationshipOptions();

      expect(options).toMatchSnapshot();
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      instance.getRelationshipOptions = jest.fn(() => []);
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if relationship has value', () => {
      const relationship = 'qqqq';
      rendered.setProps({
        relationship,
      });
      instance.getRelationshipOptions = jest.fn(() => []);
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTextOnly', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTextOnly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot when include a relationship', () => {
      rendered.setProps({ withECStatus: true });
      const snapshot = shallow(<div>{instance.renderTextOnly()}</div>);

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
