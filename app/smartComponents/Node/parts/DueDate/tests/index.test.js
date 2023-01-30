import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DueDate } from '../index';

describe('<DueDate />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: { default: 'default' },
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<DueDate {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DueDate).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should return componentWillUnmount', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps({ className: 'customClassName' });

      expect(instance.contentClassName()).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      rendered.setProps({ dueDate: '', showEmpty: false });

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderDefault', () => {
      rendered.setProps({ createdAt: new Date('1/1/2001').toISOString() });
      instance.renderDueDate = jest.fn(() => 'renderDueDate');
      instance.renderChangeDueDatePopover = jest.fn(
        () => 'renderChangeDueDatePopover',
      );

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderReadOnly()', () => {
    it('should renderReadOnly', () => {
      LOGIC_HELPERS.ifElse = jest.fn();
      rendered.setProps({ showTime: false });

      const snapshot = shallow(<div>{instance.renderReadOnly()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
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

  // inline editable functions
  describe('openDueDate()', () => {
    it('should not setState', () => {
      const event = { currentTarget: 2233 };
      rendered.setState({ anchorEl: false, blockOpening: true });
      instance.stopPropagation = jest.fn();

      instance.openDueDate(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(rendered.state().anchorEl).toBe(false);
    });

    it('should setState', () => {
      const event = { currentTarget: 2233 };
      rendered.setState({ anchorEl: false });
      instance.stopPropagation = jest.fn();

      instance.openDueDate(event);

      expect(instance.stopPropagation).toBeCalledWith(event);
      expect(rendered.state().anchorEl).toBe(2233);
    });
  });

  describe('closeDueDate()', () => {
    it('should setState', () => {
      global.setTimeout = jest.fn(cb => cb());
      rendered.setState({ anchorEl: 2233 });
      instance.stopPropagation = jest.fn();

      instance.closeDueDate(2233);

      expect(instance.stopPropagation).toBeCalledWith(2233);
      expect(rendered.state().anchorEl).toBe(null);
      expect(rendered.state().blockOpening).toBe(false);
    });
  });

  describe('stopPropagation()', () => {
    it('should do nothing', () => {
      expect(instance.stopPropagation({})).toBe(undefined);
    });

    it('should call event.stopPropagation', () => {
      const event = { stopPropagation: jest.fn() };

      instance.stopPropagation(event);

      expect(event.stopPropagation).toBeCalledWith();
    });
  });

  describe('dueDateSubmit()', () => {
    it('should call changeDueDate with null', () => {
      instance.changeDueDate = jest.fn();

      instance.dueDateSubmit({});

      expect(instance.changeDueDate).toBeCalledWith(null);
    });

    it('should call changeDueDate', () => {
      instance.changeDueDate = jest.fn();

      instance.dueDateSubmit({ dueDate: '1/2/2001', dueTime: '13:45' });

      expect(instance.changeDueDate).toBeCalled();
    });
  });

  describe('unsetDueDate()', () => {
    it('should call changeDueDate with null', () => {
      instance.changeDueDate = jest.fn();

      instance.unsetDueDate({});

      expect(instance.changeDueDate).toBeCalledWith(null);
    });
  });

  describe('changeDueDate()', () => {
    it('should call dispatchTo', () => {
      instance.changeDueDate({ dueDate: 'dueDate' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('upsertTime()', () => {
    it('should call upsertTime and return a an array value', () => {
      const result = instance.upsertTime('010101')([]);
      expect(result).toEqual(['010101']);
    });
  });

  describe('removedIdInArray()', () => {
    it('should call removedIdInArray and return a an object with value', () => {
      const result = instance.removedIdInArray('010101', 1)(['010101']);
      expect(result).toEqual({ '0': '010101' });
    });
    it('should call removedIdInArray and return an object without the value', () => {
      const result = instance.removedIdInArray('010101', 1)({
        '010101': [1, 2],
      });
      expect(result).toEqual({ '010101': [1, 2] });
    });
  });
  describe('removedTimes()', () => {
    it('should call removedTimes and return a an object with value', () => {
      const result = instance.removedTimes(['010101']);
      expect(result).toEqual(['010101']);
    });
    it('should call removedTimes and not delete the key if its not empty', () => {
      rendered.setProps({ timeNodesCount: 2 });
      const result = instance.removedTimes(['010101']);
      expect(result).toEqual(['010101']);
    });
  });
  describe('updateTimes()', () => {
    it('should call updateTimes and do nothing if calculateTimes is false', () => {
      instance.updateTimes({});
    });
    it('Calculate times resaga should be called', () => {
      rendered.setProps({ calculateTimes: true, id: 1 });
      const result = {
        1: {
          calculated: {
            time: {
              start: {
                value: '010101',
              },
            },
          },
        },
      };
      instance.updateTimes(result);
      expect(resaga.setValue).toBeCalled();
    });
    it('Calculate times resaga should be called', () => {
      rendered.setProps({ calculateTimes: true, id: 1 });
      const result = {
        1: {
          calculated: {
            time: {
              start: {
                value2: '010101',
              },
            },
          },
        },
      };
      instance.updateTimes(result);
      expect(resaga.setValue).not.toBeCalled();
    });
  });
  describe('updateOnSuccess()', () => {
    it('updateTimes should be called', () => {
      instance.updateTimes = jest.fn();
      instance.updateOnSuccess({});
      expect(instance.updateTimes).toHaveBeenCalled();
    });
  });
  describe('renderChangeDueDate()', () => {
    it('should return null', () => {
      rendered.setState({ anchorEl: '' });

      expect(instance.renderChangeDueDate()).toBe(null);
    });

    it('should renderChangeDueDate', () => {
      rendered.setState({ anchorEl: 'exist' });

      const snapshot = shallow(<div>{instance.renderChangeDueDate()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDueDate()', () => {
    it('should renderDueDate', () => {
      LOGIC_HELPERS.ifElse = jest.fn();
      rendered.setProps({ dueDate: '1/2/2001' });
      instance.renderReadOnly = jest.fn(() => 'renderReadOnly');

      const snapshot = shallow(<div>{instance.renderDueDate()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render placeholder', () => {
      LOGIC_HELPERS.ifElse = jest.fn();
      rendered.setProps({ dueDate: '' });

      const snapshot = shallow(<div>{instance.renderDueDate()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
