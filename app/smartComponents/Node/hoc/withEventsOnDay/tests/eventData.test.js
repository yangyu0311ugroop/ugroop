import React from 'react';
import { shallow } from 'enzyme';
import EventData from '../eventData';
describe('<EventData />', () => {
  let rendered;
  let instance;
  const collectData = jest.fn();
  beforeEach(() => {
    rendered = shallow(
      <EventData
        collectData={collectData}
        subType="a"
        type="a"
        mode="a"
        timeZoneId="a"
        value="a"
        position="a"
        real="a"
        dayCount="a"
      />,
    );
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('componentDidUpdate', () => {
    it('should call collectData', () => {
      instance.componentDidUpdate({
        type: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call collectData', () => {
      instance.componentDidUpdate({
        type: 'a',
        subType: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        type: 'a',
        subType: 'a',
        mode: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        type: 'a',
        subType: 'a',
        mode: 'a',
        timeZoneId: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        type: 'a',
        subType: 'a',
        mode: 'a',
        timeZoneId: 'a',
        value: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        type: 'a',
        subType: 'a',
        mode: 'a',
        timeZoneId: 'a',
        value: 'a',
        position: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        type: 'a',
        subType: 'a',
        mode: 'a',
        timeZoneId: 'a',
        value: 'a',
        position: 'a',
        real: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call debouncedInitialCollect', () => {
      instance.componentDidUpdate({
        type: 'a',
        subType: 'a',
        mode: 'a',
        timeZoneId: 'a',
        value: 'a',
        position: 'a',
        real: 'a',
        dayCount: 'b',
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should call collectData', () => {
      instance.componentDidUpdate({
        type: 'a',
        subType: 'a',
        mode: 'a',
        timeZoneId: 'a',
        value: 'a',
        position: 'a',
        real: 'a',
        dayCount: 'a',
        cancellation: {},
      });
      expect(collectData).toHaveBeenCalledTimes(2);
    });
    it('should NOT call collectData', () => {
      instance.componentDidUpdate({
        type: 'a',
        subType: 'a',
        mode: 'a',
        timeZoneId: 'a',
        value: 'a',
        position: 'a',
        real: 'a',
        dayCount: 'a',
      });
      expect(collectData).toHaveBeenCalledTimes(1);
    });
  });
});
