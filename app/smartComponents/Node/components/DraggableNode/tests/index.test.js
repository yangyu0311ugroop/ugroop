import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DraggableNode } from '../index';

describe('<DraggableNode />', () => {
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
    rendered = shallow(<DraggableNode {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DraggableNode).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isDragDisabled()', () => {
    it('should return null', () => {
      const isDragDisabled = jest.fn(() => 'isDragDisabled');
      rendered.setProps({ isDragDisabled });

      expect(instance.isDragDisabled()).toBe('isDragDisabled');
      TEST_HELPERS.expectCalledAndMatchSnapshot(isDragDisabled);
    });

    it('isDragDisabled false', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({ editing: true, editable: true });

      expect(instance.isDragDisabled()).toBe(false);
    });

    it('isDragDisabled true #2', () => {
      ability.can = jest.fn(() => false);
      rendered.setProps({ editing: true, editable: true });

      expect(instance.isDragDisabled()).toBe(true);
    });
  });

  describe('renderChildren()', () => {
    it('should renderChildren', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderChildren({ hi: 122 }));
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
