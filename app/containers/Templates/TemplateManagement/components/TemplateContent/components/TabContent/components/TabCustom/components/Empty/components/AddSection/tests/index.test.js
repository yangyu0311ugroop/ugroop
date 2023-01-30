import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AddSection } from '../index';

describe('<AddSection />', () => {
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
    rendered = shallow(<AddSection {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Smoke Tests', () => {
    it('should exists', () => {
      expect(AddSection).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('addSection()', () => {
    it('should dispatch CREATE_NEXT_NODE', () => {
      rendered.setProps({ id: 123 });

      instance.addSection();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should dispatch CREATE_CHILD_NODE', () => {
      rendered.setProps({ id: 0 });

      instance.addSection();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('createSuccess()', () => {
    it('should call setValue', () => {
      instance.createSuccess(123, { parent: 1, node: 23 });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
