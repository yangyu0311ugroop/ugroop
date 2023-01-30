import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ACTIVITY_DETAIL_KEYS } from 'smartComponents/Event/components/Event/parts/ActivityDetail/constants';
import { End } from '../index';

describe('<End />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<End {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(End).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidUpdate', () => {
    it('should call dispatchTo if currLocation is not the same with previous one', () => {
      rendered.setProps({
        value: JSON.stringify({
          name: 'qqq',
          placeId: '222',
        }),
      });

      instance.componentDidUpdate({
        value: JSON.stringify({ name: 'Manila' }),
      });
      expect(resaga.setValue).toBeCalled();
    });

    it('should not call dispatchTo if currLocation is the same with previous one', () => {
      rendered.setProps({
        value: JSON.stringify({
          name: '',
          placeId: '',
        }),
      });

      expect(resaga.dispatchTo).not.toBeCalled();
    });
  });

  describe('parseValue', () => {
    it('should return empty object if value is null', () => {
      const result = instance.parseValue('');
      expect(result).toEqual({});
    });

    it('should make value prop as default parameter if nothing was passed to it', () => {
      const expected = {
        bb: 'aa',
      };
      rendered.setProps({
        value: JSON.stringify(expected),
      });

      const result = instance.parseValue();

      expect(result).toEqual(expected);
    });
  });

  describe('handleSubmitSuccess', () => {
    it('should dispatch to geocode api', () => {
      const onSuccess = jest.fn();
      instance.handleSubmitSuccess(onSuccess)({
        raw: {
          detail: {
            activityDetails: [
              {
                key: ACTIVITY_DETAIL_KEYS.startLocation,
                value: JSON.stringify({
                  name: 'qqqq',
                  placeId: '1111',
                }),
              },
            ],
          },
        },
      });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleSubmit', () => {
    it('should create patchEvent request', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({
        model: {
          data: {
            detail: {
              activityDetails: {
                end: {
                  name: 'qqqq',
                },
              },
            },
          },
        },
        onSuccess: jest.fn(),
      });

      expect(TEMPLATE_API_HELPERS.patchEvent).toBeCalled();
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });

    it('should set redux value to null if location name is null', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({
        model: {
          data: {
            detail: {
              detail: {
                common: {
                  start: {
                    name: null,
                  },
                },
              },
            },
          },
        },
        onSuccess: jest.fn(),
      });

      expect(resaga.setValue).toBeCalledWith({
        formDistance: null,
        eventDistance: null,
      });
    });
  });

  describe('handleSelect', () => {
    it('setValue to null if location is empty string', () => {
      instance.handleSelect('currPickup')({
        description: '',
      });
      expect(resaga.setValue).toBeCalledWith({ currPickup: null });
    });

    it('should setValue if location is not empty string', () => {
      instance.handleSelect('currPickup')({
        description: 'location',
        place_id: 111,
      });

      expect(resaga.setValue).toBeCalledWith({
        currPickup: 111,
      });
    });
  });

  describe('handleOnClear', () => {
    it('handleSelect should be called', () => {
      instance.handleSelect = jest.fn(() => jest.fn());
      instance.handleOnClear();
      expect(instance.handleSelect).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
