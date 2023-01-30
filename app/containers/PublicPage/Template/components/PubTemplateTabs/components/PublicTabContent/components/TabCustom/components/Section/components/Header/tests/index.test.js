import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Header } from '../index';

describe('<Header />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 999,
  };

  beforeEach(() => {
    rendered = shallow(<Header {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Header).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderContent()', () => {
    it('should render content', () => {
      rendered.setProps({ editing: 0, content: 'hi ho' });
      const snapshot = shallow(<div>{instance.renderContent()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render placeholder if content is empty', () => {
      rendered.setProps({ editing: 0, content: '' });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render TextField if editing is truthy', () => {
      rendered.setProps({ editing: 123 });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLocation()', () => {
    it('should render location', () => {
      rendered.setProps({ editing: 0, location: 'hi ho' });
      const snapshot = shallow(<div>{instance.renderLocation()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return empty if location is empty', () => {
      rendered.setProps({ editing: 0, location: '' });
      expect(instance.renderLocation()).toBe('');
    });

    it('should render TextField if editing is truthy', () => {
      rendered.setProps({ editing: 123 });
      const snapshot = shallow(<div>{instance.renderLocation()}</div>);
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
