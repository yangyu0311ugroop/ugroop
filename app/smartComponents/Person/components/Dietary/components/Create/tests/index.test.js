import React from 'react';
import { shallow } from 'enzyme';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DietaryCreate } from '../index';

describe('DietaryCreate', () => {
  let rendered;
  let instance;
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  beforeEach(() => {
    rendered = shallow(<DietaryCreate classes={{}} resaga={resaga} />);
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
    it('should setState and addDietary', () => {
      PERSON_DETAIL_HELPER.addDietary = jest.fn();
      instance.handleValidSubmit({});
      expect(rendered.state().loading).toBe(true);
      expect(PERSON_DETAIL_HELPER.addDietary).toHaveBeenCalled();
    });
  });

  describe('handlePopoverClose', () => {
    it('should call setState', () => {
      instance.handlePopoverClose();
      expect(rendered.state().editing).toBe(false);
    });
  });

  describe('handleCreateClick', () => {
    it('should call setState', () => {
      instance.handleCreateClick();
      expect(rendered.state().editing).toBe(true);
    });
  });

  describe('handleCreateButtonRef', () => {
    it('should call setState', () => {
      instance.handleCreateButtonRef('ref');
      expect(rendered.state().anchorEl).toEqual('ref');
    });
  });
});
