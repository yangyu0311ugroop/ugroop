/**
 * Created by quando on 14/3/17.
 * Captcha
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
export class Captcha extends React.PureComponent {
  state = {};

  /**
   * render on mounted
   */
  componentDidMount = () => {
    this.explicitRender();
  };

  /**
   * render on updated
   */
  componentDidUpdate = () => {
    this.explicitRender();
  };

  getWidget = () => ({
    grecaptcha: this.props.grecaptcha,
    widgetId: this.state.widgetId,
  });

  /**
   * get captcha response token
   * @returns {*}
   */
  getValue = () => {
    const { grecaptcha, widgetId } = this.getWidget();
    if (grecaptcha && widgetId !== undefined) {
      return grecaptcha.getResponse(widgetId);
    }
    return null;
  };

  /**
   * execute captcha if it's done rendering
   */
  execute = () => {
    const { grecaptcha, widgetId } = this.getWidget();
    if (grecaptcha && widgetId !== undefined) {
      grecaptcha.execute(widgetId);
    }
  };

  /**
   * reset captcha
   */
  reset = () => {
    const { grecaptcha, widgetId } = this.getWidget();
    if (grecaptcha && widgetId !== undefined) {
      grecaptcha.reset(widgetId);
    }
  };

  /**
   * render captcha
   */
  explicitRender = () => {
    const { sitekey, onChange, theme, size, grecaptcha } = this.props;

    if (grecaptcha && this.state.widgetId === undefined) {
      const widgetId = grecaptcha.render(this.captcha, {
        sitekey,
        callback: onChange,
        theme,
        size,
      });
      this.setState({ widgetId });
    }
  };

  handleCaptchaRef = r => {
    this.captcha = r;
  };

  render = () => <div ref={this.handleCaptchaRef} />;
}
Captcha.propTypes = {
  size: PropTypes.string,
  sitekey: PropTypes.string,
  theme: PropTypes.string,
  grecaptcha: PropTypes.object,
  onChange: PropTypes.func,
};

Captcha.defaultProps = {
  size: 'invisible',
  theme: 'light',
  sitekey: process.env.GOOGLE_CAPTCHA_API_KEY,
};

export default Captcha;
