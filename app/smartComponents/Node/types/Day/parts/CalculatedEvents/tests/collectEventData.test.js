import React from 'react';
import { shallow } from 'enzyme';
import { CollectEventData } from '../collectEventData';
describe('<CollectEventData />', () => {
  let rendered;
  let instance;
  const collectData = jest.fn();
  beforeEach(() => {
    rendered = shallow(
      <CollectEventData
        collectData={collectData}
        startValue="a"
        startMode="a"
        startTimeZone="a"
        startTimeReal="a"
        endTimeReal="a"
        endTimeZone="a"
        endMode="a"
        endValue="a"
        eventType="a"
        eventSubType="a"
      />,
    );
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('componentDidUpdate', () => {
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'b',
        eventSubType: 'a',
        startTimeZone: 'a',
        startTimeReal: 'a',
        startMode: 'a',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'b',
        startTimeZone: 'a',
        startTimeReal: 'a',
        startMode: 'a',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'b',
        startTimeZone: 'a',
        startTimeReal: 'a',
        startMode: 'a',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'a',
        startTimeZone: 'a',
        startTimeReal: 'a',
        startMode: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'a',
        startTimeZone: 'b',
        startTimeReal: 'a',
        startMode: 'a',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'a',
        startTimeZone: 'a',
        startTimeReal: 'b',
        startMode: 'a',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'a',
        startTimeZone: 'a',
        startTimeReal: 'a',
        startMode: 'a',
        endValue: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'a',
        startTimeZone: 'a',
        startTimeReal: 'a',
        startMode: 'a',
        endValue: 'a',
        endMode: 'a',
        endTimeZone: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'a',
        startTimeZone: 'a',
        startTimeReal: 'a',
        startMode: 'a',
        endValue: 'a',
        endMode: 'a',
        endTimeZone: 'a',
        endTimeReal: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'a',
        startTimeZone: 'a',
        startTimeReal: 'a',
        startMode: 'a',
        endValue: 'a',
        endMode: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call collectData', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'a',
        startTimeZone: 'a',
        endTimeZone: 'a',
        startTimeReal: 'a',
        endTimeReal: 'a',
        startMode: 'a',
        endMode: 'a',
        endValue: 'a',
        cancellation: {},
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should NOT call collectData', () => {
      instance.componentDidUpdate({
        eventType: 'a',
        eventSubType: 'a',
        startValue: 'a',
        startTimeZone: 'a',
        endTimeZone: 'a',
        startTimeReal: 'a',
        endTimeReal: 'a',
        startMode: 'a',
        endMode: 'a',
        endValue: 'a',
      });
      expect(collectData).toHaveBeenCalledTimes(1);
    });
  });
});
