import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { Dietaries } from '../index';

describe('<Dietaries />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<Dietaries />);
    instance = rendered.instance();
  });

  describe('getValue', () => {
    it('should return nodeValues and userValues', () => {
      rendered.setProps({
        nodeValues: [1],
        userValues: [2],
      });
      expect(instance.getValue()).toEqual([2, 1]);
    });
  });

  describe('getKeyPath', () => {
    it('should return NODE_STORE_SELECTORS.node', () => {
      NODE_STORE_SELECTORS.node = jest.fn(() => 'node');
      expect(instance.getKeyPath()).toEqual('node');
    });
  });

  describe('handleShowDietaries', () => {
    it('should set showDietaries state to its opposite value', () => {
      instance.setState({ showDietaries: false });
      instance.handleShowDietaries();

      expect(rendered.state().showDietaries).toBe(true);
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
