import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { CHECK_INPUT } from 'appConstants';
import { ChecklistOptions } from '../index';

describe('<ChecklistOptions />', () => {
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
    rendered = shallow(<ChecklistOptions {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ChecklistOptions).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ rootNodeId: 22999, orgRootNodeId: 1 });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        rootNodeId: 22999,
        orgRootNodeId: 1,
        variant: CHECK_INPUT,
      });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
