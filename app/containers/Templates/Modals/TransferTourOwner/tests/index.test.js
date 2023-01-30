import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TransferTourOwner } from '../index';

describe('<TransferTourOwner />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 999,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<TransferTourOwner {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TransferTourOwner).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should not do anything', () => {
      rendered.setProps({ onClose: undefined });

      expect(instance.handleClose()).toBe(DO_NOTHING);
    });

    it('should call props.onClose', () => {
      const onClose = jest.fn();
      rendered.setProps({ onClose });

      instance.handleClose();

      expect(onClose).toBeCalledWith();
    });
  });
  describe('handleFilterSelect()', () => {
    it('setValue to be called', () => {
      instance.handleFilterSelect(true)();
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('renderPopperButton()', () => {
    it('setValue to be called', () => {
      instance.renderPopperButton({ openMenu: jest.fn(() => true) });
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('renderMenu()', () => {
    it('should render correctly', () => {
      const closeMenu = jest.fn(() => true);
      const snapshot = shallow(
        <div>{instance.renderMenu('test', true, closeMenu)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      const closeMenu = jest.fn(() => true);
      const snapshot = shallow(
        <div>{instance.renderMenu('test', false, closeMenu)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderPopperOptions()', () => {
    it('should render correctly', () => {
      const closeMenu = jest.fn(() => true);
      rendered.setProps({ orgId: 1 });
      const snapshot = shallow(
        <div>{instance.renderPopperOptions(closeMenu)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleTransfer()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>{instance.handleTransfer({ email: '1@1.com' })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleTransferSuccess()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.handleTransferSuccess()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleCancelSuccess()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.handleCancelSuccess()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleTransferError()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.handleTransferError()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleReset()', () => {
    it('should render correctly', () => {
      instance.isTransferAwaiting = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.handleReset()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderSubmitButton()', () => {
    it('should render correctly', () => {
      instance.isTransferAwaiting = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderSubmitButton()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderCancelButton()', () => {
    it('should render correctly', () => {
      instance.isTransferAwaiting = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderCancelButton()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleValid()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.handleValid()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.handleInvalidSubmit()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      instance.isTransferReady = jest.fn(() => true);
      instance.byEmail = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      instance.isTransferReady = jest.fn(() => false);
      instance.byEmail = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
