import React from 'react';
import { messageType } from 'utils/constant';
import { toast } from 'react-toastify';
import { toast as ugToast, fn } from '../index';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('Toast toast', () => {
  describe('toast', () => {
    const toastOptions = { autoClose: false };
    const expectedOptions = { someAttr: 'someValue' };
    const options = { ...expectedOptions, toastOptions };

    let expectedVal;

    it('toast.info()', () => {
      expectedVal = (
        <fn.ToastContent
          icon={<img alt="Test" src="/some/icon.png" />}
          iconClassName=""
          content="Test"
          textClassName=""
          type="info"
          {...expectedOptions}
        />
      );

      ugToast.info('Test', {
        icon: <img src="/some/icon.png" alt="Test" />,
        ...options,
      });

      expect(toast).toHaveBeenCalledWith(expectedVal, toastOptions);
    });

    it('toast.success()', () => {
      expectedVal = (
        <fn.ToastContent
          icon={<img alt="Test" src="/some/icon.png" />}
          iconClassName=""
          content="Test"
          textClassName=""
          type="success"
          {...expectedOptions}
        />
      );

      ugToast.success('Test', {
        icon: <img src="/some/icon.png" alt="Test" />,
        ...options,
      });

      expect(toast).toHaveBeenCalledWith(expectedVal, toastOptions);
    });

    it('toast.critical()', () => {
      expectedVal = (
        <fn.ToastContent
          icon={<img alt="Test" src="/some/icon.png" />}
          iconClassName=""
          content="Test"
          textClassName=""
          type="critical"
          {...expectedOptions}
        />
      );

      ugToast.critical('Test', {
        icon: <img src="/some/icon.png" alt="Test" />,
        ...options,
      });

      expect(toast).toHaveBeenCalledWith(expectedVal, toastOptions);
    });

    it('toast.error()', () => {
      expectedVal = (
        <fn.ToastContent
          icon={<img alt="Test" src="/some/icon.png" />}
          iconClassName=""
          content="Test"
          textClassName=""
          type="critical"
          {...expectedOptions}
        />
      );

      ugToast.error('Test', {
        icon: <img src="/some/icon.png" alt="Test" />,
        ...options,
      });

      expect(toast).toHaveBeenCalledWith(expectedVal, toastOptions);
    });

    it('toast.notify()', () => {
      expectedVal = (
        <fn.ToastContent
          icon={<img alt="Test" src="/some/icon.png" />}
          iconClassName=""
          content="Test"
          textClassName=""
          type="success"
          {...expectedOptions}
        />
      );

      ugToast.notify('Test', {
        icon: <img src="/some/icon.png" alt="Test" />,
        type: messageType.SUCCESS,
        ...options,
      });

      expect(toast).toHaveBeenCalledWith(expectedVal, toastOptions);
    });
  });
});
