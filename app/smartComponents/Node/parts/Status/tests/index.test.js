import { CLOSED, COMPLETED, OUTSTANDING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Status } from '../index';

describe('<Status />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { default: 'default', someVariant: 'someVariant' },
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Status {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Status).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('className()', () => {
    it('should return generated className', () => {
      rendered.setProps({ className: 'customClassName' });

      expect(instance.className('someVariant')).toMatchSnapshot();
    });
  });

  describe('isCompleted()', () => {
    it('should return isCompleted', () => {
      rendered.setProps({ status: COMPLETED });
      expect(instance.isCompleted()).toBe(true);
    });

    it('should return !isCompleted', () => {
      rendered.setProps({ status: CLOSED });
      expect(instance.isCompleted()).toBe(false);
    });
  });

  describe('isClosed()', () => {
    it('should return isClosed', () => {
      rendered.setProps({ status: CLOSED });
      expect(instance.isClosed()).toBe(true);
    });

    it('should return !isClosed', () => {
      rendered.setProps({ status: COMPLETED });
      expect(instance.isClosed()).toBe(false);
    });
  });

  describe('toggleStatus()', () => {
    it('should toggleStatus COMPLETED', () => {
      CHECKLIST_HELPERS.toggleStatus = jest.fn(() => ({
        content: 'some node',
      }));
      rendered.setProps({ status: COMPLETED });

      instance.toggleStatus();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should toggleStatus OUTSTANDING', () => {
      CHECKLIST_HELPERS.toggleStatus = jest.fn(() => ({
        content: 'some node',
      }));
      rendered.setProps({ status: OUTSTANDING });

      instance.toggleStatus();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderText()', () => {
    it('should call LOGIC_HELPERS.ifElse', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.renderText();

      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderChecklistText()', () => {
    it('should call LOGIC_HELPERS.ifElse', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.renderChecklistText();

      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderChecklistButtonText()', () => {
    it('should call LOGIC_HELPERS.ifElse', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.renderChecklistButtonText();

      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderChecklistMenuText()', () => {
    it('should call LOGIC_HELPERS.ifElse', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.renderChecklistMenuText();

      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderButton()', () => {
    it('should call LOGIC_HELPERS.ifElse', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.renderButton();

      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });
  describe('renderCheckStatusIcon()', () => {
    it('should renderCheckStatusIcon', () => {
      const snapshot = shallow(
        <div>{instance.renderChecklistCheckInput()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      LOGIC_HELPERS.ifElse = jest.fn();
      rendered.setProps({ status: COMPLETED });
      instance.renderIcon = jest.fn(() => 'renderIcon');

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      const snapshot = shallow(<div>{instance.renderButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderIcon()', () => {
    it('should renderIcon', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      const snapshot = shallow(<div>{instance.renderIcon()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderChecklistIcon()', () => {
    it('should renderChecklistIcon', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      const snapshot = shallow(<div>{instance.renderChecklistIcon()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderSummary()', () => {
    it('should renderSummary', () => {
      LOGIC_HELPERS.ifElse = jest.fn();
      instance.renderText = jest.fn(() => 'renderText');
      instance.renderIcon = jest.fn(() => 'renderIcon');
      instance.renderButton = jest.fn(() => 'renderButton');

      const snapshot = shallow(<div>{instance.renderSummary()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.render()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderPersonIcon', () => {
    it('should render user icon if status is personal', () => {
      rendered.setProps({
        className: 'className',
        status: 'personal',
      });
      instance.renderPersonIcon();
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render folder icon if status is not personal', () => {
      rendered.setProps({
        className: 'className',
        status: 'not personal',
      });
      instance.renderPersonIcon();
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('renderCheckitem()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.renderCheckitem()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderChecklist()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.renderChecklist()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderTourStatus()', () => {
    it('should return LOGIC_HELPERS.switchCase', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.renderTourStatus()).toBe('switchCase');

      expect(LOGIC_HELPERS.switchCase).toBeCalled();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderInterestedPerson()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderInterestedPerson()).toMatchSnapshot();
    });
  });

  describe('renderParticipant()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderParticipant()).toMatchSnapshot();
    });
  });
  describe('tourStatusBandge()', () => {
    it('children snapshopts', () => {
      rendered.setProps({ children: 'some render' });
      expect(instance.tourStatusBandge()).toMatchSnapshot();
    });
    it('Badge snapshopts', () => {
      rendered.setProps({ status: 'cancelled', disabled: true });
      expect(instance.tourStatusBandge()).toMatchSnapshot();
    });
    it('Badge snapshopts', () => {
      rendered.setProps({ status: 'cancelled', disabled: false });
      expect(instance.tourStatusBandge()).toMatchSnapshot();
    });
  });
  describe('tourStatusSmallBandge()', () => {
    it('children snapshopts', () => {
      rendered.setProps({ children: 'some render' });
      expect(instance.tourStatusSmallBandge()).toMatchSnapshot();
    });
    it('Badge snapshopts', () => {
      rendered.setProps({ status: 'cancelled' });
      expect(instance.tourStatusSmallBandge()).toMatchSnapshot();
    });
  });
  describe('renderTourEditableStatus()', () => {
    it('children snapshopts', () => {
      expect(instance.renderTourEditableStatus()).toMatchSnapshot();
    });
  });
  describe('templateStatusUpdate()', () => {
    it('children snapshopts', () => {
      expect(instance.templateStatusUpdate({})()).toMatchSnapshot();
    });
  });
  describe('confirmAction()', () => {
    it('children snapshopts', () => {
      expect(instance.confirmAction()()).toMatchSnapshot();
    });
    it('children snapshopts', () => {
      expect(instance.confirmAction(true)()).toMatchSnapshot();
    });
  });
  describe('setFetching()', () => {
    it('children snapshopts', () => {
      instance.setFetching('test')();
      expect(rendered.state().isFetching).toEqual('test');
    });
  });
  describe('renderValue()', () => {
    it('children snapshopts', () => {
      rendered.setProps({ status: 'test' });
      expect(instance.renderValue()).toEqual('test');
    });
  });
  describe('onSuccess()', () => {
    it('return state to false', () => {
      rendered.setProps({ status: 'test' });
      instance.onSuccess();
      expect(rendered.state().isFetching).toEqual(false);
    });
  });
});
