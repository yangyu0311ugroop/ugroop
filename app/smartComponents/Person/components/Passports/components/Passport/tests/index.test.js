import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { Passport, anonFunc } from '../index';

describe('<Passport />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const passportCUD = {
    openEdit: jest.fn(),
    store: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    closeEdit: jest.fn(),
    setIsPrimary: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    passportCUD,
  };

  beforeEach(() => {
    LOGIC_HELPERS.ifFunction = jest.fn();
    rendered = shallow(<Passport {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Passport).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('anonFunc', () => {
    it('should return nothing', () => {
      expect(anonFunc()).toBe(undefined);
    });
  });

  describe('handleClose()', () => {
    it('should use passporrtCUD closeEdit', () => {
      instance.handleClose();

      expect(passportCUD.closeEdit).toBeCalled();
    });
  });

  describe('handleSubmit', () => {
    it('should use store if forCreate props is true', () => {
      rendered.setProps({
        forCreate: true,
      });
      instance.handleSubmit();

      expect(passportCUD.store).toBeCalled();
      expect(passportCUD.store.mock.calls).toMatchSnapshot();
    });

    it('should use store if forCreate props is false', () => {
      rendered.setProps({
        forCreate: false,
      });
      instance.handleSubmit();

      expect(passportCUD.update).toBeCalled();
      expect(passportCUD.update.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderDialogHeader', () => {
    it('should render the dialog title for edit mode', () => {
      const snapshot = shallow(
        <div>
          {instance.renderDialogHeader({
            renderCloseButton: () => 'renderCloseButton',
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditAction', () => {
    it('should render correctly', () => {
      instance.handleSubmit = jest.fn();
      const snapshot = shallow(<div>{instance.renderEditAction()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCardForm', () => {
    it('should render correctly', () => {
      instance.handleSubmit = jest.fn();
      instance.renderEditAction = jest.fn(() => 'renderAction');
      const snapshot = shallow(<div>{instance.renderCardForm()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      LOGIC_HELPERS.switchCase = jest.fn();
      instance.render();

      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
