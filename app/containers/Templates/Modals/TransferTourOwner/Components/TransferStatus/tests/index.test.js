import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { VARIANTS } from 'variantsConstants';
import { TransferStatus } from '../index';

describe('<TransferStatus />', () => {
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

    rendered = shallow(<TransferStatus {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TransferStatus).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('handleCancelTransfer()', () => {
    it('should renderPersonal', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleCancelTransfer());
    });
  });

  describe('onConfirmCancelTransfer()', () => {
    it('should renderOrganisation', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.onConfirmCancelTransfer());
    });
  });

  describe('isOwner()', () => {
    it('should isOwner', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.isOwner());
    });
  });

  describe('handleCancelSuccess()', () => {
    it('should handleCancelSuccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleCancelSuccess());
    });
    it('should handleCancelSuccess', () => {
      rendered.setProps({ onSuccess: jest.fn(() => 'test') });
      TEST_HELPERS.expectMatchSnapshot(instance.handleCancelSuccess());
    });
  });

  describe('handleTransferError()', () => {
    it('should handleTransferError', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.handleTransferError());
    });
    it('should handleTransferError', () => {
      rendered.setProps({ onError: jest.fn(() => 'test') });
      TEST_HELPERS.expectMatchSnapshot(instance.handleTransferError());
    });
  });
  describe('openTransferTour()', () => {
    it('should openTransferTour', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.openTransferTour());
    });
  });

  describe('renderMoreButton()', () => {
    it('should renderMoreButton if from an invite', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderMoreButton({ openMenu: jest.fn() }),
      );
    });
    it('should renderMoreButton', () => {
      instance.isMyInvite = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderMoreButton({ openMenu: jest.fn() }),
      );
    });
  });

  describe('renderMore()', () => {
    it('should renderMore', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMore());
    });
  });

  describe('renderViewPopper()', () => {
    it('should renderViewPopper', () => {
      instance.isMyInvite = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderViewPopper({ openMenu: jest.fn() }),
      );
    });
    it('should renderViewPopper', () => {
      instance.isMyInvite = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderViewPopper({ openMenu: jest.fn() }),
      );
    });
  });

  describe('render()', () => {
    it('should render badge simple', () => {
      instance.isOwner = jest.fn(() => true);
      rendered.setProps({ transferStatus: 'pending', simple: true });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render badge simple', () => {
      instance.isOwner = jest.fn(() => true);
      instance.isMyInvite = jest.fn(() => false);
      rendered.setProps({ transferStatus: 'pending', simple: true });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render badge', () => {
      instance.isOwner = jest.fn(() => true);
      rendered.setProps({ transferStatus: 'pending', simple: false });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render badge', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render badge', () => {
      // rendered.setProps({ variant: VARIANTS.BUTTON });
      rendered.setProps({ transferStatus: 'pending' });
      instance.isOwner = jest.fn(() => false);
      instance.isMyInvite = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render badge from my invite', () => {
      // rendered.setProps({ variant: VARIANTS.BUTTON });
      rendered.setProps({ transferStatus: 'pending' });
      instance.isOwner = jest.fn(() => true);
      instance.isMyInvite = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should renderButton', () => {
      rendered.setProps({ variant: VARIANTS.BUTTON });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should renderButton', () => {
      instance.isOwner = jest.fn(() => true);
      rendered.setProps({
        variant: VARIANTS.BUTTON,
        transferStatus: 'pending',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
