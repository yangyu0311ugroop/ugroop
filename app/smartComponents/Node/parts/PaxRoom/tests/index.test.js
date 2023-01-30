import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PaxRoom } from '../index';

describe('<RoomType />', () => {
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
    rendered = shallow(<PaxRoom {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PaxRoom).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderRoomTypeOptions()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRoomTypeOptions({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleSubmit()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.handleSubmit({ mode: {} })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditableOptions()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEditableOptions()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleValidSubmit()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.handleValidSubmit('test')()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should still match snapshot', () => {
      instance.getRoomdId = jest.fn(() => 1);
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleCreateClick()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.handleCreateClick()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleCreateButtonRef()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.handleCreateButtonRef('val')}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handlePopoverClose()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.handlePopoverClose()}</div>);

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
});
