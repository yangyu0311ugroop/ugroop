import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import dotProp from 'dot-prop-immutable';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { VARIANTS } from 'variantsConstants';
import { Passport } from '../index';

describe('<Passport />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<Passport resaga={resaga} classes={{}} />);
    instance = rendered.instance();
  });

  describe('renderPassportNumber', () => {
    it('should render passport number', () => {
      const snapshot = shallow(
        <div>{instance.renderPassportNumber('qqqq')}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValue', () => {
    it('should match snapshot if there is value', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderValue('value'));
    });
    it('should return value if value is false', () => {
      expect(instance.renderValue(false)).toBe(false);
    });
  });

  describe('renderActions', () => {
    it('should match snapshot if there is value', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderActions('value'));
    });
    it('should return value', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderActions(false));
    });
  });

  describe('renderProp', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        children: jest.fn(),
        passportNodeId: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderProp);
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot if userConnected and userValues.length', () => {
      rendered.setProps({
        userConnected: true,
        userValues: [1],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditable(true));
    });
  });

  describe('componentDidUpdate', () => {
    it('should handlePassportCreateClose', () => {
      const prevProps = {
        passportCreateOpen: true,
      };
      rendered.setProps({
        passportCreateOpen: false,
      });
      instance.handlePassportCreateClose = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handlePassportCreateClose).toHaveBeenCalled();
    });
    it('should handlePassportViewClose', () => {
      const prevProps = {
        passportViewOpen: true,
      };
      rendered.setProps({
        passportViewOpen: false,
      });
      instance.handlePassportViewClose = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handlePassportViewClose).toHaveBeenCalled();
    });

    describe('getValue', () => {
      it('should return value if exists', () => {
        rendered.setProps({
          userValues: [1],
          value: 1,
        });
        expect(instance.getValue()).toEqual(1);
      });
    });

    describe('getViewReadOnly', () => {
      it('should return true', () => {
        rendered.setProps({
          userValues: [1],
          userId: 2,
          myId: 3,
        });
        expect(instance.getViewReadOnly(1)).toBe(true);
      });
      it('should return readOnly', () => {
        rendered.setProps({
          userValues: [1],
          userId: 2,
          myId: 3,
          readOnly: true,
        });
        expect(instance.getViewReadOnly(77)).toEqual(true);
      });
    });

    describe('getPassportIdName', () => {
      it('should call NODE_STORE_HELPERS.pathToNodeInputName', () => {
        NODE_STORE_HELPERS.pathToNodeInputName = jest.fn();
        instance.getPassportIdName();
        expect(NODE_STORE_HELPERS.pathToNodeInputName).toHaveBeenCalled();
      });
    });

    describe('getNodeTypeName', () => {
      it('should call NODE_STORE_HELPERS.pathToNodeInputName', () => {
        NODE_STORE_HELPERS.pathToNodeInputName = jest.fn();
        instance.getNodeTypeName();
        expect(NODE_STORE_HELPERS.pathToNodeInputName).toHaveBeenCalled();
      });
    });

    describe('handleSelectPassportSuccess', () => {
      it('should call setState', () => {
        instance.handleSelectPassportSuccess(1, { onSuccess: jest.fn() })();
        expect(rendered.state().saving).toBe(false);
      });
      it('should call onClose', () => {
        instance.onClose = jest.fn();
        instance.handleSelectPassportSuccess(1, { onSuccess: false })();
        expect(instance.onClose).toHaveBeenCalled();
      });
    });

    describe('handleViewClick', () => {
      it('should call handlePassportView', () => {
        instance.handlePassportView = jest.fn();
        instance.handleViewClick(1)();
        expect(instance.handlePassportView).toHaveBeenCalledWith({ id: 1 });
      });
    });

    describe('handlePassportView', () => {
      it('should call setValue if id is true', () => {
        instance.onClose = jest.fn();
        instance.getViewReadOnly = jest.fn();
        instance.handlePassportView({ id: 1 });
        expect(resaga.setValue).toHaveBeenCalledWith({
          passportViewOpen: true,
          passportViewId: 1,
          passportViewDeletedId: undefined,
        });
      });
      it('should call setValue if no id', () => {
        instance.onClose = jest.fn();
        rendered.setProps({
          personId: 2,
        });
        instance.getViewReadOnly = jest.fn();
        instance.handlePassportView({ id: null });
        expect(resaga.setValue).toHaveBeenCalledWith({
          passportCreateOpen: true,
          passportCreatePersonId: 2,
          passportCreateCreatedId: undefined,
        });
      });
    });

    describe('handlePassportViewClose', () => {
      it('should call selectPassport if value is equal to deletedId', () => {
        rendered.setProps({
          value: 1,
        });
        instance.selectPassport = jest.fn();
        instance.handlePassportViewClose(1);
        expect(instance.selectPassport).toHaveBeenCalledWith(null);
      });
      it('should call onClose', () => {
        rendered.setProps({
          value: 2,
        });
        instance.onClose = jest.fn();
        instance.handlePassportViewClose(1);
        expect(instance.onClose).toHaveBeenCalled();
      });
      it('should do nothing', () => {
        const snap = shallow(<div>{instance.handlePassportViewClose(1)}</div>);
        rendered.setProps({
          value: 0,
        });
        expect(toJSON(snap)).toMatchSnapshot();
      });
    });

    describe('handleSelectPassportError', () => {
      it('should call setState', () => {
        instance.handleSelectPassportError()();
        expect(rendered.state().saving).toBe(false);
      });
      it('should call onError if onError exists', () => {
        const onError = jest.fn();
        instance.handleSelectPassportError({ onError })();
        expect(onError).toHaveBeenCalled();
      });
    });

    describe('handlePassportCreateClose', () => {
      it('should call selectPassport if there is createdId', () => {
        instance.selectPassport = jest.fn();
        instance.handlePassportCreateClose(1);
        expect(instance.selectPassport).toHaveBeenCalledWith(1);
      });
      it('should call onClose', () => {
        instance.onClose = jest.fn();
        instance.handlePassportCreateClose(false);
        expect(instance.onClose).toHaveBeenCalledWith(false);
      });
      it('should still match snapshot', () => {
        const snap = shallow(
          <div>{instance.handlePassportCreateClose(null)}</div>,
        );
        expect(toJSON(snap)).toMatchSnapshot();
      });
    });

    describe('selectPassport', () => {
      it('should call setState if value !== passportId', () => {
        rendered.setProps({
          value: 2,
        });
        dotProp.set = jest.fn();
        instance.selectPassport(1, {});
        expect(rendered.state().saving).toBe(true);
      });
      it('should call updateNode if passportNodeId exists', () => {
        rendered.setProps({
          value: 2,
          passportNodeId: 3,
        });
        dotProp.set = jest.fn();
        NODE_API_HELPERS.updateNode = jest.fn();
        instance.selectPassport(1, {});
        expect(NODE_API_HELPERS.updateNode).toHaveBeenCalled();
      });
      it('should call createNode if no passportNodeId', () => {
        rendered.setProps({
          value: 2,
          passportNodeId: null,
        });
        dotProp.set = jest.fn();
        NODE_API_HELPERS.createNode = jest.fn();
        instance.selectPassport(1, {});
        expect(NODE_API_HELPERS.createNode).toHaveBeenCalled();
      });
      it('should call onClose', () => {
        rendered.setProps({
          value: 3,
          passportNodeId: null,
        });
        instance.onClose = jest.fn();
        dotProp.set = jest.fn();
        instance.selectPassport(3, {});
        expect(instance.onClose).toHaveBeenCalled();
      });
    });

    describe('render', () => {
      it('should renderProps', () => {
        instance.renderProp = jest.fn(() => 'bloop');
        rendered.setProps({
          renderProp: true,
        });
        TEST_HELPERS.expectMatchSnapshot(instance.render);
      });

      it('should render row', () => {
        rendered.setProps({
          variant: VARIANTS.ROW,
        });
        TEST_HELPERS.expectMatchSnapshot(instance.render);
      });

      it('should renderIcon', () => {
        instance.renderIcon = jest.fn();
        rendered.setProps({
          variant: VARIANTS.ICON,
        });
        TEST_HELPERS.expectMatchSnapshot(instance.render);
      });
    });

    describe('renderIcon()', () => {
      it('should return null', () => {
        rendered.setProps({ passportNodeId: null });

        expect(instance.renderIcon()).toBe(null);
      });

      it('should renderIcon', () => {
        instance.getValue = jest.fn(() => 1);
        rendered.setProps({ passportNodeId: 1 });

        TEST_HELPERS.expectMatchSnapshot(instance.renderIcon);
      });
    });
  });
});
