/**
 * Created by quando on 21/2/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Captcha } from '../recaptcha';

describe('<Captcha />', () => {
  const captchaId = 'captcha';
  const grecaptcha = {
    hi: 'helloCaptcha',
    render: jest.fn(() => captchaId),
    response: jest.fn(),
    execute: jest.fn(),
    reset: jest.fn(),
    getResponse: jest.fn(a => a),
  };
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = shallow(<Captcha grecaptcha={grecaptcha} />);

    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Captcha);
  });
  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
  });
  it('should render children', () => {
    expect(renderedComponent.find('div').length).toBe(1);
  });

  describe('<Captcha /> componentDidMount()', () => {
    it('should behave correctly', () => {
      const captcha = renderedComponent.instance();
      captcha.explicitRender = jest.fn();
      captcha.componentDidMount();
      expect(captcha.explicitRender).toHaveBeenCalled();
    });
  });

  describe('<Captcha /> componentDidUpdate()', () => {
    it('should behave correctly', () => {
      const captcha = renderedComponent.instance();
      captcha.explicitRender = jest.fn();
      captcha.componentDidUpdate();
      expect(captcha.explicitRender).toHaveBeenCalled();
    });
  });

  describe('<Captcha /> getWidget()', () => {
    it('should behave correctly - 1', () => {
      const widgetId = 'hello widget';
      const captcha = renderedComponent.instance();
      captcha.setState({ widgetId });
      expect(captcha.getWidget()).toEqual({ grecaptcha, widgetId });
    });
  });

  describe('<Captcha /> getValue()', () => {
    it('should behave correctly - 1', () => {
      const captcha = renderedComponent.instance();
      captcha.getWidget = jest.fn(() => ({ widgetId: undefined }));

      expect(captcha.getValue()).toBe(null);
    });
    it('should behave correctly - 3', () => {
      const widgetId = 'hello widget';
      const captcha = renderedComponent.instance();
      captcha.getWidget = jest.fn(() => ({ grecaptcha, widgetId }));

      expect(captcha.getValue()).toBe(widgetId);
      expect(grecaptcha.getResponse).toBeCalledWith(widgetId);
    });
  });

  describe('<Captcha /> execute()', () => {
    it('should behave correctly - 1', () => {
      const captcha = renderedComponent.instance();
      captcha.getWidget = jest.fn(() => ({ widgetId: undefined }));

      captcha.execute();
      expect(grecaptcha.execute).not.toBeCalled();
    });
    it('should behave correctly - 3', () => {
      const widgetId = 'hello widget';
      const captcha = renderedComponent.instance();
      captcha.getWidget = jest.fn(() => ({ grecaptcha, widgetId }));

      captcha.execute();
      expect(grecaptcha.execute).toBeCalledWith(widgetId);
    });
  });

  describe('<Captcha /> reset()', () => {
    it('should behave correctly - 1', () => {
      const captcha = renderedComponent.instance();
      captcha.getWidget = jest.fn(() => ({ widgetId: undefined }));

      captcha.reset();
      expect(grecaptcha.reset).not.toBeCalled();
    });
    it('should behave correctly - 3', () => {
      const widgetId = 'hello widget';
      const captcha = renderedComponent.instance();
      captcha.getWidget = jest.fn(() => ({ grecaptcha, widgetId }));

      captcha.reset();
      expect(grecaptcha.reset).toBeCalledWith(widgetId);
    });
  });

  describe('<Captcha /> explicitRender()', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should behave correctly - 1', () => {
      renderedComponent.setState({ widgetId: 123 });
      const captcha = renderedComponent.instance();

      captcha.explicitRender();
      expect(grecaptcha.render).not.toBeCalled();
    });
    it('should behave correctly - 3', () => {
      const sitekey = 'sitekey';
      const onChange = jest.fn();
      const theme = 'dark';
      const size = 'invisible';
      const rendered = shallow(
        <Captcha
          grecaptcha={grecaptcha}
          onChange={onChange}
          theme={theme}
          size={size}
          sitekey={sitekey}
        />,
      );
      const captcha = rendered.instance();

      captcha.explicitRender();

      // Not sure how to mock a static class value
      expect(grecaptcha.render).toBeCalledWith(undefined, {
        sitekey,
        callback: onChange,
        theme,
        size,
      });
      expect(captcha.state.widgetId).toBe(captchaId);
    });
  });

  describe('<Captcha /> handleCaptchaRef()', () => {
    it('should behave correctly - 1', () => {
      const captcha = renderedComponent.instance();
      captcha.handleCaptchaRef(captchaId);
      expect(captcha.captcha).toBe(captchaId);
    });
  });
});
