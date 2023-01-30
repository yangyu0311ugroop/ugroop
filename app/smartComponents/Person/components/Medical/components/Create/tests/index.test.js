import React from 'react';
import { shallow } from 'enzyme';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { MedicalCreate } from '../index';

describe('<MedicalCreate />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<MedicalCreate classes={{}} resaga={{}} />);
    instance = rendered.instance();
  });

  describe('handleSubmitSuccess', () => {
    it('should setState', () => {
      instance.handleSubmitSuccess();
      expect(rendered.state().editing).toBe(false);
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleSubmitError', () => {
    it('should setState', () => {
      instance.handleSubmitError();
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleValidSubmit', () => {
    it('should call addMedical', () => {
      PERSON_DETAIL_HELPER.addMedical = jest.fn();
      instance.handleValidSubmit({});
      expect(PERSON_DETAIL_HELPER.addMedical).toHaveBeenCalled();
    });
  });

  describe('handlePopoverClose', () => {
    it('should setState', () => {
      instance.handlePopoverClose();
      expect(rendered.state().editing).toBe(false);
    });
  });

  describe('handleCreateClick', () => {
    it('should setState', () => {
      instance.handleCreateClick();
      expect(rendered.state().editing).toBe(true);
    });
  });

  describe('handleCreateButtonRef', () => {
    it('should setState', () => {
      instance.handleCreateButtonRef('ref');
      expect(rendered.state().anchorEl).toEqual('ref');
    });
  });
});
