import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { styleSheet, CustomToolbar, EmoijLists } from '../customToolBars';

describe('CustomToolBar', () => {
  describe('CustomToolBar Render Test', () => {
    let rendered;
    let instance;

    beforeEach(() => {
      rendered = shallow(<CustomToolbar toolBarId="abcd" classes={{}} />);
      instance = rendered.instance();
    });

    describe('fontSize()', () => {
      it('should fontSize', () => {
        TEST_HELPERS.expectMatchSnapshot(instance.fontSize);
      });
    });

    describe('handleValueRef()', () => {
      it('should return readOnly', () => {
        instance.handleValueRef(123);

        expect(instance.attachments).toBe(123);
      });
    });
    describe('renderDropZone()', () => {
      it('should return readOnly', () => {
        rendered.setProps({ disableImgUpload: true });
        expect(instance.renderDropZone()).toEqual(null);
      });
    });
    describe('insertImage()', () => {
      it('should return readOnly', () => {
        rendered.setProps({ toolBarAction: { insertImage: jest.fn() } });
        instance.insertImage(1, {});
      });
    });

    describe('openPopper', () => {
      it('should setState to target', () => {
        const event = { currentTarget: 'target' };
        rendered.setState({ anchorEl: false });
        instance.openPopper(event);
        expect(rendered.state().anchorEl).toEqual('target');
      });
      it('should setState to null', () => {
        const event = { currentTarget: 'target' };
        rendered.setState({ anchorEl: 'el' });
        instance.openPopper(event);
        expect(rendered.state().anchorEl).toEqual(null);
      });
    });

    describe('handlePopperClickAway', () => {
      it('should close popper', () => {
        rendered.setState({ clickAway: true });
        instance.closePopper = jest.fn();
        instance.handlePopperClickAway();
        expect(instance.closePopper).toHaveBeenCalled();
      });
      it('should not close popper', () => {
        rendered.setState({ clickAway: false });
        instance.closePopper = jest.fn();
        instance.handlePopperClickAway();
        expect(instance.closePopper).not.toHaveBeenCalled();
      });
    });

    describe('renderPopperContent()', () => {
      it('should renderPopperContent if discussion is true', () => {
        rendered.setProps({ discussion: true });
        instance.emoijItems = jest.fn(() => 'emoijItems');
        TEST_HELPERS.expectMatchSnapshot(instance.renderPopperContent);
      });
      it('should renderPopperContent if discussion is false', () => {
        rendered.setProps({ discussion: false });
        instance.emoijItems = jest.fn(() => 'emoijItems');
        TEST_HELPERS.expectMatchSnapshot(instance.renderPopperContent);
      });
    });

    it('readonly snapshot', () => {
      instance.emoij = () => 'emoij';
      rendered.setProps({ readOnly: true });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('emojiOnly snapshot', () => {
      instance.emoij = () => 'emoij';
      rendered.setProps({ emojiOnly: true });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('edit snapshot', () => {
      instance.emoij = () => 'emoij';
      instance.fontStyle = () => 'fontStyle';
      instance.list = () => 'list';
      instance.align = () => 'align';
      instance.indent = () => 'indent';
      instance.history = () => 'history';
      instance.header = () => 'header';
      instance.hyperLink = () => 'hyperLink';
      instance.video = () => 'video';
      instance.clearStyle = () => 'clearStyle';
      instance.textHighLight = () => 'textHighLight';
      instance.bgHighLight = () => 'bgHighLight';
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('buttonRef', () => {
    it('should assign ref correctly', () => {
      const wrapper = shallow(
        <CustomToolbar readOnly toolBarId="abcd" classes={styleSheet} />,
      );
      const instance = wrapper.instance();
      instance.buttonRef('somethingRef');
      expect(instance.button).toBe('somethingRef');
    });
  });
  describe('handleEmojiClick', () => {
    it('should call insertEmoji correctly', () => {
      const wrapper = shallow(
        <CustomToolbar readOnly toolBarId="abcd" classes={styleSheet} />,
      );
      const index = 2;
      const instance = wrapper.instance();
      instance.insertEmoij = jest.fn();
      const mockedFn = jest.fn();
      instance.handleEmojiClick(index)({ preventDefault: mockedFn });
      expect(mockedFn).toBeCalled();
      expect(instance.insertEmoij).toBeCalledWith(index);
    });
  });
  describe('insertEmoij', () => {
    it('should set state correctly', () => {
      const insertFn = jest.fn();
      const wrapper = shallow(
        <CustomToolbar
          readOnly
          toolBarId="abcd"
          classes={styleSheet}
          toolBarAction={{ insertEmoij: insertFn }}
        />,
      );
      const instance = wrapper.instance();
      instance.insertEmoij(2);
      expect(insertFn).toBeCalledWith(EmoijLists[2]);
    });
  });
});
