import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { Medicals } from '../index';

describe('<Medicals />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<Medicals />);
    instance = rendered.instance();
  });

  describe('handleShowMedicals', () => {
    it('should toggle showMedicals value', () => {
      instance.setState({ showMedicals: false });
      instance.handleShowMedicals();

      expect(rendered.state().showMedicals).toBe(true);
    });
  });

  describe('getValue', () => {
    it('should return userValues and nodeValues', () => {
      rendered.setProps({
        userValues: [1],
        nodeValues: [2],
      });
      expect(instance.getValue()).toEqual([1, 2]);
    });
  });

  describe('getKeyPath', () => {
    it('should return node', () => {
      NODE_STORE_SELECTORS.node = jest.fn(() => 'node');
      expect(instance.getKeyPath()).toEqual('node');
    });
  });

  describe('renderRow', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot', () => {
      instance.getProps = jest.fn(() => {});
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable);
    });
  });

  describe('renderLogic', () => {
    it('should match snapshot', () => {
      instance.getProps = jest.fn(() => {});
      instance.getKeyPath = jest.fn(() => 'path');
      TEST_HELPERS.expectMatchSnapshot(instance.renderLogic);
    });
  });
});
