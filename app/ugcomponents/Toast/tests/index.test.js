import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { messageType } from 'utils/constant';
import { ToastContainer, fn } from '../index';

describe('Toast', () => {
  describe('ToastContainer', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<ToastContainer />);
    });

    it('should render ToastContainer', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('ToastContent', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<fn.ToastContent content="Test text" />);
    });

    it('should render ToastContent', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('fn', () => {
    describe('loadIcon', () => {
      let icon;

      it('should return the icon itself if it exists', () => {
        icon = fn.loadIcon(<img src="/some/icon.png" alt="Test" />);

        expect(icon).toMatchSnapshot();
      });

      it('should return the correct default icon for messageType.INFO', () => {
        icon = fn.loadIcon(undefined, messageType.INFO);

        expect(icon).toMatchSnapshot();
      });

      it('should return the correct default icon for messageType.SUCCESS', () => {
        icon = fn.loadIcon(undefined, messageType.SUCCESS);

        expect(icon).toMatchSnapshot();
      });

      it('should return the correct default icon for messageType.CRITICAL', () => {
        icon = fn.loadIcon(undefined, messageType.CRITICAL);

        expect(icon).toMatchSnapshot();
      });

      it('should return nothing for other types', () => {
        icon = fn.loadIcon(undefined, 'some-type');

        expect(icon).toMatchSnapshot();
      });

      it('should return the correct default icon if no type is given', () => {
        icon = fn.loadIcon(undefined);

        expect(icon).toMatchSnapshot();
      });

      it('should return nothing if icon is null', () => {
        icon = fn.loadIcon(null, messageType.INFO);

        expect(icon).toMatchSnapshot();
      });
    });

    describe('toastNotify', () => {
      let result;

      it('should run properly using typical parameters', () => {
        result = fn.toastNotify('Test text', {
          icon: <img src="/some/icon.png" alt="Test" />,
          type: messageType.INFO,
        });
        expect(result).not.toBeNull();
      });
    });
  });
});
