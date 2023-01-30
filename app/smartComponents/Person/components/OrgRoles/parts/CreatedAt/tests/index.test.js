import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { CreatedAt } from '../index';

describe('<CreatedAt />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    isTableMobile: false,
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<CreatedAt {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CreatedAt).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderTextOnly()', () => {
    it('should renderTextOnly render correctly', () => {
      rendered.setProps({ isTableMobile: true });
      const snapshot = shallow(<div>{instance.renderTextOnly()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
