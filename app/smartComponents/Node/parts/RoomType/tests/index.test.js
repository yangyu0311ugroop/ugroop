import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { RoomType } from '../index';

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
    rendered = shallow(<RoomType {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RoomType).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('contentClassName()', () => {
    it('should return contentClassName', () => {
      rendered.setProps({ className: 'customClassName' });

      expect(instance.contentClassName()).toMatchSnapshot();
    });
  });

  describe('onSave not to call onSuccess if not a function()', () => {
    it('should return contentClassName', () => {
      const onSuccess = jest.fn();
      rendered.setProps({});
      instance.onSave();
      expect(onSuccess).not.toBeCalled();
    });
    it('should call onSuccess', () => {
      const onSuccess = jest.fn();
      rendered.setProps({ onSuccess });
      instance.onSave();
      expect(onSuccess).toBeCalled();
    });
  });

  describe('onSuccessUpdate', () => {
    it('should call onSave', () => {
      instance.onSave = jest.fn();
      instance.onSuccessUpdate()();
      expect(instance.onSave).toBeCalled();
    });
  });

  describe('renderTitle()', () => {
    it('should return renderTitle', () => {
      rendered.setProps({ createdAt: '1234-12-21 13:34:56.789' });

      expect(instance.renderTitle()).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return null', () => {
      rendered.setProps({ createdAt: '' });

      expect(instance.renderDefault()).toBe(null);
    });

    it('should renderDefault', () => {
      rendered.setProps({ createdAt: new Date().toISOString() });
      instance.renderTitle = jest.fn(() => 'renderTitle');

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderDefault', () => {
      rendered.setProps({
        createdAt: new Date().toISOString(),
        showFromNow: true,
      });
      instance.renderTitle = jest.fn(() => 'renderTitle');

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRoomTypeButton()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRoomTypeButton({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should still match snapshot if render lable', () => {
      rendered.setProps({ renderLabel: () => 'test' });
      const snapshot = shallow(<div>{instance.renderRoomTypeButton({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderRoomTypeOptions()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderRoomTypeOptions({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should still match snapshot', () => {
      rendered.setProps({ roomType: 'test' });
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

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

  describe('rederEditablePopper()', () => {
    it('should still match snapshot', () => {
      rendered.setProps({ editable: true });
      const snapshot = shallow(<div>{instance.rederEditablePopper()}</div>);

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
    it('should still match snapshot if props handleOnSubmit is pass', () => {
      rendered.setProps({ handleOnSubmit: () => 'test' });
      const snapshot = shallow(
        <div>{instance.handleValidSubmit('test')()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderNodeProp()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderNodeProp()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTextOnly()', () => {
    it('should still match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTextOnly()}</div>);

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
