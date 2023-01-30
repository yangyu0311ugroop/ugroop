import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { UGTabContainer } from '../index';

describe('<Tab />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<UGTabContainer {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(UGTabContainer).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('isDragDisabled()', () => {
    it('should return false', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.isDragDisabled()).toBe(false);
    });

    it('should return true #1', () => {
      rendered.setProps({ editable: false });

      expect(instance.isDragDisabled()).toBe(true);
    });

    it('should return true #2', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => false);

      expect(instance.isDragDisabled()).toBe(true);
    });
  });

  describe('renderDraggable()', () => {
    it('should render correctly', () => {
      rendered.setProps({ accessible: false });

      const snapshot = shallow(
        <div>
          {instance.renderDraggable({ tabProps: 123 })({
            innerRef: 123,
            draggableProps: { hi: 'ho' },
            dragHandleProps: { ho: 'heh' },
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should return empty if not accessible', () => {
      rendered.setProps({ accessible: false });

      expect(instance.render()).toEqual(<div />);
    });

    it('should not be drabble if is Gallery', () => {
      rendered.setProps({ label: 'Gallery' });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
