import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import {
  FACEBOOK,
  TWITTER,
  MAIL,
  WHATSAPP,
  SHARE_URL_HELPERS as helpers,
} from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { capitalizeFirstLetter } from 'utils/stringAdditions';
import Button from 'viewComponents/Button';
import { Facebook, Twitter, Mail, WhatsApp } from '../Icons';
import style from './style';

export class ShareButton extends PureComponent {
  generateLink = () => {
    const { type, link, message } = this.props;
    const formatLink = encodeURIComponent(link);
    const formatMessage = encodeURIComponent(message);

    switch (type) {
      case FACEBOOK:
        return helpers.facebookURL(formatLink, formatMessage);
      case TWITTER:
        return helpers.twitterURL(formatLink, formatMessage);
      case WHATSAPP:
        return helpers.whatsAppURL(formatLink, formatMessage);
      default:
        return helpers.mailURL(formatLink, formatMessage);
    }
  };

  generateIcon = () => {
    const { type } = this.props;
    switch (type) {
      case FACEBOOK:
        return Facebook;
      case TWITTER:
        return Twitter;
      case WHATSAPP:
        return WhatsApp;
      default:
        return Mail;
    }
  };

  render() {
    const {
      classes,
      type,
      size,
      sizeButton: sizeButtonProp,
      variant: variantProp,
      tooltipProps,
      customButtonClass,
    } = this.props;

    const label = size === 'base' ? '' : type;
    const sizeButton = capitalizeFirstLetter(sizeButtonProp);
    const variant =
      variantProp === 'standard' ? '' : capitalizeFirstLetter(variantProp);
    return (
      <a
        className={classes.link}
        target="_blank"
        href={this.generateLink()}
        aria-label={label}
      >
        <Button
          tooltipProps={{
            title: tooltipProps.title,
          }}
          buttonTitle={tooltipProps.title}
          variant={VARIANTS.INLINE}
          size="extraSmall"
          color="black"
        >
          <div
            className={classnames(
              classes[`buttonRoot${sizeButton}`],
              classes[
                `button${variant}${type}${
                  type === 'WhatsApp' ? sizeButton : ''
                }`
              ],
              label && classes.buttonSquare,
              customButtonClass,
            )}
          >
            <div
              aria-hidden="true"
              className={classnames(
                classes[`iconRoot${variant}`],
                !label && classes.iconBase,
              )}
            >
              {this.generateIcon()}
            </div>
            {label}
          </div>
        </Button>
      </a>
    );
  }
}

ShareButton.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  type: PropTypes.string,
  link: PropTypes.string,
  message: PropTypes.string,
  size: PropTypes.oneOf(['base', 'medium']),
  sizeButton: PropTypes.oneOf(['small']),
  variant: PropTypes.oneOf([VARIANTS.STANDARD, VARIANTS.INLINE]),
  tooltipProps: PropTypes.object,
  customButtonClass: PropTypes.object,
};

ShareButton.defaultProps = {
  type: MAIL,
  size: 'base',
  sizeButton: '',
  message: '',
  link: '',
  variant: VARIANTS.STANDARD,
  tooltipProps: {},
};

export default withStyles(style, { name: 'ShareButton' })(ShareButton);
