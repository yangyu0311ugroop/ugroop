import { LINK } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { Location } from '../index';

describe('<Location />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    darkMode: true,
    content: 'some content',
    classes: { default: 'default', disabled: 'disabled' },
    resaga,
    id: 2233,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Location {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Location).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isEqual()', () => {
    it('should isEqual true #1', () => {
      rendered.setProps({ location: undefined, placeId: null });

      expect(instance.isEqual({ location: 0, placeId: 0 })).toBe(true);
    });

    it('should isEqual true #1', () => {
      rendered.setProps({ location: 1, placeId: 23 });

      expect(instance.isEqual({ location: 1, placeId: 23 })).toBe(true);
    });

    it('should isEqual false', () => {
      rendered.setProps({ location: 1, placeId: 23 });

      expect(instance.isEqual({ location: 2, placeId: 34 })).toBe(false);
    });
  });

  describe('makeNode()', () => {
    it('should makeNode', () => {
      expect(
        instance.makeNode({ location: 1, icon: 2, placeId: 3 }, { type: 4 }),
      ).toMatchSnapshot();
    });

    it('should makeNode null', () => {
      expect(instance.makeNode({}, { type: 4 })).toMatchSnapshot();
    });
  });

  describe('handleLoadingChange()', () => {
    it('sets state.loading', () => {
      const loading = 'loading';
      instance.setState = jest.fn();
      instance.handleLoadingChange(loading);
      expect(instance.setState).toBeCalledWith({ loading });
    });
  });

  describe('handleSave()', () => {
    it('should update times', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();
      instance.handleSave();
      expect(NODE_API_HELPERS.getTreeAndTimes).toBeCalledWith(
        { id: instance.props.id },
        instance.props,
      );
    });
  });

  describe('renderView()', () => {
    it('should return null', () => {
      expect(instance.renderView({ value: '' })).toBe('');
    });

    it('should renderView', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderView, [
        { value: 'some value' },
      ]);
    });
  });

  describe('renderEdit()', () => {
    it('should renderEdit', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEdit, [{}, {}]);
    });
  });

  describe('renderLink()', () => {
    it('should renderLink', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLink);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderLink', () => {
      instance.renderLink = jest.fn(() => 'renderLink');

      rendered.setProps({ variant: LINK });

      expect(instance.render()).toBe('renderLink');
    });
  });
});
