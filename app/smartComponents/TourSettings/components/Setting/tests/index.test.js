import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TourSetting } from '../index';
import { VARIANTS } from '../../../../../variantsConstants';
import { TEMPLATE_API_HELPERS } from '../../../../../apis/components/Template/helpers';

describe('<TourSetting />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const intl = {
    formatMessage: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    intl,
  };

  beforeEach(() => {
    rendered = shallow(<TourSetting {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(TourSetting).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('upsertSetting()', () => {
    it('should render correctly', () => {
      TEMPLATE_API_HELPERS.upsertSetting = jest.fn();
      instance.upsertSetting('1');
      expect(TEMPLATE_API_HELPERS.upsertSetting).toBeCalled();
    });
  });
  describe('handleUpdateSuccess()', () => {
    it('loading state to true', () => {
      instance.handleUpdateSuccess()();
      expect(rendered.state().loading).toEqual(false);
    });
    it('loading state to true with success', () => {
      const onSuccess = jest.fn();
      instance.handleUpdateSuccess(onSuccess)();
      expect(rendered.state().loading).toEqual(false);
    });
  });
  describe('handleUpdateError()', () => {
    it('loading state tp false', () => {
      instance.handleUpdateError()();
      expect(rendered.state().loading).toEqual(false);
    });
    it('loading state tp false with error', () => {
      const onError = jest.fn();
      instance.handleUpdateError(onError)();
      expect(rendered.state().loading).toEqual(false);
    });
  });

  describe('handleSubmit()', () => {
    it('loading state tp false', () => {
      instance.upsertSetting = jest.fn();
      instance.handleSubmit({
        model: {},
        onSuccess: jest.fn(),
        onError: jest.fn(),
      });
      expect(instance.upsertSetting).toBeCalled();
    });
  });
  describe('renderValue()', () => {
    it('To match snapshots', () => {
      const snapshot = shallow(<div>{instance.renderValue()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderEditable()', () => {
    it('To match snapshots', () => {
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleSwitchChange()', () => {
    it('To match snapshots', () => {
      rendered.upsertSetting = jest.fn();
      const snapshot = shallow(<div>{instance.handleSwitchChange()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleLogicalSwitchChange()', () => {
    it('To match snapshots', () => {
      rendered.upsertSetting = jest.fn();
      const snapshot = shallow(
        <div>{instance.handleLogicalSwitchChange()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderLabel()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderLabel()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text only variant render prop', () => {
      rendered.setProps({
        variant: VARIANTS.RENDER_PROP,
      });
      rendered.setProps({ children: jest.fn() });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render text only variant render prop with action', () => {
      rendered.setProps({
        variant: VARIANTS.RENDER_PROP,
        withAction: true,
      });
      rendered.setProps({ children: jest.fn() });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
