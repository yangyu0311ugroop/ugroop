import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { EditPhoneForm, emptyFunction } from '../index';

describe('emptyFunction', () => {
  it('should only be function with return undefined', () => {
    expect(emptyFunction()).toBe(undefined);
  });
});

describe('<EditPhoneForm />', () => {
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
    LOGIC_HELPERS.ifFunction = jest.fn();
    rendered = shallow(<EditPhoneForm {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EditPhoneForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleCreateForm', () => {
    it('should call phoneCUD store with the following data', () => {
      instance.handleCreateSuccess = 'handleCreateSuccess';
      instance.handleCreateForm({});
      expect(phoneCUD.store).toBeCalledWith({}, 'handleCreateSuccess');
    });
  });

  describe('handleCreateSuccess', () => {
    it('should call ifFunction logic helper', () => {
      instance.handleCreateSuccess();
      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith(null);
    });
  });

  describe('handleCancelCreate', () => {
    it('should call ifFunction logic helper', () => {
      instance.handleCancelCreate();
      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith(null);
    });
  });

  describe('handleEditForm', () => {
    it('should call update function of phoneCUD', () => {
      instance.handleEditSuccess = 'handleEditSuccess';
      instance.handleEditForm({});
      expect(phoneCUD.update).toBeCalledWith({}, 'handleEditSuccess');
    });
  });

  describe('handleEditSuccess', () => {
    it('should call handleCloseEdit', () => {
      instance.handleCloseEdit = jest.fn();
      instance.handleEditSuccess();
      expect(instance.handleCloseEdit).toBeCalled();
    });
  });

  describe('handleCloseEdit', () => {
    it('should set editable state to false', () => {
      instance.handleCloseEdit();
      expect(resaga.setValue).toBeCalledWith({
        editable: false,
      });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is inlineCardForm', () => {
      rendered.setProps({
        variant: VARIANTS.CARD_FORM,
      });
      instance.renderInlineCardForm = jest.fn(() => 'renderInlineCardForm');
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if variant is inlineCardForm and isCreateForm', () => {
      rendered.setProps({
        variant: VARIANTS.CARD_FORM,
      });
      instance.renderInlineCardForm = jest.fn(() => 'renderInlineCardForm');

      rendered.setProps({
        isCreateForm: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
