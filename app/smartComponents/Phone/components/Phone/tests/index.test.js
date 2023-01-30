import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Phone, emptyFunction } from '../index';

describe('emptyFunction', () => {
  it('should be a function that only returns undefined', () => {
    expect(emptyFunction()).toBe(undefined);
  });
});

describe('<Phone />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const phoneCUD = {
    store: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    phoneCUD,
  };

  beforeEach(() => {
    rendered = shallow(<Phone {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Phone).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openDialog', () => {
    it('should make openDialog state to true', () => {
      instance.openDialog();
      expect(rendered.state().openDialog).toBe(true);
    });
  });

  describe('closeDialog', () => {
    it('should make closeDialog state to true', () => {
      rendered.setState({
        openDialog: true,
      });
      instance.closeDialog();
      expect(rendered.state().openDialog).toBe(false);
    });
  });

  describe('handleDelete', () => {
    it('should call destroy of phoneCUD', () => {
      instance.handleDeleteSuccess = 'handleDeleteSuccess';
      instance.handleDelete();
      expect(phoneCUD.destroy).toBeCalledWith('handleDeleteSuccess');
    });
  });

  describe('handleDeleteSuccess', () => {
    it('should call closeDialog', () => {
      instance.closeDialog = jest.fn();
      instance.handleDeleteSuccess();
      expect(instance.closeDialog).toBeCalled();
    });
  });

  describe('handleEdit', () => {
    it('should set editable redux state to true', () => {
      instance.handleEdit();
      expect(resaga.setValue).toBeCalledWith({
        editable: true,
      });
    });
  });

  describe('renderPhoneActions', () => {
    it('should render something', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderPhoneActions({ value: '1' }),
      );
    });
    it('should return null', () => {
      expect(instance.renderPhoneActions({ value: null })).toEqual(null);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderDefault = jest.fn(() => 'renderDefault');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if editable is true', () => {
      rendered.setProps({
        editable: true,
      });
      instance.renderPhoneCard = jest.fn(() => 'renderPhoneCard');
      instance.renderDefault = jest.fn(() => 'renderDefault');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if isForCreating props is true', () => {
      rendered.setProps({
        isForCreating: true,
      });
      instance.renderPhoneCard = jest.fn(() => 'renderPhoneCard');
      instance.renderDefault = jest.fn(() => 'renderDefault');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if showActions props is false', () => {
      rendered.setProps({
        showActions: false,
      });
      instance.renderPhoneCard = jest.fn(() => 'renderPhoneCard');
      instance.renderDefault = jest.fn(() => 'renderDefault');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant = FIELDS_ONLY', () => {
      rendered.setProps({
        variant: 'fieldsOnly',
      });
      instance.renderFieldsOnly = jest.fn(() => 'renderFieldsOnly');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant = renderTextWithIcon', () => {
      rendered.setProps({
        variant: 'icon',
        withAction: true,
      });
      instance.renderTextWithIcon = jest.fn(() => 'renderTextWithIcon');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant = renderTextOnly', () => {
      rendered.setProps({
        variant: 'textOnly',
      });
      instance.renderTextOnly = jest.fn(() => 'renderTextOnly');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
