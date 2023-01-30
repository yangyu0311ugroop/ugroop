import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Empty } from '../index';

describe('<Empty />', () => {
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
    rendered = shallow(<Empty {...props} />);
    instance = rendered.instance();
  });

  describe('Smoke Tests', () => {
    it('should exists', () => {
      expect(Empty).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('handleEditing()', () => {
    it('should handleEditing()', () => {
      instance.handleEditing();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('renderLoading()', () => {
    it('should render loading', () => {
      const snapshot = shallow(<div>{instance.renderLoading()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEmpty()', () => {
    it('should render loading', () => {
      ability.can = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.renderEmpty()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render loading', () => {
      rendered.setProps({ fetching: true });
      instance.renderLoading = jest.fn(() => <div>Loading</div>);

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render empty', () => {
      rendered.setProps({ fetching: false });
      instance.renderEmpty = jest.fn(() => <div>Empty</div>);

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
