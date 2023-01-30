import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ReactionList } from '../index';

describe('<ReactionList />', () => {
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
    rendered = shallow(<ReactionList {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ReactionList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderUser', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderUser(1)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTitle', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTitle()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderContent', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

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
