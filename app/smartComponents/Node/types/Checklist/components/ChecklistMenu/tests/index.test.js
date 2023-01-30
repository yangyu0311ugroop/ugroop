import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { OPEN } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import { ChecklistMenu } from '../index';

describe('<ChecklistMenu />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 2299,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<ChecklistMenu {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ChecklistMenu).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should clearTimeout', () => {
      global.clearTimeout = jest.fn();
      instance.blockOpening = 'blockOpening';

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalledWith(instance.blockOpening);
    });
  });

  describe('openMoreMenu()', () => {
    it('should setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();

      instance.openMoreMenu()(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(rendered.state().anchorEl).toBe(event.currentTarget);
    });

    it('should NOT setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();
      rendered.setState({ blockOpening: true, anchorEl: null });

      instance.openMoreMenu()(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(rendered.state().anchorEl).toBe(null);
    });
    it('should NOT setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();
      rendered.setState({ blockOpening: true, anchorEl: null });

      const val = instance.openMoreMenu({
        isDialog: true,
        openMenu: jest.fn(() => 'open dialog'),
      })(event);
      expect(val).toEqual('open dialog');
      expect(instance.stopPropagation).toBeCalledWith(event);
    });
  });

  describe('closeMoreMenu()', () => {
    it('should setState', () => {
      const event = { currentTarget: 'target' };
      instance.stopPropagation = jest.fn();
      global.setTimeout = jest.fn(cb => cb());

      instance.closeMoreMenu(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(global.setTimeout).toBeCalled();
      expect(rendered.state().anchorEl).toBe(null);
    });
  });

  describe('stopPropagation()', () => {
    it('should setState', () => {
      const event = { stopPropagation: jest.fn() };

      instance.stopPropagation(event);

      expect(event.stopPropagation).toBeCalledWith();
    });
  });

  describe('editNode()', () => {
    it('should call resaga.setValue', () => {
      instance.closeMoreMenu = jest.fn();

      instance.editNode(2233);

      expect(instance.closeMoreMenu).toBeCalledWith(2233);
      expect(resaga.setValue).toBeCalledWith({ editChecklistId: props.id });
    });
  });

  describe('deleteNode()', () => {
    it('should call NODE_API_HELPERS.deleteNode', () => {
      instance.closeMoreMenu = jest.fn();
      NODE_API_HELPERS.deleteNode = jest.fn();
      const event = { stopPropagation: jest.fn() };

      instance.deleteNode(event)(2233);

      expect(instance.closeMoreMenu).toHaveBeenCalled();
      expect(NODE_API_HELPERS.deleteNode).toHaveBeenCalled();
    });
  });

  describe('confirmDelete()', () => {
    it('should confirmDelete()', () => {
      PORTAL_HELPERS.confirmDelete = jest.fn();

      instance.confirmDelete();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.confirmDelete);
    });
  });

  describe('deleteSuccess()', () => {
    it('should call deleteSuccess', () => {
      PORTAL_HELPERS.closePortal = jest.fn(() => 'closePortal');
      instance.deleteSuccess();

      expect(PORTAL_HELPERS.closePortal).toHaveBeenCalled();
    });
  });

  describe('toggleNode()', () => {
    it('should call NODE_API_HELPERS.toggleNode', () => {
      rendered.setProps({ id: 22, status: OPEN, me: 123 });
      instance.closeMoreMenu = jest.fn();
      CHECKLIST_HELPERS.toggleStatus = jest.fn();

      instance.toggleNode(2233);

      expect(instance.closeMoreMenu).toBeCalledWith(2233);
      expect(CHECKLIST_HELPERS.toggleStatus).toBeCalled();
      expect(CHECKLIST_HELPERS.toggleStatus.mock.calls).toMatchSnapshot();
    });
  });

  describe('createChecklist()', () => {
    it('should call resaga.setValue', () => {
      rendered.setProps({ parentNodeId: 33222 });
      instance.closeMoreMenu = jest.fn();

      instance.createChecklist(2233);

      expect(instance.closeMoreMenu).toBeCalledWith(2233);
      expect(resaga.setValue).toBeCalledWith({ addChecklistParentId: 33222 });
    });
  });

  describe('renderMenuItems()', () => {
    it('should render correctly', () => {
      rendered.setProps({ parentType: 'tour' });
      const snapshot = shallow(
        <div>{instance.renderMenuItems({ closeMenu: jest.fn() })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderButton()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderButton()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({ parentType: 'tour' });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
