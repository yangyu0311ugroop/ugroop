import React from 'react';
import { shallow } from 'enzyme';
import { UploadProgressDialog } from '../index';
import {
  BEAT_LENGTH,
  UPLOADING,
  DONE_UPLOAD,
  AWAITING_UPLOAD,
  DELTA,
} from '../constants';

describe('UploadProgressDialog/index ', () => {
  let wrapper;
  let instance;

  const fileSize = 10240;

  beforeEach(() => {
    wrapper = shallow(
      <UploadProgressDialog filename="test-file.txt" fileSize={fileSize} />,
    );
    instance = wrapper.instance();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should exist ', () => {
    expect(UploadProgressDialog).toBeDefined();
  });

  it('should render without exploding ', () => {
    expect(wrapper.length).toBe(1);
  });

  describe('componentWillReceiveProps ', () => {
    let nextProps;
    let onClose;

    it('should do nothing if the component has been unmounted', () => {
      instance.componentIsMounted = false;

      nextProps = { dialogState: UPLOADING };
      instance.setState = jest.fn();

      instance.componentWillReceiveProps(nextProps);

      expect(instance.setState).not.toHaveBeenCalled();
      expect(setInterval).not.toHaveBeenCalled();
      expect(setTimeout).not.toHaveBeenCalled();
    });

    it('should initialize and initiate upload process if state is UPLOADING ', () => {
      nextProps = { dialogState: UPLOADING };
      instance.setState = jest.fn();
      instance.updateProgress = jest.fn();

      instance.componentWillReceiveProps(nextProps);

      expect(instance.setState).toHaveBeenCalledWith({ progress: 0 });
      expect(setInterval).toHaveBeenCalledWith(
        expect.any(Function),
        BEAT_LENGTH,
      );
      expect(setTimeout).not.toHaveBeenCalled();
      expect(instance.interval).not.toBe(null);
      expect(instance.updateProgress).not.toHaveBeenCalled();

      // Test the scenario when the `updateProgress()` function gets invoked by the timer
      jest.runTimersToTime(BEAT_LENGTH);
      expect(instance.updateProgress).toHaveBeenCalledWith();
    });

    it('should finalize the upload process if state is DONE_UPLOADING (1a)', () => {
      nextProps = { dialogState: DONE_UPLOAD };
      instance.interval = 123;

      instance.componentWillReceiveProps(nextProps);

      expect(clearInterval).toHaveBeenCalledWith(123);
      expect(instance.interval).toBe(null);
      expect(setInterval).not.toHaveBeenCalled();
    });

    it('should finalize the upload process if state is DONE_UPLOADING (1b)', () => {
      onClose = jest.fn();
      wrapper.setProps({ onClose });
      nextProps = { dialogState: DONE_UPLOAD };
      instance.interval = 123;

      instance.componentWillReceiveProps(nextProps);

      expect(clearInterval).toHaveBeenCalledWith(123);
      expect(instance.interval).toBe(null);
      expect(setInterval).not.toHaveBeenCalled();
      expect(onClose).toHaveBeenCalledWith();
    });

    it('should finalize the upload process if state is DONE_UPLOADING (2a)', () => {
      nextProps = { dialogState: DONE_UPLOAD };
      instance.interval = null;
      instance.setState = jest.fn();

      instance.componentWillReceiveProps(nextProps);

      expect(clearInterval).not.toHaveBeenCalled();
      expect(instance.interval).toBe(null);
      expect(setInterval).not.toHaveBeenCalled();
    });

    it('should finalize the upload process if state is DONE_UPLOADING (2a)', () => {
      onClose = jest.fn();
      wrapper.setProps({ onClose });
      nextProps = { dialogState: DONE_UPLOAD };
      instance.interval = null;
      instance.setState = jest.fn();

      instance.componentWillReceiveProps(nextProps);

      expect(clearInterval).not.toHaveBeenCalled();
      expect(instance.interval).toBe(null);
      expect(setInterval).not.toHaveBeenCalled();
      expect(onClose).toHaveBeenCalledWith();
    });

    it('should do nothing if state is neither UPLOADING nor DONE_UPLOADING', () => {
      nextProps = { dialogState: AWAITING_UPLOAD };
      instance.setState = jest.fn();
      instance.componentWillReceiveProps(nextProps);

      expect(instance.setState).not.toHaveBeenCalled();
      expect(setInterval).not.toHaveBeenCalled();
      expect(setTimeout).not.toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount ', () => {
    it('should clear the interval if still not yet cleared', () => {
      instance.interval = 123;

      instance.componentWillUnmount();

      expect(instance.interval).toBe(null);
    });

    it('should clear the timeout if still not yet cleared', () => {
      instance.timer = 123;

      instance.componentWillUnmount();

      expect(instance.timer).toBe(null);
    });
  });

  describe('updateProgress ', () => {
    it('should be called properly', () => {
      wrapper.state().bytesUploaded = 100;
      instance.setState = jest.fn();
      const progress = instance.computeProgress(100 + DELTA, fileSize);

      instance.updateProgress();

      expect(instance.setState).toHaveBeenCalledWith({
        bytesUploaded: 100 + DELTA,
        progress,
      });
    });

    it('should do nothing if component has been unmounted', () => {
      wrapper.state().bytesUploaded = 100;
      instance.setState = jest.fn();
      instance.componentIsMounted = false;

      instance.updateProgress();

      expect(instance.setState).not.toHaveBeenCalled();
    });
  });

  describe('computeProgress ', () => {
    let progress;

    it('should return the computed percentage if less than or equal to 99%', () => {
      progress = instance.computeProgress(1024, 10240);

      expect(progress).toBe(10);
    });

    it('should return 99 if greater than 99%', () => {
      progress = instance.computeProgress(10190, 10240);

      expect(progress).toBe(99);
    });
  });
});
