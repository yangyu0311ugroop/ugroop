import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { BookingNumber } from '../index';

describe('<BookingNumber />', () => {
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
    rendered = shallow(<BookingNumber {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(BookingNumber).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSubmit', () => {
    it('should make patchEvent request', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({});

      expect(TEMPLATE_API_HELPERS.patchEvent).toBeCalled();
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.handleField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleEditable', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.handleEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLabelValue()', () => {
    it('should renderLabelValue', () => {
      rendered.setProps({ value: 'val' });
      TEST_HELPERS.expectMatchSnapshot(instance.renderLabelValue);
    });
  });

  describe('renderValueOnly()', () => {
    it('should return null', () => {
      rendered.setProps({ value: null });

      expect(instance.renderValueOnly()).toBe(null);
    });

    it('should renderValueOnly', () => {
      rendered.setProps({ value: 'value' });

      TEST_HELPERS.expectDefined(instance.renderValueOnly);
    });
  });
});
