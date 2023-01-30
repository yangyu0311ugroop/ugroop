import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';

import { Form } from '../index';

describe('<Form />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<Form />);
    instance = rendered.instance();
  });

  describe('handleDeleteClick', () => {
    it('should call deleteNode', () => {
      NODE_API_HELPERS.deleteNode = jest.fn();
      instance.handleDeleteClick({});
      expect(NODE_API_HELPERS.deleteNode).toHaveBeenCalled();
    });
  });

  describe('handleDeleteNodeSuccess', () => {
    it('should call LOGIC_HELPERS.ifFunction with necessary functions', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      const onLoad = jest.fn();
      const onClose = jest.fn();

      instance.handleDeleteNodeSuccess({ onLoad, onClose })();
      expect(LOGIC_HELPERS.ifFunction).toHaveBeenCalledWith(onLoad);
      expect(LOGIC_HELPERS.ifFunction).toHaveBeenCalledWith(onClose);
    });
  });

  describe('handleDeleteNodeError', () => {
    it('should call LOGIC_HELPERS with onLoad', () => {
      LOGIC_HELPERS.ifFunction = jest.fn();
      const onLoad = jest.fn();

      instance.handleDeleteNodeError({ onLoad })();
      expect(LOGIC_HELPERS.ifFunction).toHaveBeenCalledWith(onLoad);
    });
  });

  describe('render', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
