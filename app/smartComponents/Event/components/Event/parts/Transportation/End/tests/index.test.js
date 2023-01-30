import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
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
        location: 'qqq',
        placeId: '222',
      });

      instance.componentDidUpdate({ location: 'Manila' });
      expect(resaga.setValue).toBeCalled();
    });

    it('should not call dispatchTo if currLocation is the same with previous one', () => {
      rendered.setProps({
        location: '',
        placeId: '',
      });

      expect(resaga.dispatchTo).not.toBeCalled();
    });
  });

  describe('handleSubmitSuccess', () => {
    it('should call dispatchTo', () => {
      const onSuccess = jest.fn();
      instance.handleSubmitSuccess(onSuccess)({
        raw: {
          detail: {
            detail: {
              common: {
                end: {
                  name: 'qqq',
                },
              },
            },
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
              detail: {
                common: {
                  end: {
                    name: 'asdasd',
                  },
                },
              },
            },
          },
        },
      });

      expect(TEMPLATE_API_HELPERS.patchEvent).toBeCalled();
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });

    it('should set redux value to null', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleSubmit({
        model: {
          data: {
            detail: {
              detail: {
                common: {
                  end: {
                    name: null,
                  },
                },
              },
            },
          },
        },
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
