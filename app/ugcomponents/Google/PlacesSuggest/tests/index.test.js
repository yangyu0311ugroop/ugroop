/**
 * Created by quando on 21/2/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGPlacesSuggest, defaultFunc } from '../index';

describe('<UGPlacesSuggest />', () => {
  const googleMaps = {};
  const onChange = jest.fn();
  const children = <input />;

  let renderedComponent;

  beforeEach(() => {
    renderedComponent = shallow(
      <UGPlacesSuggest classes={{}} googleMaps={googleMaps} onChange={onChange}>
        {children}
      </UGPlacesSuggest>,
    );
  });

  it('should exists', () => {
    expect(UGPlacesSuggest);
  });
  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
  });
  it('should render its children', () => {
    expect(renderedComponent.find('input').length).toBe(1);
  });
  it('should render its children correctly', () => {
    const childComponent = <div className="test" />;
    const rendered = shallow(
      <UGPlacesSuggest classes={{}} googleMaps={googleMaps}>
        {childComponent}
      </UGPlacesSuggest>,
    );
    expect(rendered.find('.test').length).toEqual(1);
  });

  describe('<UGPlacesSuggest /> state', () => {
    it('should be initiated correctly', () => {
      const state = renderedComponent.state();
      expect(state.value.length).toBe(0);
    });
  });

  describe('<UGPlacesSuggest /> shouldComponentUpdate()', () => {
    it('should update when change value', () => {
      const instance = renderedComponent.instance();
      const nextState = { value: 'hi' };
      expect(
        instance.shouldComponentUpdate({ openSuggest: false }, nextState),
      ).toBe(true);
      renderedComponent.setState(nextState);
      expect(
        instance.shouldComponentUpdate({ openSuggest: false }, nextState),
      ).toBe(false);
    });
    it('should update when change openSuggest props', () => {
      const instance = renderedComponent.instance();
      const nextProps = { openSuggest: true };
      const nextState = { value: 'hi' };
      expect(instance.shouldComponentUpdate(nextProps, nextState)).toBe(true);
      instance.state = nextState;
      renderedComponent.setProps({
        openSuggest: true,
      });
      expect(instance.shouldComponentUpdate(nextProps, nextState)).toBe(false);
    });
    it('should not update when nothing changed', () => {
      const instance = renderedComponent.instance();
      const state = renderedComponent.state();
      expect(
        instance.shouldComponentUpdate({ openSuggest: false }, state),
      ).toBe(false);
    });
  });

  describe('<UGPlacesSuggest /> setAddress()', () => {
    it('should update state', () => {
      const instance = renderedComponent.instance();
      const mockFunc = jest.fn();
      instance.address = { setValue: mockFunc };
      const mockValue = 'test';
      instance.setAddress(mockValue);
      expect(renderedComponent.state().value).toMatch(mockValue);
      expect(mockFunc).toBeCalledWith(mockValue);
    });
  });

  describe('<UGPlacesSuggest /> handleSelectSuggest()', () => {
    it('should update state', () => {
      const instance = renderedComponent.instance();
      const mockFunc = jest.fn();
      instance.setAddress = mockFunc;
      const mockValue = { description: 'test handleSelectSuggest' };
      instance.handleSelectSuggest(mockValue);
      expect(mockFunc).toBeCalledWith(mockValue.description);
    });

    it('should call onSelectSuggest', () => {
      const mockFunc = jest.fn();
      const mockValue = { description: 'test handleSelectSuggest' };

      renderedComponent.setProps({ onSelectSuggest: mockFunc });

      const instance = renderedComponent.instance();
      instance.setAddress = jest.fn();
      instance.handleSelectSuggest(mockValue);

      expect(instance.setAddress).toBeCalledWith(mockValue.description);
      expect(mockFunc).toBeCalledWith(mockValue);
    });
  });

  describe('<UGPlacesSuggest /> handleChange()', () => {
    it('should update state', () => {
      const instance = renderedComponent.instance();
      const mockFunc = jest.fn();
      instance.setAddress = mockFunc;
      const mockValue = 'test handleChange';
      instance.handleChange(mockValue);
      expect(mockFunc).toBeCalledWith(mockValue);
    });

    it('should call onChange', () => {
      const mockValue = 'test handleChange';
      const mockFunc = jest.fn();

      renderedComponent.setProps({ onChange: mockFunc });

      const instance = renderedComponent.instance();
      instance.setAddress = jest.fn();

      instance.handleChange(mockValue);

      expect(instance.setAddress).toBeCalledWith(mockValue);
      expect(mockFunc).toBeCalledWith(mockValue);
    });
  });

  describe('<UGPlacesSuggest /> handleRef()', () => {
    it('should update state', () => {
      const instance = renderedComponent.instance();
      const mockValue = 'test handleChange';
      instance.handleRef(mockValue);
      expect(instance.address).toMatch(mockValue);
    });
  });

  describe('<UGPlacesSuggest /> renderSuggest()', () => {
    it('should render correctly', () => {
      const instance = renderedComponent.instance();
      const mainText = 'test main text';
      const secondaryText = 'test secondary text';
      const mockValue = {
        structured_formatting: {
          main_text: mainText,
          secondary_text: secondaryText,
        },
      };
      const rendered = shallow(instance.renderSuggest(mockValue));
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});

describe('defaultFunc', () => {
  it('should return undefined', () => {
    expect(defaultFunc()).toBe(undefined);
  });
});
