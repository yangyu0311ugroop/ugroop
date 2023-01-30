import { shallow } from 'enzyme';
import React from 'react';
import Img from '../index';
const src = 'test.png';
const alt = 'test';
const renderComponent = (props = {}) =>
  shallow(<Img src={src} alt={alt} {...props} />);

describe('<Img />', () => {
  it('should render an <img> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.is('img')).toBe(true);
  });

  it('should have an src attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('src')).toEqual(src);
  });

  it('should have an alt attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('alt')).toEqual(alt);
  });

  it('should not have a className attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('className')).toBeUndefined();
  });

  it('should adopt a className attribute', () => {
    const className = 'test';
    const renderedComponent = renderComponent({ className });
    expect(renderedComponent.hasClass(className)).toBe(true);
  });

  it('should not adopt a srcset attribute', () => {
    const srcSet = 'test-HD.png 2x';
    const renderedComponent = renderComponent({ srcSet });
    expect(renderedComponent.prop('srcSet')).toBeDefined();
  });

  it('should not have an onLoad attribute by default', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('onLoad')).toBeUndefined();

    // Should not appear even in shallow rendering
    expect(renderedComponent.debug()).not.toMatch('onLoad={[undefined]}');
  });

  it('should have an onLoad attribute when supplied with an event handler', () => {
    const onLoad = jest.fn();
    const renderedComponent = renderComponent({ onLoad });
    expect(renderedComponent.prop('onLoad')).toBeDefined();

    renderedComponent.simulate('load');
    expect(onLoad).toHaveBeenCalled();
  });

  it('should not have an onError attribute by default', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('onError')).toBeUndefined();

    // Should not appear even in shallow rendering
    expect(renderedComponent.debug()).not.toMatch('onError={[undefined]}');
  });

  it('should have an onError attribute when supplied with an event handler', () => {
    const onError = jest.fn();
    const renderedComponent = renderComponent({ onError });
    expect(renderedComponent.prop('onError')).toBeDefined();

    renderedComponent.simulate('error');
    expect(onError).toHaveBeenCalled();
  });
});
