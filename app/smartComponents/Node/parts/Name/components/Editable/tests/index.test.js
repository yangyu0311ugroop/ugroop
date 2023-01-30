import React from 'react';
import dotProp from 'dot-prop-immutable';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { shallow } from 'enzyme';

import { NameEditable } from '../index';

describe('<NameEditable />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<NameEditable />);
    instance = rendered.instance();
  });

  describe('getPersonId', () => {
    it('should return userPersonId', () => {
      rendered.setProps({
        userPersonId: 1,
      });
      instance.isUserName = jest.fn(() => true);
      expect(instance.getPersonId()).toEqual(1);
    });
    it('should return personId', () => {
      rendered.setProps({
        personId: 2,
      });
      expect(instance.getPersonId()).toEqual(2);
    });
  });

  describe('isCurrentUserName', () => {
    it('should return isUserName', () => {
      rendered.setState({
        override: undefined,
      });
      instance.isUserName = jest.fn(() => true);
      expect(instance.isCurrentUserName()).toBe(true);
    });
    it('should return !override', () => {
      rendered.setState({
        override: true,
      });
      expect(instance.isCurrentUserName()).toBe(false);
    });
  });

  describe('getNamePersonIdName', () => {
    it('should call pathToNodeInputName', () => {
      NODE_STORE_HELPERS.pathToNodeInputName = jest.fn();
      instance.getNamePersonIdName();
      expect(NODE_STORE_HELPERS.pathToNodeInputName).toHaveBeenCalled();
    });
  });

  describe('handleUserCheckboxChange', () => {
    it('should setState', () => {
      instance.handleUserCheckboxChange(true, true);
      expect(rendered.state().override).toBe(true);
    });
  });

  describe('handleSubmit', () => {
    it('should call updatePerson and updateNode', () => {
      PERSON_DETAIL_HELPER.updatePerson = jest.fn();
      NODE_API_HELPERS.updateNode = jest.fn();

      dotProp.set = jest.fn(() => [{}]);
      const model = {
        namePersonId: 1,
        person: {},
      };
      const rest = {};
      instance.handleSubmit({ model, ...rest });
      expect(PERSON_DETAIL_HELPER.updatePerson).toHaveBeenCalled();
      expect(NODE_API_HELPERS.updateNode).toHaveBeenCalled();
    });
    it('should call updatePerson and updateNode if override is null', () => {
      PERSON_DETAIL_HELPER.updatePerson = jest.fn();
      NODE_API_HELPERS.updateNode = jest.fn();

      dotProp.set = jest.fn(() => [{}]);
      const model = {
        namePersonId: null,
        person: {},
      };
      const rest = {};
      instance.handleSubmit({ model, ...rest });
      expect(PERSON_DETAIL_HELPER.updatePerson).toHaveBeenCalled();
      expect(NODE_API_HELPERS.updateNode).toHaveBeenCalled();
    });
    it('should not call updatePerson and call updateNode if this.isCurrentUserName() is true', () => {
      PERSON_DETAIL_HELPER.updatePerson = jest.fn();
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.isCurrentUserName = jest.fn(() => true);

      dotProp.set = jest.fn(() => [{}]);
      const model = {
        namePersonId: null,
        person: {},
      };
      const rest = {};
      instance.handleSubmit({ model, ...rest });
      expect(PERSON_DETAIL_HELPER.updatePerson).not.toHaveBeenCalled();
      expect(NODE_API_HELPERS.updateNode).toHaveBeenCalled();
    });
  });

  describe('renderValue', () => {
    it('should call renderPart', () => {
      instance.renderPart = jest.fn(() => 'renderPart');
      expect(instance.renderValue()).toEqual('renderPart');
    });
  });
});
