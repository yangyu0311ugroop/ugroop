import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PassportModals } from '../index';

describe('PassportModals', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<PassportModals resaga={resaga} />);
    instance = rendered.instance();
  });

  describe('handleClosePassportCreateModal', () => {
    it('should call setValue', () => {
      instance.handleClosePassportCreateModal();
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('handleClosePassportViewModal', () => {
    it('should call setValue', () => {
      instance.handleClosePassportViewModal();
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('renderPassportCreateModal', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPassportCreateModal);
    });
  });

  describe('renderPassportViewModal', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPassportViewModal);
    });
  });
});
